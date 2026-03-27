import config from "@payload-config";
import { NotFoundPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type Props = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export default function PayloadAdminNotFound({ params, searchParams }: Props) {
  return NotFoundPage({ config, importMap, params, searchParams });
}
