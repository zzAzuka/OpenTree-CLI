import { mkdir, exists } from "node:fs/promises";
import path from "node:path";

const createDirectory = async (name: string) => {
    try{
        const currentWorkingDirectory = process.cwd();
        const filePath = path.join(currentWorkingDirectory, name);
        const directoryExists = await exists(filePath);
        
        if (!directoryExists) {
           await mkdir(filePath);
        }
    }catch (error) {
        console.error(`Error creating directory: ${error}`);
    }

};

export default createDirectory;