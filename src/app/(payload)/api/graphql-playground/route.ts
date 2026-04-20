import config from "@payload-config";
import "@payloadcms/next/css";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

const handleGraphQLPlayground = GRAPHQL_PLAYGROUND_GET(config);

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not Found", { status: 404 });
  }

  return handleGraphQLPlayground(request);
}
