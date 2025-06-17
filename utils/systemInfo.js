import os from 'os';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import gradient from 'gradient-string';

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function getSystemInfo() {
    const spinner = createSpinner('Gathering system information...').start();
    await sleep(1000);

    const info = {
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        cpus: os.cpus(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime(),
        userInfo: os.userInfo(),
        networkInterfaces: os.networkInterfaces()
    };

    spinner.success({ text: 'System information gathered successfully!' });

    return info;
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function formatUptime(uptime) {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

async function displaySystemInfo() {
    const info = await getSystemInfo();
    
    console.log(gradient.rainbow('\n=== System Information ===\n'));
    
    console.log(chalk.cyan('System:'));
    console.log(chalk.white(`  Platform: ${info.platform}`));
    console.log(chalk.white(`  Architecture: ${info.architecture}`));
    console.log(chalk.white(`  Hostname: ${info.hostname}`));
    
    console.log(chalk.cyan('\nMemory:'));
    console.log(chalk.white(`  Total: ${formatBytes(info.totalMemory)}`));
    console.log(chalk.white(`  Free: ${formatBytes(info.freeMemory)}`));
    console.log(chalk.white(`  Used: ${formatBytes(info.totalMemory - info.freeMemory)}`));
    
    console.log(chalk.cyan('\nCPU:'));
    console.log(chalk.white(`  Cores: ${info.cpus.length}`));
    console.log(chalk.white(`  Model: ${info.cpus[0].model}`));
    console.log(chalk.white(`  Speed: ${info.cpus[0].speed}MHz`));
    
    console.log(chalk.cyan('\nUser:'));
    console.log(chalk.white(`  Username: ${info.userInfo.username}`));
    console.log(chalk.white(`  Home Directory: ${info.userInfo.homedir}`));
    
    console.log(chalk.cyan('\nUptime:'));
    console.log(chalk.white(`  ${formatUptime(info.uptime)}`));
    
    console.log(gradient.rainbow('\n=======================\n'));
}

export { displaySystemInfo };
