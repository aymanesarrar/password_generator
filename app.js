#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*_-+=';
const log = console.log
program.version('1.0.0').description('Simple Password Generator');
const generatePassword = (length, chars) => {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

const createPassword = (length = 8, hasNumbers = true, hasSymbols = true) => {
  let chars = alpha;
  hasNumbers ? chars += numbers : '';
  hasSymbols ? chars += symbols : '';
  return generatePassword(length, chars);
}

program.option('-nnb, --no-number', 'generate a password without numbers')
       .option('-nsy, --no-symbol', 'generate a password without symbols')
       .option('-ln, --length <number>', 'defines a length for the password')
       .parse();
const {length, number, symbol} = program.opts();

const generatedPassword = createPassword(length, number, symbol);

clipboardy.writeSync(generatedPassword);

log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));
