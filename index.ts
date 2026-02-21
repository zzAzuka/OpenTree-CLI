#! /usr/bin/env bun

/*This line is called a Shebang! This line tells the shell to use bun as 
the runtime when the CLI is invoked in the terminal*/

import { program } from 'commander';

console.log("Hello, World! This is the entry point of the CLI.");
 
program
  .version('1.0.0')
  .command('sum <num1> <num2>')
  .description('Calculate the sum of two numbers')
  .action((num1, num2) => {
    const result = parseInt(num1) + parseInt(num2);
    console.log(`The sum of ${num1} and ${num2} is ${result}`);
  });
 
program.parse(process.argv);