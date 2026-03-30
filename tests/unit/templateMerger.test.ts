import { describe, it, expect } from "bun:test";
import { finalTemplate } from "src/modules/templateMerger";
import { createMockFolderContentTemplate } from "../setup";

describe("templateMerger", () => {
  it("should merge two templates correctly", () => {
    const template1 = createMockFolderContentTemplate({
      folder: ["src", "config"],
      name_and_content: { "package.json": '{"name": "test"}' },
      dependencies: ["express"],
      devDependencies: ["typescript"],
    });

    const template2 = createMockFolderContentTemplate({
      folder: ["prisma"],
      name_and_content: { "prisma/schema.prisma": "datasource db {}" },
      dependencies: ["@prisma/client"],
      devDependencies: ["prisma"],
    });

    const result = finalTemplate([template1, template2]);

    expect(result.folder).toContain("src");
    expect(result.folder).toContain("config");
    expect(result.folder).toContain("prisma");
    expect(result.name_and_content["package.json"]).toBe('{"name": "test"}');
    expect(result.name_and_content["prisma/schema.prisma"]).toBe("datasource db {}");
    expect(result.dependencies).toContain("express");
    expect(result.dependencies).toContain("@prisma/client");
    expect(result.devDependencies).toContain("typescript");
    expect(result.devDependencies).toContain("prisma");
  });

  it("should merge three templates correctly", () => {
    const baseTemplate = createMockFolderContentTemplate({
      folder: [],
      name_and_content: { "package.json": "{}" },
      dependencies: [],
      devDependencies: [],
    });

    const frameworkTemplate = createMockFolderContentTemplate({
      folder: ["src"],
      name_and_content: { "src/app.js": "express app" },
      dependencies: ["express"],
      devDependencies: [],
    });

    const dbTemplate = createMockFolderContentTemplate({
      folder: ["prisma", "src/db"],
      name_and_content: { "prisma/schema.prisma": "schema" },
      dependencies: ["@prisma/client"],
      devDependencies: ["prisma"],
    });

    const result = finalTemplate([baseTemplate, frameworkTemplate, dbTemplate]);

    expect(result.folder).toHaveLength(3);
    expect(result.folder).toContain("src");
    expect(result.folder).toContain("prisma");
    expect(result.folder).toContain("src/db");
    expect(result.dependencies).toEqual(["express", "@prisma/client"]);
    expect(result.devDependencies).toEqual(["prisma"]);
  });

  it("should deduplicate folders array", () => {
    const template1 = createMockFolderContentTemplate({
      folder: ["src", "src", "config", "src"],
      name_and_content: {},
      dependencies: [],
      devDependencies: [],
    });

    const result = finalTemplate([template1]);

    const uniqueFolders = result.folder.filter((f, i) => result.folder.indexOf(f) === i);
    expect(result.folder).toEqual(uniqueFolders);
  });

  it("should combine dependencies from multiple templates", () => {
    const template1 = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {},
      dependencies: ["express", "cors"],
      devDependencies: ["typescript"],
    });

    const template2 = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {},
      dependencies: ["@prisma/client", "dotenv"],
      devDependencies: ["prisma", "jest"],
    });

    const result = finalTemplate([template1, template2]);

    expect(result.dependencies).toContain("express");
    expect(result.dependencies).toContain("cors");
    expect(result.dependencies).toContain("@prisma/client");
    expect(result.dependencies).toContain("dotenv");
    expect(result.devDependencies).toContain("typescript");
    expect(result.devDependencies).toContain("prisma");
    expect(result.devDependencies).toContain("jest");
  });

  it("should handle empty templates", () => {
    const emptyTemplate = createMockFolderContentTemplate();

    const result = finalTemplate([emptyTemplate]);

    expect(result.folder).toEqual([]);
    expect(result.name_and_content).toEqual({});
    expect(result.dependencies).toEqual([]);
    expect(result.devDependencies).toEqual([]);
  });

  it("should handle template with only folders", () => {
    const folderOnlyTemplate = createMockFolderContentTemplate({
      folder: ["src", "config", "tests"],
      name_and_content: {},
      dependencies: [],
      devDependencies: [],
    });

    const result = finalTemplate([folderOnlyTemplate]);

    expect(result.folder).toContain("src");
    expect(result.folder).toContain("config");
    expect(result.folder).toContain("tests");
    expect(result.name_and_content).toEqual({});
  });

  it("should handle template with only files", () => {
    const fileOnlyTemplate = createMockFolderContentTemplate({
      folder: [],
      name_and_content: {
        "README.md": "# Project",
        ".gitignore": "node_modules/",
      },
      dependencies: [],
      devDependencies: [],
    });

    const result = finalTemplate([fileOnlyTemplate]);

    expect(result.folder).toEqual([]);
    expect(result.name_and_content["README.md"]).toBe("# Project");
    expect(result.name_and_content[".gitignore"]).toBe("node_modules/");
  });

  it("should overwrite file content when keys conflict", () => {
    const template1 = createMockFolderContentTemplate({
      folder: [],
      name_and_content: { "README.md": "First content" },
      dependencies: [],
      devDependencies: [],
    });

    const template2 = createMockFolderContentTemplate({
      folder: [],
      name_and_content: { "README.md": "Second content" },
      dependencies: [],
      devDependencies: [],
    });

    const result = finalTemplate([template1, template2]);

    expect(result.name_and_content["README.md"]).toBe("Second content");
  });
});
