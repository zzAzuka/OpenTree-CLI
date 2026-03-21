import inquirer from "inquirer";
import type { TreeConfigTemplate } from "@/types/treeConfigType";

const cliOptions = async (): Promise<TreeConfigTemplate> => {
    try{
        const result = await inquirer.prompt([
        {
            name:"base",
            type: "rawlist",
            message: "Choose your Base Framework!",
            choices: [{name: "Node", value: "node"}], 
            default: "node",
        },
        /*{
            name:"language",
            type: "rawlist",
            message: "Choose your programming language!",
            choices: ["JavaScript", "TypeScript", "Python"], 
            default: "JavaScript",
        },*/
        {
            name:"framework",
            type: "rawlist",
            message: "Choose your Framework!",
            choices: [{name: "Express", value: "express"}], 
            default: "express",
        },
        {
            name:"database",
            type: "rawlist",
            message: "Choose your Database!",
            choices: [{name: "Prisma", value: "prisma"}], 
            default: "prisma",
        }
        ]);
        const validBases = ["node"];
        const validFrameworks = ["express"];
        const validDatabases = ["prisma"];
        
        if (
            !validBases.includes(result.base) ||
            !validFrameworks.includes(result.framework) ||
            !validDatabases.includes(result.database)
            ) {
            throw new Error("Invalid CLI options selected.");
            }

            return {
            base: result.base,
            framework: result.framework,
            database: result.database,
            };

    } catch (error: any) {
        if (error?.isTtyError || error?.message?.includes("SIGINT")) {
            console.error("\nPrompt cancelled by user.");
            process.exit(1);
        }
        throw new Error("Error occurred while prompting CLI options: " + error.message);
    }
    };

export { cliOptions };