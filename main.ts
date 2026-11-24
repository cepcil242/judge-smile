import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "This morning the bus driver waited while an old man shuffled across the road, then waved him aboard like a long-lost friend — and the whole bus broke into applause.";

// Gate: the entry must be one line of 1-200 Unicode characters, not only
// whitespace. Anything else is rejected before anything is written.
function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

const outPath = process.env.ENTRY_OUTPUT_PATH ?? "/output/entry.txt";
validateEntry(ENTRY);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY + "\n", "utf8");
