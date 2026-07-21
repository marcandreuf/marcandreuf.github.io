/**
 * Deterministic stand-in for Math.random(), keyed by a string.
 *
 * The open-graph images are generated fresh on every build, so any Math.random()
 * in that path makes all 47 of them change on every deploy even when nothing
 * about the content did. Seeding from a stable per-page key instead keeps a
 * given page's image byte identical between builds, while still spreading
 * different pages across the palette.
 *
 * The generators are plain integer arithmetic, so they produce the same values
 * on every platform and Node version.
 */

/** FNV-1a, 32-bit. */
export const hashString = (value: string): number => {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    // imul keeps the multiply in 32-bit range
    hash = Math.imul(hash, 0x01000193);
  }

  return hash >>> 0;
};

/**
 * Returns a picker that draws from arrays deterministically. Successive calls
 * advance the internal state, so two draws from the same array can still differ,
 * but the whole sequence repeats exactly for a given seed.
 */
export const createSeededPicker = (seed: string) => {
  // xorshift32 breaks down at 0, and hashString can legitimately return it
  let state = hashString(seed) || 0x9e3779b9;

  const next = (): number => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;

    return state;
  };

  return <T>(items: readonly T[]): T => items[next() % items.length];
};
