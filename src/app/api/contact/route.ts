import configPromise from "@payload-config";
import { isLocale } from "@/lib/locales";
import { getPayload } from "payload";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (
      typeof body.name !== "string" ||
      typeof body.email !== "string" ||
      typeof body.message !== "string" ||
      typeof body.locale !== "string" ||
      !isLocale(body.locale)
    ) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    const payload = await getPayload({ config: configPromise });

    await payload.create({
      collection: "leadSubmissions",
      data: {
        company: typeof body.company === "string" ? body.company : "",
        country: typeof body.country === "string" ? body.country : "",
        email: body.email,
        locale: body.locale,
        message: body.message,
        name: body.name,
        sourcePath: typeof body.sourcePath === "string" ? body.sourcePath : `/${body.locale}`,
      },
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
