import { describe, it, expect } from "bun:test";
import { resolveTemplates } from "src/modules/templateResolver";
import { createMockTreeConfig } from "../setup";
import type { TreeConfigTemplate } from "src/types/treeConfigType";

describe("templateResolver", () => {
  it("should resolve correct templates for valid config", async () => {
    const config = createMockTreeConfig();

    const result = await resolveTemplates(config);

    expect(result).toHaveLength(3);
    expect(result[0]!).toHaveProperty("folder");
    expect(result[0]!).toHaveProperty("name_and_content");
    expect(result[0]!).toHaveProperty("dependencies");
    expect(result[0]!).toHaveProperty("devDependencies");
  });

  it("should return node base template", async () => {
    const config = createMockTreeConfig();

    const result = await resolveTemplates(config);

    expect(result[0]!.name_and_content["package.json"]).toBeDefined();
  });

  it("should return express framework template", async () => {
    const config = createMockTreeConfig();

    const result = await resolveTemplates(config);

    expect(result[1]!.name_and_content["src/app.js"]).toBeDefined();
    expect(result[1]!.name_and_content["src/server.js"]).toBeDefined();
    expect(result[1]!.dependencies).toContain("express");
  });

  it("should return prisma database template", async () => {
    const config = createMockTreeConfig();

    const result = await resolveTemplates(config);

    expect(result[2]!.name_and_content["prisma/schema.prisma"]).toBeDefined();
    expect(result[2]!.dependencies).toContain("@prisma/client");
    expect(result[2]!.devDependencies).toContain("prisma");
  });

  it("should throw error for invalid base config", async () => {
    const invalidConfig: TreeConfigTemplate = {
      base: "python" as "node",
      framework: "express",
      database: "prisma",
    };

    await expect(resolveTemplates(invalidConfig)).rejects.toThrow();
  });

  it("should throw error for invalid framework config", async () => {
    const invalidConfig: TreeConfigTemplate = {
      base: "node",
      framework: "fastify" as "express",
      database: "prisma",
    };

    await expect(resolveTemplates(invalidConfig)).rejects.toThrow();
  });

  it("should throw error for invalid database config", async () => {
    const invalidConfig: TreeConfigTemplate = {
      base: "node",
      framework: "express",
      database: "mongodb" as "prisma",
    };

    await expect(resolveTemplates(invalidConfig)).rejects.toThrow();
  });

  it("should resolve all valid combinations without errors", async () => {
    const validConfigs = [
      createMockTreeConfig(),
    ];

    for (const config of validConfigs) {
      const result = await resolveTemplates(config);
      expect(result).toHaveLength(3);
    }
  });
});
