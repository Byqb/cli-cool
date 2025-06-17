import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

async function startCountdown(minutes) {
    let totalSeconds = minutes * 60;
    
    // Clear terminal
    console.clear();
    
    while (totalSeconds > 0) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        
        // Create gradient based on remaining time
        const percentage = totalSeconds / (minutes * 60);
        let color;
        
        if (percentage > 0.6) {
            color = gradient.pastel;
        } else if (percentage > 0.3) {
            color = gradient.morning;
        } else {
            color = gradient.mind;
        }
        
        // Clear previous line
        process.stdout.write('\r\x1b[K');
        
        // Display time with gradient
        process.stdout.write(
            color(`⏰ ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`)
        );
        
        await sleep(1000);
        totalSeconds--;
    }
    
    // Clear line
    process.stdout.write('\r\x1b[K');
    
    // Show completion animation
    const rainbow = chalkAnimation.rainbow('Time is up! 🎉');
    await sleep(2000);
    rainbow.stop();
}

async function timer() {
    const { minutes } = await inquirer.prompt({
        type: 'number',
        name: 'minutes',
        message: 'How many minutes would you like to countdown?',
        default: 1,
        validate: (value) => {
            if (value > 0 && value <= 60) return true;
            return 'Please enter a number between 1 and 60';
        }
    });

    console.log(chalk.cyan(`\nStarting ${minutes} minute countdown...`));
    await sleep(1000);
    
    await startCountdown(minutes);
}

export { timer };
