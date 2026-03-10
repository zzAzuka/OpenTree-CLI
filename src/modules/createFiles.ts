import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {FileAlreadyExists} from "src/utils/errorHandling";
import type {FolderContentTemplate} from "src/types/folderContentTemplate";


const createFiles = async (filePath: string, folderContents: FolderContentTemplate) => {
    try{
        for (const file of folderContents.folder) {
            if (file != ""){
                await mkdir(path.join(filePath, file));}}
        
        for (const [name, content] of Object.entries(folderContents.name_and_content) as [string, string][]) {
                const currFolderPath = path.join(filePath, name);
                await writeFile(currFolderPath, content);
            }
    }catch (error: any) {
        if (error.code === "EEXISTS") {
            throw new FileAlreadyExists(`File already exists.`);
        }
        console.error(`Error creating file: ${error}`);
        throw error;
    }
};

export { createFiles };

/*TODO: Data Strcuture to store the file and folder names and their content.
  TODO: Traversal logic for the folder scaffolding*/