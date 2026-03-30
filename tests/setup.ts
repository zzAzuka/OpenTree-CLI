import type { FolderContentTemplate } from "src/types/folderContentTemplate";
import type { TreeConfigTemplate } from "src/types/treeConfigType";

function createMockFolderContentTemplate(overrides?: Partial<FolderContentTemplate>): FolderContentTemplate {
  return {
    folder: [],
    name_and_content: {},
    dependencies: [],
    devDependencies: [],
    ...overrides,
  };
}

function createMockTreeConfig(overrides?: Partial<TreeConfigTemplate>): TreeConfigTemplate {
  return {
    base: "node",
    framework: "express",
    database: "prisma",
    ...overrides,
  };
}

function createMockFsError(code: string, message?: string): NodeJS.ErrnoException {
  const error = new Error(message || `Mock fs error: ${code}`) as NodeJS.ErrnoException;
  error.code = code;
  return error;
}

export {
  createMockFolderContentTemplate,
  createMockTreeConfig,
  createMockFsError,
};
