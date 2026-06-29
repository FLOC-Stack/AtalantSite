import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getProductParticleShapeIndex } from "../src/lib/product-particle-shapes";

describe("product particle shapes", () => {
  it("matches the catalog ParticleMorph order", () => {
    assert.deepEqual(
      ["pe", "pp", "pvc", "eva", "ps", "pet", "pa", "recycled", "rec"].map((code) =>
        getProductParticleShapeIndex(code),
      ),
      [1, 2, 3, 4, 5, 6, 7, 1, 1],
    );
  });

  it("defaults unknown product codes to the first product shape, not the catalog hero", () => {
    assert.equal(getProductParticleShapeIndex("unknown"), 1);
  });
});
