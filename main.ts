import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One line about a small good thing that happened today.
// Warmth: a driver waiting for a stranger. Surprise: the whole bus
// applauding. Concrete detail: the old man shuffling across the road.
const ENTRY =
  "This morning the bus driver waited while an old man shuffled across the road, then waved him aboard like a long-lost friend \u2014 and the whole bus broke into applause.";

/**
 * Gate check (mirrors the competition's sealed scorer): the entry must be
 * UTF-8 text of 1 to 200 Unicode characters, and not only whitespace.
 * Throws on any violation so an invalid entry never reaches the judge.
 */
function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`Entry must be 1-200 characters, got ${chars.length}.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

validateEntry(ENTRY);

const outPath = process.env.ENTRY_OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
