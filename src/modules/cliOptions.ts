import inquirer from "inquirer";
import {reactViteTsTemplate} from "@/templates/boilerplates/react_ts";
import {nodeExpressTsTemplate} from "@/templates/boilerplates/node_express_ts";
import {pythonFastApiTemplate} from "@/templates/boilerplates/python_fastapi";
import { nodeTemplate } from "@/templates/base/node";
import { expressTemplate } from "@/templates/framework/express";
import { prismaTemplate } from "@/templates/database/prisma";
import { finalTemplate } from "./templateMerger";
import {createDirectory} from 'src/modules/createDirectory';

const cliOptionsCustom = async () =>{
    const listOfOptions:any[] = [];
    const subResult = await inquirer.prompt([
    {
        name:"base",
        type: "rawlist",
        message: "Choose your Base Framework!",
        choices: [{name: "Node", value: nodeTemplate}], 
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
        choices: [{name: "Express", value: expressTemplate}], 
        default: "Express",
    },
    {
        name:"database",
        type: "rawlist",
        message: "Choose your Database!",
        choices: [{name: "Prisma", value: prismaTemplate}], 
        default: "Prisma",
    }
    ]).then((answers) => {
        listOfOptions.push(answers.base);
        // listOfOptions.push(answers.language);
        listOfOptions.push(answers.framework);
        listOfOptions.push(answers.database);
    });
    return finalTemplate(listOfOptions);
}

const cliOptions = async () => {
    const result = await inquirer.prompt([
    {
        name:"boilerplates",
        type: "rawlist",
        message: "Choose your Stack!",
        choices: ["Node + Express + TypeScript", "Python + FastAPI", "React + Vite + TypeScript", "Custom"], 
        default: "React + Vite + TypeScript",
    },
    ]);
    if (result.boilerplates == "Node + Express + TypeScript") {
        return nodeExpressTsTemplate;
    }
    else if (result.boilerplates == "Python + FastAPI") {
        return pythonFastApiTemplate;
    }
    else if (result.boilerplates == "React + Vite + TypeScript") {
        return reactViteTsTemplate;
    }
    else if (result.boilerplates == "Custom") {
        const customTemplateResult = await cliOptionsCustom();
        return customTemplateResult;
    };
    console.log("Selected:", result.boilerplates);
    };

export { cliOptions };