import * as fs from "fs";
import * as crypto from "crypto";
import * as challengeA from "../challengeA";

jest.mock("fs");
jest.mock("crypto");

describe("challengeA", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("generateAlphabeticalString should return a string of specified length", () => {
    const mockRandomBytes = Buffer.from("abcdefghijklmnopqrstuvwxyz");
    (crypto.randomBytes as jest.Mock).mockReturnValue(mockRandomBytes);

    const result = challengeA.generateAlphabeticalString(10);
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[a-zA-Z]+$/);
  });

  test("generateRealNumber should return a number between 0 and 1000 with 2 decimal places", () => {
    const result = challengeA.generateRealNumber();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1000);
    expect(result.toString()).toMatch(/^\d+\.\d{2}$/);
  });

  test("generateInteger should return an integer between 0 and 1000000", () => {
    const result = challengeA.generateInteger();
    expect(Number.isInteger(result)).toBeTruthy();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1000000);
  });

  test("generateAlphanumeric should return a string with spaces and alphanumeric characters", () => {
    const mockRandomBytes = Buffer.from("abc123XYZ");
    (crypto.randomBytes as jest.Mock).mockReturnValue(mockRandomBytes);

    const result = challengeA.generateAlphanumeric();
    expect(result).toMatch(/^\s*[a-zA-Z0-9]+\s*$/);
    expect(result.trim().length).toBeGreaterThanOrEqual(5);
    expect(result.trim().length).toBeLessThanOrEqual(15);
  });

  test("generateFile should create a file of approximately 10MB", async () => {
    const mockWriteStream = {
      write: jest.fn().mockReturnValue(true),
      end: jest.fn(),
      once: jest.fn(),
    };
    (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);

    await challengeA.generateFile();

    expect(fs.createWriteStream).toHaveBeenCalledWith("randomObjects.txt");
    expect(mockWriteStream.write).toHaveBeenCalled();
    expect(mockWriteStream.end).toHaveBeenCalled();

    const totalBytesWritten = mockWriteStream.write.mock.calls.reduce(
      (acc, call) => acc + Buffer.byteLength(call[0], "utf8"),
      0
    );
    expect(totalBytesWritten).toBeGreaterThanOrEqual(10_000_000);
    expect(totalBytesWritten).toBeLessThan(10_100_000);
  });
});
