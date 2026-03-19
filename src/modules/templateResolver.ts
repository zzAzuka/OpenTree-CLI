import type { TreeConfigTemplate } from "@/types/treeConfigType"
import type { FolderContentTemplate } from "@/types/folderContentTemplate";
import {templateRegistry} from "@/core/templateRegistry";

const resolveTemplates = async (userConfig:TreeConfigTemplate): Promise<FolderContentTemplate[]> => {
    return [
        templateRegistry.base[userConfig.base as keyof typeof templateRegistry.base],
        templateRegistry.framework[userConfig.framework as keyof typeof templateRegistry.framework],
        templateRegistry.database[userConfig.database as keyof typeof templateRegistry.database]
    ]
}

export { resolveTemplates };

//TODO: See what is keyOf typeOf in safe way to access the registry with the user input.
