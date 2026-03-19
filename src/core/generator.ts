import {cliOptions} from "src/modules/cliOptions";
import { resolveTemplates } from "@/modules/templateResolver";
import { finalTemplate } from "@/modules/templateMerger";
import { createDirectory } from 'src/modules/createDirectory';
import { createFiles } from "@/modules/createFiles";
import { installPackages } from "@/modules/installPackages";

const generator = async (projectName: string) => {
    const selectedUserConfig = await cliOptions();
    const templateList = await resolveTemplates(selectedUserConfig);
    const mergedTemplate = await finalTemplate(templateList);
    const rootFilePath = await createDirectory(projectName);
    await createFiles(rootFilePath, mergedTemplate);
    await installPackages(mergedTemplate);
}

export { generator };