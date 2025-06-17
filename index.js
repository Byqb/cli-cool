#!/usr/bin/env node  
// Shebang

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { fileManager } from './utils/fileManager.js';
import { displaySystemInfo } from './utils/systemInfo.js';
import { timer } from './utils/timer.js';
import { todoManager } from './utils/todoManager.js';
import { notesManager } from './utils/notesManager.js';

// Utility function to sleep
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to display title with figlet and gradient
function welcome() {
    return new Promise((resolve) => {
        figlet('Super CLI Tool', {
            font: 'Star Wars',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, function(err, data) {
            if (err) {
                console.error('Something went wrong...');
                resolve();
                return;
            }
            console.log(gradient.pastel.multiline(data));
            resolve();
        });
    });
}

// Animation demo function
async function showAnimation(type, text) {
    const animation = chalkAnimation[type](text);
    await sleep();
    animation.stop();
}

// Function to show a loading process
async function showLoadingProcess(text) {
    const spinner = createSpinner(text).start();
    await sleep(1500);
    spinner.success({ text: `${text} completed!` });
}

// Function to get user input
async function getUserInput() {
    const answer = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'User';
        },
    });
    return answer.name;
}

// Function to show menu
async function showMenu() {
    const choices = [
        'Show Rainbow Animation',
        'Show Pulse Animation',
        'Show Glitch Animation',
        'Show Radar Animation',
        'Show Neon Animation',
        'Show Karaoke Animation',
        'Show Gradient Text',
        'Show Loading Process',
        'File Manager',
        'System Information',
        'Countdown Timer',
        'Todo Manager',
        'Notes Manager',
        'Exit'
    ];

    const answer = await inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices,
    });
    return answer.menu;
}

// Function to show gradient text
function showGradientText() {
    console.log('\n');
    console.log(gradient.mind('This is a mind-bending gradient text!'));
    console.log(gradient.rainbow('This is a rainbow gradient text!'));
    console.log(gradient.morning('This is a morning gradient text!'));
    console.log('\n');
}

// Main function to run the application
async function main() {
    // Show welcome message
    await welcome();
    await sleep(1000);

    // Get user's name
    const name = await getUserInput();
    console.log(chalk.cyan(`\nWelcome, ${name}! 🎉\n`));
    await sleep(1000);

    let exitRequested = false;
    while (!exitRequested) {
        const choice = await showMenu();
        
        switch (choice) {
            case 'Show Rainbow Animation':
                await showAnimation('rainbow', `${name}'s Rainbow Effect!`);
                break;
            case 'Show Pulse Animation':
                await showAnimation('pulse', `${name}'s Pulse Effect!`);
                break;
            case 'Show Glitch Animation':
                await showAnimation('glitch', `${name}'s Glitch Effect!`);
                break;
            case 'Show Radar Animation':
                await showAnimation('radar', `${name}'s Radar Effect!`);
                break;
            case 'Show Neon Animation':
                await showAnimation('neon', `${name}'s Neon Effect!`);
                break;
            case 'Show Karaoke Animation':
                await showAnimation('karaoke', `${name}'s Karaoke Effect!`);
                break;
            case 'Show Gradient Text':
                showGradientText();
                await sleep(2000);
                break;
            case 'Show Loading Process':
                await showLoadingProcess('Processing your request');
                break;
            case 'File Manager':
                await fileManager();
                break;
            case 'System Information':
                await displaySystemInfo();
                await sleep(3000);
                break;
            case 'Countdown Timer':
                await timer();
                break;
            case 'Todo Manager':
                await todoManager();
                break;
            case 'Notes Manager':
                await notesManager();
                break;
            case 'Exit':
                const spinner = createSpinner('Cleaning up...').start();
                await sleep(1000);
                spinner.success({ text: 'Thanks for trying out our CLI tool!' });
                console.log(gradient.rainbow('\nGoodbye! 👋\n'));
                exitRequested = true;
                break;
        }
    }
}

// Run the main function
main().catch(console.error);


