import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {FileAlreadyExists} from "src/utils/errorHandling";
import type {FolderContentTemplate} from "src/types/folderContentTemplate";


const createFiles = async (filePath: string, folderContents: FolderContentTemplate[]) => {
    try{
        for (const file of folderContents) {
            if (file.folder != ""){
                await mkdir(path.join(filePath, file.folder));
                const currFolderPath = path.join(filePath, file.folder);
                const filePathWithName = path.join(currFolderPath, file.name);
                await writeFile(filePathWithName, file.content);
            }
            else{
            const filePathWithName = path.join(filePath, file.name);
            await writeFile(filePathWithName, file.content);
            }
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