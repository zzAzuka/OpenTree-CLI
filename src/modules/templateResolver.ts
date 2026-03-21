import type { TreeConfigTemplate } from "@/types/treeConfigType"
import type { FolderContentTemplate } from "@/types/folderContentTemplate";
import {templateRegistry} from "@/core/templateRegistry";

const resolveTemplates = async (userConfig:TreeConfigTemplate): Promise<FolderContentTemplate[]> => {
    try{
        return [
            templateRegistry.base[userConfig.base],
            templateRegistry.framework[userConfig.framework],
            templateRegistry.database[userConfig.database]
        ]
    } catch (error: any) {
        throw new Error("Error occurred while resolving templates: " + error.message);
    }
}

export { resolveTemplates };
