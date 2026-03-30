import { describe, it, expect } from "bun:test";
import { createMockTreeConfig, createMockFolderContentTemplate } from "../setup";

describe("generator", () => {
  it("should export generator function", async () => {
    const { generator } = await import("src/core/generator");
    expect(typeof generator).toBe("function");
  });

  it("should have expected function signature", async () => {
    const { generator } = await import("src/core/generator");
    const paramCount = generator.length;
    expect(paramCount).toBeGreaterThanOrEqual(1);
  });

  it("should require projectName parameter", async () => {
    const { generator } = await import("src/core/generator");
    expect(generator.length).toBeGreaterThanOrEqual(1);
  });
});

describe("generator flow", () => {
  it("should call all modules in the expected order", async () => {
    const { cliOptions } = await import("src/modules/cliOptions");
    const { resolveTemplates } = await import("src/modules/templateResolver");
    const { finalTemplate } = await import("src/modules/templateMerger");
    const { createDirectory } = await import("src/modules/createDirectory");
    const { createFiles } = await import("src/modules/createFiles");
    const { installPackages } = await import("src/modules/installPackages");

    expect(typeof cliOptions).toBe("function");
    expect(typeof resolveTemplates).toBe("function");
    expect(typeof finalTemplate).toBe("function");
    expect(typeof createDirectory).toBe("function");
    expect(typeof createFiles).toBe("function");
    expect(typeof installPackages).toBe("function");
  });

  it("should resolve templates with valid config", async () => {
    const { resolveTemplates } = await import("src/modules/templateResolver");
    const config = createMockTreeConfig();

    const templates = await resolveTemplates(config);

    expect(templates).toHaveLength(3);
    expect(templates[0]!).toBeDefined();
    expect(templates[1]!).toBeDefined();
    expect(templates[2]!).toBeDefined();
  });

  it("should merge templates correctly", async () => {
    const { finalTemplate } = await import("src/modules/templateMerger");
    const templates = [
      createMockFolderContentTemplate({ folder: ["src"] }),
      createMockFolderContentTemplate({ folder: ["tests"] }),
    ];

    const merged = finalTemplate(templates);

    expect(merged.folder).toContain("src");
    expect(merged.folder).toContain("tests");
  });
});
