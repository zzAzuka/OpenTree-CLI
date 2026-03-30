#! /usr/bin/env bun

import { Command } from "commander";
import { generator } from "src/core/generator";
import { validateProjectName } from "src/utils/validation";
import { InvalidProjectNameError } from "src/utils/errors";

const program = new Command();

program
  .name("open-tree")
  .description("A CLI tool to generate folder tree structures!")
  .version("1.0.0");

program
  .argument("<string>", "The name of the project for which we want to generate a folder tree structure.")
  .action(async (projectName: string) => {
    try {
      validateProjectName(projectName);
      console.log(`The folder tree structure for the project '${projectName}' is...`);
      await generator(projectName);
    } catch (error) {
      if (error instanceof InvalidProjectNameError) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
      throw error;
    }
  });

program.parse();
