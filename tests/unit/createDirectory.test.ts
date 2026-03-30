import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { createDirectory } from "src/modules/createDirectory";
import { DirectoryAlreadyExists } from "src/utils/errorHandling";
import { InvalidProjectNameError } from "src/utils/errors";
import { createMockFsError } from "../setup";

const mockMkdir = mock(async () => {});

describe("createDirectory", () => {
  beforeEach(() => {
    mock.module("node:fs/promises", () => ({
      mkdir: mockMkdir,
    }));
  });

  afterEach(() => {
    mockMkdir.mockReset();
  });

  it("should create directory at correct path", async () => {
    const result = await createDirectory("my-project");

    expect(result).toContain("my-project");
    expect(mockMkdir).toHaveBeenCalled();
  });

  it("should throw DirectoryAlreadyExists when directory exists", async () => {
    mockMkdir.mockImplementation(() => {
      throw createMockFsError("EEXISTS");
    });

    await expect(createDirectory("existing-project")).rejects.toThrow(
      DirectoryAlreadyExists
    );
    await expect(createDirectory("existing-project")).rejects.toThrow(
      /already exists/
    );
  });

  it("should throw on permission denied", async () => {
    mockMkdir.mockImplementation(() => {
      throw createMockFsError("EACCES", "Permission denied");
    });

    await expect(createDirectory("forbidden-project")).rejects.toThrow(
      /Permission denied/
    );
  });

  it("should throw InvalidProjectNameError for empty name", async () => {
    await expect(createDirectory("")).rejects.toThrow(InvalidProjectNameError);
    await expect(createDirectory("")).rejects.toThrow(/cannot be empty/);
  });

  it("should throw InvalidProjectNameError for whitespace-only name", async () => {
    await expect(createDirectory("   ")).rejects.toThrow(InvalidProjectNameError);
  });

  it("should throw InvalidProjectNameError for name with leading whitespace", async () => {
    await expect(createDirectory(" myproject")).rejects.toThrow(
      InvalidProjectNameError
    );
    await expect(createDirectory(" myproject")).rejects.toThrow(
      /leading or trailing whitespace/
    );
  });

  it("should throw InvalidProjectNameError for name with trailing whitespace", async () => {
    await expect(createDirectory("myproject ")).rejects.toThrow(
      InvalidProjectNameError
    );
    await expect(createDirectory("myproject ")).rejects.toThrow(
      /leading or trailing whitespace/
    );
  });

  it("should throw InvalidProjectNameError for name with forbidden characters", async () => {
    const forbiddenNames = [
      "project/name",
      "project\\name",
      "project:name",
      "project*name",
      "project?name",
      'project"name',
      "project<name",
      "project>name",
      "project|name",
    ];

    for (const name of forbiddenNames) {
      await expect(createDirectory(name)).rejects.toThrow(
        InvalidProjectNameError
      );
    }
  });

  it("should throw InvalidProjectNameError for reserved names", async () => {
    const reservedNames = [
      "CON",
      "PRN",
      "AUX",
      "NUL",
      "COM1",
      "LPT1",
    ];

    for (const name of reservedNames) {
      await expect(createDirectory(name)).rejects.toThrow(
        InvalidProjectNameError
      );
      await expect(createDirectory(name.toLowerCase())).rejects.toThrow(
        InvalidProjectNameError
      );
    }
  });

  it("should throw InvalidProjectNameError for dot names", async () => {
    await expect(createDirectory(".")).rejects.toThrow(InvalidProjectNameError);
    await expect(createDirectory("..")).rejects.toThrow(InvalidProjectNameError);
  });

  it("should throw InvalidProjectNameError for name exceeding max length", async () => {
    const longName = "a".repeat(101);
    await expect(createDirectory(longName)).rejects.toThrow(
      InvalidProjectNameError
    );
    await expect(createDirectory(longName)).rejects.toThrow(/exceed.*100/);
  });

  it("should throw InvalidProjectNameError for name with spaces", async () => {
    await expect(createDirectory("my project")).rejects.toThrow(
      InvalidProjectNameError
    );
    await expect(createDirectory("my project")).rejects.toThrow(
      /cannot contain spaces/
    );
  });
});
