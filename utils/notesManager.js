import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import fs from 'fs/promises';
import path from 'path';
import gradient from 'gradient-string';

const NOTES_FILE = path.join(process.cwd(), 'data', 'notes.json');
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Ensure the notes file exists
async function initNotesFile() {
    try {
        await fs.access(NOTES_FILE);
    } catch {
        await fs.writeFile(NOTES_FILE, JSON.stringify([], null, 2));
    }
}

async function loadNotes() {
    const content = await fs.readFile(NOTES_FILE, 'utf-8');
    return JSON.parse(content);
}

async function saveNotes(notes) {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}

async function addNote() {
    const { title } = await inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'Enter note title:',
        validate: input => input.length >= 3 || 'Title must be at least 3 characters long'
    });

    const { content } = await inquirer.prompt({
        type: 'editor',
        name: 'content',
        message: 'Enter your note (an editor will open):',
        validate: input => input.length >= 1 || 'Note cannot be empty'
    });

    const { category } = await inquirer.prompt({
        type: 'input',
        name: 'category',
        message: 'Enter category (optional):',
    });

    const notes = await loadNotes();
    notes.push({
        id: Date.now(),
        title,
        content,
        category: category || 'Uncategorized',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    const spinner = createSpinner('Saving note...').start();
    await saveNotes(notes);
    await sleep();
    spinner.success({ text: 'Note saved successfully!' });
}

async function viewNotes() {
    const notes = await loadNotes();
    if (notes.length === 0) {
        console.log(chalk.yellow('\nNo notes yet! Add some notes to get started.'));
        return;
    }

    // Group notes by category
    const categorized = notes.reduce((acc, note) => {
        acc[note.category] = acc[note.category] || [];
        acc[note.category].push(note);
        return acc;
    }, {});

    console.log(gradient.rainbow('\n=== Your Notes ===\n'));
    
    for (const [category, categoryNotes] of Object.entries(categorized)) {
        console.log(chalk.cyan(`\n${category}:`));
        categoryNotes.forEach((note, index) => {
            console.log(chalk.white(`${index + 1}. ${note.title}`));
            console.log(chalk.gray(`   Created: ${new Date(note.createdAt).toLocaleString()}`));
        });
    }
}

async function viewNoteContent() {
    const notes = await loadNotes();
    if (notes.length === 0) {
        console.log(chalk.yellow('\nNo notes to view!'));
        return;
    }

    const { noteId } = await inquirer.prompt({
        type: 'list',
        name: 'noteId',
        message: 'Select a note to view:',
        choices: notes.map(note => ({
            name: `${note.title} (${note.category})`,
            value: note.id
        }))
    });

    const note = notes.find(n => n.id === noteId);
    console.log(gradient.rainbow('\n=== Note Details ===\n'));
    console.log(chalk.cyan(`Title: ${note.title}`));
    console.log(chalk.cyan(`Category: ${note.category}`));
    console.log(chalk.cyan('Content:'));
    console.log(chalk.white(note.content));
    console.log(chalk.gray(`\nCreated: ${new Date(note.createdAt).toLocaleString()}`));
    console.log(chalk.gray(`Updated: ${new Date(note.updatedAt).toLocaleString()}`));
}

async function editNote() {
    const notes = await loadNotes();
    if (notes.length === 0) {
        console.log(chalk.yellow('\nNo notes to edit!'));
        return;
    }

    const { noteId } = await inquirer.prompt({
        type: 'list',
        name: 'noteId',
        message: 'Select a note to edit:',
        choices: notes.map(note => ({
            name: `${note.title} (${note.category})`,
            value: note.id
        }))
    });

    const noteIndex = notes.findIndex(n => n.id === noteId);
    const note = notes[noteIndex];

    const { title } = await inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'Edit title:',
        default: note.title
    });

    const { content } = await inquirer.prompt({
        type: 'editor',
        name: 'content',
        message: 'Edit content:',
        default: note.content
    });

    const { category } = await inquirer.prompt({
        type: 'input',
        name: 'category',
        message: 'Edit category:',
        default: note.category
    });

    notes[noteIndex] = {
        ...note,
        title,
        content,
        category,
        updatedAt: new Date().toISOString()
    };

    const spinner = createSpinner('Updating note...').start();
    await saveNotes(notes);
    await sleep();
    spinner.success({ text: 'Note updated successfully!' });
}

async function deleteNote() {
    const notes = await loadNotes();
    if (notes.length === 0) {
        console.log(chalk.yellow('\nNo notes to delete!'));
        return;
    }

    const { noteIds } = await inquirer.prompt({
        type: 'checkbox',
        name: 'noteIds',
        message: 'Select notes to delete:',
        choices: notes.map(note => ({
            name: `${note.title} (${note.category})`,
            value: note.id
        }))
    });

    if (noteIds.length === 0) {
        console.log(chalk.yellow('\nNo notes selected for deletion.'));
        return;
    }

    const newNotes = notes.filter(note => !noteIds.includes(note.id));
    const spinner = createSpinner('Deleting notes...').start();
    await saveNotes(newNotes);
    await sleep();
    spinner.success({ text: 'Notes deleted successfully!' });
}

async function notesManager() {
    await initNotesFile();

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Notes',
                'View Note Content',
                'Add Note',
                'Edit Note',
                'Delete Note',
                'Back to Main Menu'
            ]
        });

        switch (action) {
            case 'View All Notes':
                await viewNotes();
                break;
            case 'View Note Content':
                await viewNoteContent();
                break;
            case 'Add Note':
                await addNote();
                break;
            case 'Edit Note':
                await editNote();
                break;
            case 'Delete Note':
                await deleteNote();
                break;
            case 'Back to Main Menu':
                return;
        }
    }
}

export { notesManager };
