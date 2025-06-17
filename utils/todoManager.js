import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import fs from 'fs/promises';
import path from 'path';
import gradient from 'gradient-string';

const TODO_FILE = path.join(process.cwd(), 'data', 'todos.json');
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Ensure the todo file exists
async function initTodoFile() {
    try {
        await fs.access(TODO_FILE);
    } catch {
        await fs.writeFile(TODO_FILE, JSON.stringify([], null, 2));
    }
}

async function loadTodos() {
    const content = await fs.readFile(TODO_FILE, 'utf-8');
    return JSON.parse(content);
}

async function saveTodos(todos) {
    await fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
}

async function addTodo() {
    const { title } = await inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'What do you need to do?',
        validate: input => input.length >= 3 || 'Todo must be at least 3 characters long'
    });

    const { priority } = await inquirer.prompt({
        type: 'list',
        name: 'priority',
        message: 'Select priority:',
        choices: ['High', 'Medium', 'Low']
    });

    const { dueDate } = await inquirer.prompt({
        type: 'input',
        name: 'dueDate',
        message: 'Due date (YYYY-MM-DD) - press enter to skip:',
        validate: input => {
            if (!input) return true;
            return /^\d{4}-\d{2}-\d{2}$/.test(input) || 'Please use YYYY-MM-DD format';
        }
    });

    const todos = await loadTodos();
    todos.push({
        id: Date.now(),
        title,
        priority,
        dueDate: dueDate || null,
        completed: false,
        createdAt: new Date().toISOString()
    });

    const spinner = createSpinner('Adding todo...').start();
    await saveTodos(todos);
    await sleep();
    spinner.success({ text: 'Todo added successfully!' });
}

async function viewTodos() {
    const todos = await loadTodos();
    if (todos.length === 0) {
        console.log(chalk.yellow('\nNo todos yet! Add some tasks to get started.'));
        return;
    }

    console.log(gradient.rainbow('\n=== Your Todo List ===\n'));
    
    todos.forEach((todo, index) => {
        const status = todo.completed ? chalk.green('✓') : chalk.red('✗');
        const title = todo.completed ? chalk.strikethrough(todo.title) : todo.title;
        const priorityColors = {
            High: chalk.red,
            Medium: chalk.yellow,
            Low: chalk.green
        };
        
        console.log(
            `${index + 1}. ${status} ${title}`,
            `[${priorityColors[todo.priority](todo.priority)}]`,
            todo.dueDate ? chalk.blue(`(Due: ${todo.dueDate})`) : ''
        );
    });
    console.log('\n');
}

async function toggleTodo() {
    const todos = await loadTodos();
    if (todos.length === 0) {
        console.log(chalk.yellow('\nNo todos to toggle!'));
        return;
    }

    const { index } = await inquirer.prompt({
        type: 'list',
        name: 'index',
        message: 'Which todo would you like to toggle?',
        choices: todos.map((todo, i) => ({
            name: `${todo.completed ? '✓' : '✗'} ${todo.title}`,
            value: i
        }))
    });

    todos[index].completed = !todos[index].completed;
    const spinner = createSpinner('Updating todo...').start();
    await saveTodos(todos);
    await sleep();
    spinner.success({ text: 'Todo updated successfully!' });
}

async function deleteTodo() {
    const todos = await loadTodos();
    if (todos.length === 0) {
        console.log(chalk.yellow('\nNo todos to delete!'));
        return;
    }

    const { indices } = await inquirer.prompt({
        type: 'checkbox',
        name: 'indices',
        message: 'Select todos to delete:',
        choices: todos.map((todo, i) => ({
            name: `${todo.completed ? '✓' : '✗'} ${todo.title}`,
            value: i
        }))
    });

    if (indices.length === 0) {
        console.log(chalk.yellow('\nNo todos selected for deletion.'));
        return;
    }

    const newTodos = todos.filter((_, index) => !indices.includes(index));
    const spinner = createSpinner('Deleting todos...').start();
    await saveTodos(newTodos);
    await sleep();
    spinner.success({ text: 'Todos deleted successfully!' });
}

async function todoManager() {
    await initTodoFile();

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Todos',
                'Add Todo',
                'Toggle Todo',
                'Delete Todo',
                'Back to Main Menu'
            ]
        });

        switch (action) {
            case 'View Todos':
                await viewTodos();
                break;
            case 'Add Todo':
                await addTodo();
                break;
            case 'Toggle Todo':
                await toggleTodo();
                break;
            case 'Delete Todo':
                await deleteTodo();
                break;
            case 'Back to Main Menu':
                return;
        }
    }
}

export { todoManager };
