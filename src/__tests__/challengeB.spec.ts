import * as fs from "fs";
import * as readline from "readline";
import * as challengeB from "../challengeB";

jest.mock("fs");
jest.mock("readline");

describe("challengeB", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("determineType should correctly identify types", () => {
    expect(challengeB.determineType("abcXYZ")).toBe("Alphabetical String");
    expect(challengeB.determineType("123")).toBe("Integer");
    expect(challengeB.determineType("-123.45")).toBe("Real Number");
    expect(challengeB.determineType("abc123")).toBe("Alphanumeric");
    expect(challengeB.determineType("abc 123")).toBe("Unknown");
  });

  test("processFile should read input file and write to output file", async () => {
    const mockReadline = {
      [Symbol.asyncIterator]: jest.fn().mockImplementation(function* () {
        yield "abc,123,45.67,def789";
      }),
    };
    (readline.createInterface as jest.Mock).mockReturnValue(mockReadline);

    const mockWriteStream = {
      write: jest.fn(),
      end: jest.fn(),
    };
    (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);

    const consoleSpy = jest.spyOn(console, "log");

    await challengeB.processFile();

    expect(fs.createReadStream).toHaveBeenCalledWith("randomObjects.txt");
    expect(fs.createWriteStream).toHaveBeenCalledWith("output/output.txt");

    expect(mockWriteStream.write).toHaveBeenCalledTimes(4);
    expect(mockWriteStream.write).toHaveBeenCalledWith(
      "Object: abc, Type: Alphabetical String\n"
    );
    expect(mockWriteStream.write).toHaveBeenCalledWith(
      "Object: 123, Type: Integer\n"
    );
    expect(mockWriteStream.write).toHaveBeenCalledWith(
      "Object: 45.67, Type: Real Number\n"
    );
    expect(mockWriteStream.write).toHaveBeenCalledWith(
      "Object: def789, Type: Alphanumeric\n"
    );

    expect(mockWriteStream.end).toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Processing complete. Output written to output/output.txt"
    );
  });
});
