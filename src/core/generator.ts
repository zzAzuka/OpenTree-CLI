import {cliOptions} from "src/modules/cliOptions";
import { resolveTemplates } from "src/core/templateResolver";
import { finalTemplate } from "@/modules/templateMerger";
import {createDirectory} from 'src/modules/createDirectory';

const generator = async (projectName: string) => {
    const selectedUserConfig = await cliOptions();
    const templateList = await resolveTemplates(selectedUserConfig);
    const mergedTemplate = await finalTemplate(templateList);
    //await createDirectory(projectName);
}

export { generator };