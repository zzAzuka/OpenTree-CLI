import type { templateRegistry } from "@/core/templateRegistry";

type TreeConfigTemplate = {
    base: keyof typeof templateRegistry.base;
    framework: keyof typeof templateRegistry.framework;
    database: keyof typeof templateRegistry.database;
};

export type { TreeConfigTemplate };