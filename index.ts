#! /usr/bin/env bun

import { Command } from 'commander';
import createDirectory from 'src/modules/createDirectory';

console.log("Hello! This is the entry point of the Open Tree CLI.");
const program = new Command();

program
  .name('open-tree')
  .description('A CLI tool to generate folder tree structures!')
  .version('1.0.0');

program
  .argument('<string>', 'The name of the project for which we want to generate a folder tree structure.')
  .action((projectName) => {
    console.log(`The folder tree structure for the project '${projectName}' is...`);
    createDirectory(projectName);
  })
program.parse();
