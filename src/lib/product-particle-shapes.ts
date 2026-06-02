// Must match the order in ParticleMorph: 0 is the catalog hero, products start at 1.
const PRODUCT_PARTICLE_SHAPE_BY_CODE: Record<string, number> = {
  pe: 1,
  pp: 2,
  pvc: 3,
  eva: 4,
  ps: 5,
  pet: 6,
  rec: 7,
  recycled: 7,
  reciclados: 7,
};

export function getProductParticleShapeIndex(code: string) {
  return PRODUCT_PARTICLE_SHAPE_BY_CODE[code.toLowerCase()] ?? 1;
}
