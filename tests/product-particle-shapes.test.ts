import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getProductParticleShapeIndex } from "../src/lib/product-particle-shapes";

describe("product particle shapes", () => {
  it("matches the catalog ParticleMorph order", () => {
    assert.deepEqual(
      ["pe", "pp", "pvc", "eva", "ps", "pet", "recycled"].map((code) =>
        getProductParticleShapeIndex(code),
      ),
      [1, 2, 3, 4, 5, 6, 7],
    );
  });

  it("defaults unknown product codes to the first product shape, not the catalog hero", () => {
    assert.equal(getProductParticleShapeIndex("unknown"), 1);
  });
});
