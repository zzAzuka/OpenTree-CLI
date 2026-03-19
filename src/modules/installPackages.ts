import { execa } from "execa"; 
import type {FolderContentTemplate} from "src/types/folderContentTemplate";

async function installPackages(template: FolderContentTemplate) {
    try {
        for (const dependency of template.dependencies) {
            console.log(`Installing dependency: ${dependency}`);
            await execa("npm", ["install", dependency], { stdio: "inherit" });
        }
        for (const devDependency of template.devDependencies) {
            console.log(`Installing devDependency: ${devDependency}`);
            await execa("npm", ["install", "-D", devDependency], { stdio: "inherit" });
        }
        console.log("All packages installed successfully!");
    }catch (error) {
        console.error("Error installing packages:", error);
    }
}

export { installPackages };