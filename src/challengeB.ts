import * as fs from "fs";
import * as readline from "readline";

const INPUT_FILE = "randomObjects.txt";
const OUTPUT_FILE = "output/output.txt";

export function determineType(value: string): string {
  value = value.trim();
  if (/^[a-zA-Z]+$/.test(value)) return "Alphabetical String";
  if (/^-?\d+$/.test(value)) return "Integer";
  if (/^-?\d+(\.\d+)?$/.test(value)) return "Real Number";
  if (/^[a-zA-Z0-9]+$/.test(value)) return "Alphanumeric";
  return "Unknown";
}

export async function processFile() {
  const fileStream = fs.createReadStream(INPUT_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const writeStream = fs.createWriteStream(OUTPUT_FILE);

  for await (const line of rl) {
    const objects = line.split(",");
    for (const obj of objects) {
      const trimmedObj = obj.trim();
      const type = determineType(trimmedObj);
      const output = `Object: ${trimmedObj}, Type: ${type}\n`;
      console.log(output.trim());
      writeStream.write(output);
    }
  }

  writeStream.end();
  console.log(`Processing complete. Output written to ${OUTPUT_FILE}`);
}

processFile().catch(console.error);
