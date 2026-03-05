import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {FileAlreadyExists} from "src/utils/errorHandling";

const tsFolderContents = [
    {
        folder: "src",
        name: "index.ts",
        content: `console.log("Hello, World!");`
    },
    {
        folder: "",
        name: "README.md",
        content: "# TS Project"
    },
    {
        folder: "",
        name: "package.json",
        content: `{
            "name": "ts-project",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            }`
    }
]

const createFiles = async (filePath: string) => {
    try{
        for (const file of tsFolderContents) {
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