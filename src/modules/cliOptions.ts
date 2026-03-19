import inquirer from "inquirer";
import type { TreeConfigTemplate } from "@/types/treeConfigType";

const cliOptions = async () => {
    const listOfOptions: TreeConfigTemplate = {
        base: "",
        framework: "",
        database: ""
    };
    const result = await inquirer.prompt([
    {
        name:"base",
        type: "rawlist",
        message: "Choose your Base Framework!",
        choices: [{name: "Node", value: "node"}], 
        default: "Node",
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
        default: "Express",
    },
    {
        name:"database",
        type: "rawlist",
        message: "Choose your Database!",
        choices: [{name: "Prisma", value: "prisma"}], 
        default: "Prisma",
    }
    ]).then((answers) => {
        listOfOptions.base = answers.base;
        listOfOptions.framework = answers.framework;
        listOfOptions.database = answers.database;
    });
    
    return listOfOptions;
    };

export { cliOptions };