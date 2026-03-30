import type { FolderContentTemplate } from "src/types/folderContentTemplate";

const finalTemplate = (templateList: FolderContentTemplate[]) => {
  const mergedTemplate: FolderContentTemplate = {
    folder: [],
    name_and_content: {},
    dependencies: [],
    devDependencies: [],
  };

  const seenFolders = new Set<string>();

  for (const options of templateList) {
    for (const folder of options.folder) {
      if (folder && !seenFolders.has(folder)) {
        seenFolders.add(folder);
        mergedTemplate.folder.push(folder);
      }
    }
    for (const [key, value] of Object.entries(options.name_and_content) as [string, string][]) {
      mergedTemplate.name_and_content[key] = value;
    }
    mergedTemplate.dependencies.push(...options.dependencies);
    mergedTemplate.devDependencies.push(...options.devDependencies);
  }
  console.log("Final Template for the chosen stack is", mergedTemplate);
  return mergedTemplate;
};

export { finalTemplate };