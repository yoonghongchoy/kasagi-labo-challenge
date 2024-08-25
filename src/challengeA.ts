import * as fs from "fs";
import * as crypto from "crypto";

const TARGET_FILE_SIZE = 10_000_000; // 10MB in bytes(decimal)
const OUTPUT_FILE = "randomObjects.txt";

export function generateAlphabeticalString(length: number = 10): string {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, length);
}

export function generateRealNumber(): number {
  return parseFloat((Math.random() * 1000).toFixed(2));
}

export function generateInteger(): number {
  return Math.floor(Math.random() * 1000001);
}

export function generateAlphanumeric(): string {
  const alphanumeric = crypto
    .randomBytes(10)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, Math.floor(Math.random() * 11) + 5);
  const leftSpaces = " ".repeat(Math.floor(Math.random() * 11));
  const rightSpaces = " ".repeat(Math.floor(Math.random() * 11));
  return `${leftSpaces}${alphanumeric}${rightSpaces}`;
}

function generateRandomObject(): string {
  const generators = [
    generateAlphabeticalString,
    generateRealNumber,
    generateInteger,
    generateAlphanumeric,
  ];
  return String(generators[Math.floor(Math.random() * generators.length)]());
}

export async function generateFile() {
  const writeStream = fs.createWriteStream(OUTPUT_FILE);

  let currentSize = 0;

  while (currentSize < TARGET_FILE_SIZE) {
    const objects = Array.from({ length: 1000 }, () => generateRandomObject());
    const line = objects.join(",") + "\n";

    if (writeStream.write(line)) {
      currentSize += Buffer.byteLength(line, "utf8");
    } else {
      await new Promise((resolve) => writeStream.once("drain", resolve));
      currentSize += Buffer.byteLength(line, "utf8");
    }
  }

  writeStream.end();

  console.log(
    `File '${OUTPUT_FILE}' has been generated with a size of approximately ${(
      currentSize /
      (1000 * 1000)
    ).toFixed(2)} MB.`
  );
}

generateFile().catch(console.error);
