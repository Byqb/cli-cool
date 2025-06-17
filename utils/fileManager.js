import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function listFiles(dirPath) {
    const spinner = createSpinner('Reading directory...').start();
    try {
        const files = await fs.readdir(dirPath);
        spinner.success({ text: 'Directory read successfully!' });
        
        const fileDetails = await Promise.all(files.map(async (file) => {
            const stats = await fs.stat(path.join(dirPath, file));
            return {
                name: `${file} ${stats.isDirectory() ? chalk.blue('(Directory)') : chalk.green('(File)')}`,
                value: file,
                isDirectory: stats.isDirectory()
            };
        }));

        return fileDetails;
    } catch (error) {
        spinner.error({ text: 'Failed to read directory!' });
        throw error;
    }
}

async function fileManager(currentPath = process.cwd()) {
    while (true) {
        console.log(chalk.yellow(`\nCurrent directory: ${currentPath}`));
        
        const files = await listFiles(currentPath);
        const choices = [
            ...files,
            { name: chalk.cyan('.. (Go back)'), value: '..' },
            { name: chalk.red('Exit'), value: 'EXIT' }
        ];

        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Select a file/directory or action:',
            choices
        });

        if (action === 'EXIT') {
            console.log(chalk.green('\nThank you for using File Manager!'));
            break;
        }

        if (action === '..') {
            currentPath = path.dirname(currentPath);
            continue;
        }

        const filePath = path.join(currentPath, action);
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
            currentPath = filePath;
        } else {
            const { fileAction } = await inquirer.prompt({
                type: 'list',
                name: 'fileAction',
                message: 'What would you like to do with this file?',
                choices: [
                    'View file info',
                    'Read file content',
                    'Go back'
                ]
            });

            if (fileAction === 'View file info') {
                console.log(chalk.cyan('\nFile Information:'));
                console.log(chalk.white(`Size: ${stats.size} bytes`));
                console.log(chalk.white(`Created: ${stats.birthtime}`));
                console.log(chalk.white(`Last modified: ${stats.mtime}`));
                await sleep(3000);
            } else if (fileAction === 'Read file content') {
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    console.log(chalk.cyan('\nFile Content:'));
                    console.log(chalk.white(content));
                    await sleep(3000);
                } catch (error) {
                    console.log(chalk.red('Unable to read file content (might be a binary file)'));
                    await sleep(2000);
                }
            }
        }
    }
}

export { fileManager };
