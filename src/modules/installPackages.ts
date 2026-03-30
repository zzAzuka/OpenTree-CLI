import { execa } from "execa";
import type { FolderContentTemplate } from "src/types/folderContentTemplate";

async function installPackages(template: FolderContentTemplate) {
    try {
        const deps = template.dependencies ?? [];
        const devDeps = template.devDependencies ?? [];

        if (deps.length) {
            console.log(`Installing dependencies: ${deps.join(", ")}`);
            await execa("npm", ["install", ...deps], {
                stdio: "inherit",
            });
        }

        if (devDeps.length) {
            console.log(`Installing devDependencies: ${devDeps.join(", ")}`);
            await execa("npm", ["install", "-D", ...devDeps], {
                stdio: "inherit",
            });
        }

        console.log("All packages installed successfully!");
    } catch (error: any) {
        console.error("Error installing packages:");
        console.error({
            message: error.message,
            exitCode: error.exitCode,
            stderr: error.stderr,
        });
        throw error;
    }
}

export { installPackages };