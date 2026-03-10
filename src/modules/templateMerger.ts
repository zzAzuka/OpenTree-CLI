import type {FolderContentTemplate} from "src/types/folderContentTemplate";

const finalTemplate = (templateList: any[]) => {
    const mergedTemplate: FolderContentTemplate = {
        folder: [],
        name_and_content: {},
    };

    for (const options of templateList) {
        mergedTemplate.folder.push(...options.folder);
        for (const [key, value] of Object.entries(options.name_and_content) as [string, string][]) {
            mergedTemplate.name_and_content[key] = value;
        }
    }
    //console.log("Final Template for the chosen stack is", mergedTemplate);
    return mergedTemplate;
}

export { finalTemplate };