import { mkdir } from "node:fs/promises";
import path from "node:path";
import {createFiles} from "src/modules/createFiles"
import {DirectoryAlreadyExists} from "src/utils/errorHandling";

const createDirectory = async (name: string) => {
    const currentWorkingDirectory = process.cwd();
    const filePath = path.join(currentWorkingDirectory, name);
    try{
        await mkdir(filePath);
        await createFiles(filePath);
        return filePath;
    }catch (error: any) {
        if (error.code === "EEXISTS") {
            throw new DirectoryAlreadyExists(`Directory '${name}' already exists.`);
        }
        console.error(`Error creating directory: ${error}`);
        throw error;
    }
};

export { createDirectory };

/*TODO: Check validation for teh directoyr name given by the user.
  TODO: Learna about promises and return types in TS.*/