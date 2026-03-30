import type { TreeConfigTemplate } from "@/types/treeConfigType";
import type { FolderContentTemplate } from "@/types/folderContentTemplate";
import { templateRegistry } from "@/core/templateRegistry";

const resolveTemplates = async (userConfig: TreeConfigTemplate): Promise<FolderContentTemplate[]> => {
  const baseTemplate = templateRegistry.base[userConfig.base];
  const frameworkTemplate = templateRegistry.framework[userConfig.framework];
  const databaseTemplate = templateRegistry.database[userConfig.database];

  if (!baseTemplate || !frameworkTemplate || !databaseTemplate) {
    throw new Error(
      `Invalid template configuration: base='${userConfig.base}', framework='${userConfig.framework}', database='${userConfig.database}'`
    );
  }

  return [baseTemplate, frameworkTemplate, databaseTemplate];
};

export { resolveTemplates };
