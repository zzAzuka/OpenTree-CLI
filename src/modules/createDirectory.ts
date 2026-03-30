import { mkdir } from "node:fs/promises";
import path from "node:path";
import { DirectoryAlreadyExists } from "src/utils/errorHandling";
import { validateProjectName } from "src/utils/validation";

const createDirectory = async (name: string) => {
  try {
    validateProjectName(name);

    const currentWorkingDirectory = process.cwd();
    const filePath = path.join(currentWorkingDirectory, name);
    await mkdir(filePath);
    return filePath;
  } catch (error: any) {
    if (error.code === "EEXISTS") {
      throw new DirectoryAlreadyExists(`Directory '${name}' already exists.`);
    }
    console.error(`Error creating directory: ${error}`);
    throw error;
  }
};

export { createDirectory };