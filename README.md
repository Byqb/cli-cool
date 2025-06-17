# CLI Cool - Interactive Command Line Tool 🚀

[![Node.js Version][node-version-shield]][node-version-url]
[![NPM Version][npm-version-shield]][npm-version-url]
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
[![Last Commit][last-commit-shield]][last-commit-url]

<p align="center">
  <a href="https://github.com/Byqb/cli-cool">
    <img src="docs/images/logo.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">CLI Cool</h3>

  <p align="center">
    A feature-rich, interactive command-line interface tool that combines utility, productivity, and stunning animations!
    <br />
    <a href="#documentation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/Byqb/cli-cool/issues">Report Bug</a>
    ·
    <a href="https://github.com/Byqb/cli-cool/issues">Request Feature</a>
  </p>
</p>

## Table of Contents 📑

- [About The Project](#about-the-project)
  - [Built With](#built-with)
  - [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Animations Demo](#animations-demo)
  - [File Manager](#file-manager)
  - [Todo Manager](#todo-manager)
  - [Notes Manager](#notes-manager)
  - [System Information](#system-information)
  - [Countdown Timer](#countdown-timer)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)

## About The Project 💡

<p align="center">
  <img src="docs/images/demo.gif" alt="CLI Cool Demo" width="600">
</p>

CLI Cool is a modern, feature-rich command-line interface tool designed to enhance your terminal experience. Combining utility with aesthetic appeal, it offers a suite of tools ranging from file management to interactive animations.

### Built With 🛠️

- [Node.js](https://nodejs.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [Chalk](https://github.com/chalk/chalk)
- [Gradient String](https://github.com/bokub/gradient-string)
- [Chalk Animation](https://github.com/bokub/chalk-animation)
- [Figlet](https://github.com/patorjk/figlet.js)
- [Nanospinner](https://github.com/usmanyunusov/nanospinner)

### Key Features ⭐

#### Interactive Animations
```bash
# Example of rainbow animation
cli-cool animate rainbow "Hello, World!"
```

#### File Management
```bash
# Navigate and manage files
cli-cool files list ./my-directory
```

#### Todo Management
```javascript
// Example todo structure
{
"id": 1234567890,
"title": "Complete documentation",
"priority": "High",
"dueDate": "2025-06-20",
"completed": false
}
```

#### Notes System
```javascript
// Example note structure
{
"id": 1234567890,
"title": "Project Ideas",
"content": "# My Ideas\n\n1. Feature A\n2. Feature B",
"category": "Development",
"createdAt": "2025-06-17T10:00:00Z"
}
```

## Getting Started 🚀

### Prerequisites 📋

- Node.js (version 14 or higher)
  ```bash
  node --version
  ```

- npm
  ```bash
  npm --version
  ```

### Installation 💻

1. Clone the repository
   ```bash
   git clone https://github.com/Byqb/cli-cool.git
   ```

2. Navigate to project directory
   ```bash
   cd cli-cool
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Link the package (optional, for global usage)
   ```bash
   npm link
   ```

## Usage 📖

### Quick Start

```bash

# Start the CLI tool

node index.js

# Or if globally linked

cli-cool
```

### Animations Demo 🎨

<details>
<summary>Click to expand animation examples</summary>

#### Rainbow Animation

```bash
cli-cool animate rainbow "Hello World"
```

#### Pulse Animation

```bash
cli-cool animate pulse "Loading..."
```

</details>

### File Manager 📁

<details>
<summary>Click to expand file manager examples</summary>

#### Browse Files

```bash
cli-cool files browse
```

#### View File Info

```bash
cli-cool files info ./myfile.txt
```

</details>

## Documentation 📚

For detailed documentation, please visit our [Wiki](https://github.com/Byqb/cli-cool/wiki).

### API Reference

#### Animation Module

```javascript
import { animate } from 'cli-cool';

// Rainbow animation
animate.rainbow('Hello World');

// Pulse animation
animate.pulse('Loading...');
```

## Roadmap 🗺️

- [x] Basic animation system
- [x] File management
- [x] Todo system
- [x] Notes management
- [ ] Cloud sync
- [ ] Multiple themes
- [ ] Plugin system
- [ ] Command aliases

See the [open issues](https://github.com/Byqb/cli-cool/issues) for a full list of proposed features and known issues.

## Contributing 🤝

Contributions make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Development Setup

```bash

# Install dev dependencies

npm install --save-dev

# Run tests

npm test

# Run linter

npm run lint
```

## Troubleshooting 🔧

### Common Issues

1. **Animations not working**

   - Ensure terminal supports ASCII colors
   - Check Node.js version (>= 14.0.0)

2. **File permissions**
   - Run with appropriate permissions
   - Check file ownership

### Error Codes

| Code | Description        | Solution                     |
| ---- | ------------------ | ---------------------------- |
| E001 | Animation failed   | Check terminal compatibility |
| E002 | File access denied | Check permissions            |
| E003 | Invalid input      | Verify input format          |

## Changelog 📝

### [1.0.0] - 2025-06-17

- Initial release
- Added animation system
- Implemented file manager
- Added todo and notes system

### [1.1.0] - Coming Soon

- Cloud sync feature
- Multiple themes
- Performance improvements

## Contact 📧

IG - [@b0yqb](https://instagram.com/b0yqb)

Project Link: [https://github.com/Byqb/cli-cool](https://github.com/Byqb/cli-cool)

## Acknowledgments 🙏

- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [Chalk](https://github.com/chalk/chalk)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [Choose an Open Source License](https://choosealicense.com)

<!-- MARKDOWN LINKS & IMAGES -->

[node-version-shield]: https://img.shields.io/node/v/cli-cool?style=for-the-badge
[node-version-url]: https://nodejs.org/
[npm-version-shield]: https://img.shields.io/npm/v/cli-cool?style=for-the-badge
[npm-version-url]: https://www.npmjs.com/package/cli-cool
[contributors-shield]: https://img.shields.io/github/contributors/Byqb/cli-cool?style=for-the-badge
[contributors-url]: https://github.com/Byqb/cli-cool/graphs/contributors
[license-shield]: https://img.shields.io/github/license/Byqb/cli-cool?style=for-the-badge
[license-url]: https://github.com/Byqb/cli-cool/blob/master/LICENSE
[last-commit-shield]: https://img.shields.io/github/last-commit/Byqb/cli-cool?style=for-the-badge
[last-commit-url]: https://github.com/Byqb/cli-cool/commits/master
