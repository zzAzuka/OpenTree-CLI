import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { createFiles } from "src/modules/createFiles";
import { FileAlreadyExists } from "src/utils/errorHandling";
import { InvalidFilePathError } from "src/utils/errors";
import { createMockFolderContentTemplate, createMockFsError } from "../setup";

const mockMkdir = mock(async () => {});
const mockWriteFile = mock(async () => {});

describe("createFiles", () => {
  beforeEach(() => {
    mock.module("node:fs/promises", () => ({
      mkdir: mockMkdir,
      writeFile: mockWriteFile,
    }));
  });

  afterEach(() => {
    mockMkdir.mockReset();
    mockWriteFile.mockReset();
  });

  it("should create all folders recursively", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: ["src", "config", "tests"],
      name_and_content: {},
    });

    await createFiles("/test/path", folderContents);

    expect(mockMkdir).toHaveBeenCalledTimes(3);
  });

  it("should create all files with correct content", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {
        "README.md": "# Project",
        "package.json": '{"name": "test"}',
      },
    });

    await createFiles("/test/path", folderContents);

    expect(mockWriteFile).toHaveBeenCalledTimes(2);
    expect(mockWriteFile).toHaveBeenCalledWith(
      "/test/path/README.md",
      "# Project"
    );
    expect(mockWriteFile).toHaveBeenCalledWith(
      "/test/path/package.json",
      '{"name": "test"}'
    );
  });

  it("should handle both folders and files", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: ["src", "config"],
      name_and_content: {
        "README.md": "# Project",
        "config/settings.json": '{"setting": true}',
      },
    });

    await createFiles("/test/path", folderContents);

    expect(mockMkdir).toHaveBeenCalledTimes(2);
    expect(mockWriteFile).toHaveBeenCalledTimes(2);
  });

  it("should skip empty folder strings", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: ["", "src", ""],
      name_and_content: {},
    });

    await createFiles("/test/path", folderContents);

    expect(mockMkdir).toHaveBeenCalledTimes(1);
    expect(mockMkdir).toHaveBeenCalledWith("/test/path/src", { recursive: true });
  });

  it("should throw FileAlreadyExists when file exists", async () => {
    mockWriteFile.mockImplementation(() => {
      throw createMockFsError("EEXISTS");
    });

    const folderContents = createMockFolderContentTemplate({
      folder: [],
      name_and_content: { "existing.txt": "content" },
    });

    await expect(
      createFiles("/test/path", folderContents)
    ).rejects.toThrow(FileAlreadyExists);
    await expect(
      createFiles("/test/path", folderContents)
    ).rejects.toThrow(/already exists/);
  });

  it("should throw InvalidFilePathError for path traversal attempts", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {
        "../../../etc/passwd": "malicious content",
      },
    });

    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      InvalidFilePathError
    );
    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      /path traversal/
    );
  });

  it("should throw InvalidFilePathError for absolute paths", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {
        "/etc/passwd": "malicious content",
      },
    });

    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      InvalidFilePathError
    );
    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      /absolute path/
    );
  });

  it("should throw InvalidFilePathError for folder with forbidden characters", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: ["folder:name"],
      name_and_content: {},
    });

    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      InvalidFilePathError
    );
  });

  it("should handle nested folder paths", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: ["src/controllers", "src/models", "tests/unit"],
      name_and_content: {},
    });

    await createFiles("/test/path", folderContents);

    expect(mockMkdir).toHaveBeenCalledTimes(3);
    expect(mockMkdir).toHaveBeenCalledWith(
      "/test/path/src/controllers",
      { recursive: true }
    );
    expect(mockMkdir).toHaveBeenCalledWith(
      "/test/path/src/models",
      { recursive: true }
    );
    expect(mockMkdir).toHaveBeenCalledWith(
      "/test/path/tests/unit",
      { recursive: true }
    );
  });

  it("should handle Windows-style absolute paths", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {
        "C:\\Windows\\System32\\config": "malicious",
      },
    });

    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      InvalidFilePathError
    );
  });

  it("should throw InvalidFilePathError for dot folder names", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: ["."],
      name_and_content: {},
    });

    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      InvalidFilePathError
    );
  });

  it("should throw InvalidFilePathError for double dot folder names", async () => {
    const folderContents = createMockFolderContentTemplate({
      folder: [".."],
      name_and_content: {},
    });

    await expect(createFiles("/test/path", folderContents)).rejects.toThrow(
      InvalidFilePathError
    );
  });
});
