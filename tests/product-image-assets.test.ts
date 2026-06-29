import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const projectRoot = process.cwd();

describe("product image assets", () => {
  it("keeps catalog image references backed by public files", () => {
    const source = readFileSync(
      path.join(projectRoot, "src/components/products-morph.tsx"),
      "utf8",
    );
    const imagePaths = Array.from(
      source.matchAll(/image:\s*"(?<path>\/imgsrc\/products\/[^"]+)"/g),
      (match) => match.groups?.path,
    ).filter((imagePath): imagePath is string => Boolean(imagePath));
    const missing = [...new Set(imagePaths)]
      .map((imagePath) => ({
        imagePath,
        publicPath: path.join(projectRoot, "public", imagePath),
      }))
      .filter(({ publicPath }) => !existsSync(publicPath))
      .map(({ imagePath }) => imagePath);

    assert.deepEqual(missing, []);
  });
});
