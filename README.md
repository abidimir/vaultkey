# VaultKey - Password Strength Checker & Generator

A comprehensive browser extension designed to enhance online password security through intelligent generation, real-time strength evaluation, and user-friendly management tools.

![VaultKey Screenshot](src/icons/icon128.svg)

## Features

- **Secure Password Generation**: Generate strong passwords with customizable options
- **Real-time Strength Analysis**: Visual feedback on password strength
- **Character Type Selection**: Include uppercase, lowercase, numbers, symbols, whitespace, emojis and ASCII characters
- **Password History**: Maintain a history of previously generated passwords
- **Dark/Light Mode**: Toggle between color themes with persistent preferences
- **Compact UI**: Minimalist design optimized for browser extension use

## Build Instructions

Follow these steps to build the VaultKey browser extension:

### Prerequisites

#### Required Environment
- Operating System: Ubuntu 24.04 LTS (Desktop edition) is recommended, but the extension can be built on any OS with Node.js
- System Memory: 2GB RAM minimum (4GB recommended)
- Disk Space: 50MB free space for the extension and its dependencies

#### Required Software
- Node.js (version 20.0.0 or higher)
- npm (version 10.0.0 or higher)

### Setup and Build Process

1. **Clone the repository**

```bash
git clone https://github.com/abidimir/vaultkey.git
cd vaultkey
cd vaultkey
```

2. **Using the Build Script**

We provide a build script that handles the entire build process for you:

```bash
chmod +x build.sh
./build.sh
```

This script:
- Checks for required dependencies (Node.js and npm)
- Installs project dependencies
- Builds the extension
- Creates a properly structured ZIP file in the `dist` directory

3. **Manual Build Process**

Alternatively, you can build manually:

```bash
# Install dependencies
npm install

# Build the extension (if you have a build script)
npm run build
```

### Creating Extension Package Manually

To create a ZIP file for submission to browser extension stores:

1. **Create a ZIP file with the necessary files**

Make sure to include these files and maintain the folder structure:
- manifest.json (at the root level)
- index.html (at the root level)
- src/ directory with all CSS, JavaScript files, and icons
- All icons and assets referenced in the manifest

**Important**: When creating the ZIP file, ensure that `manifest.json` is at the root level of the ZIP archive, not inside a folder.

```bash
# Using command line (from project root)
zip -r vaultkey-extension.zip manifest.json index.html src/
```

### Source Code Submission Requirements for Mozilla Firefox Add-ons

This extension's source code package complies with Mozilla's source code submission requirements as follows:

#### Mozilla Source Code Checklist Compliance
- **No code minification or obfuscation**: All source code is unminified and readable
- **Open Source Build Tools**: We use only open-source tools that can run locally
- **Build Environment**:
  - The build has been tested with Ubuntu 24.04 LTS (Desktop edition)
  - Compatible with Mozilla's default build environment (Node.js 22 LTS, npm 10)
  - Will also work with other Linux distributions, macOS, and Windows where Node.js is available

#### Our Source Package Includes:
- Complete unprocessed source code
- Detailed README file (this document) with:
  - Operating system and environment specifications
  - Required versions of all tools
  - Step-by-step build instructions
- Build script (`build.sh`) that automates the entire build process
- No lockfile is needed as we don't use npm packages in the extension itself

This source code package will produce an identical copy of the extension that was submitted to the Firefox Add-ons Store. The source code does not use any minification, obfuscation, or complex build processes that would make review difficult.

## Testing

To test the extension locally:

### Firefox

1. Open Firefox
2. Navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from your project directory

### Chrome

1. Open Chrome
2. Navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the directory containing your extension

## Deployment

### Firefox Add-ons Store

1. Create a developer account at [Mozilla Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/)
2. Click "Submit a New Add-on"
3. Upload your ZIP file
4. Fill out the required information
5. Submit for review

### Chrome Web Store

1. Create a developer account at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Create a new item
3. Upload your ZIP file
4. Fill out the required information
5. Submit for review

## Development Conversation History

### Initial Request

**User**: 
Password Strength Checker and Generator Browser Extension

This document details the design, flow, and functionality of a browser extension for password generation and strength checking.

**Extension Name**: VaultKey

**Description**:
A browser extension that helps users create secure passwords and check their strength with real-time feedback.

**Key Features**:
1. Password generation with customizable options
2. Real-time password strength evaluation
3. Password history management
4. Compact, user-friendly interface

**Design and User Flow**:
1. User clicks the extension icon in the browser toolbar
2. The popup shows the main interface with:
   - Password display field (with visibility toggle)
   - Strength meter
   - Generation options
   - Generate button
   - History section
3. User can generate a new password, check existing password strength, or view/manage password history

**Password Generation Options**:
- Password length (slider: 6-30 characters)
- Character types (toggles):
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Symbols
  - Whitespace (optional)
  - Emojis (optional)
  - ASCII special characters (optional)

**Password Strength Evaluation**:
- Visual strength meter with color indication
- Text feedback (Weak, Moderate, Strong)
- Evaluation based on:
  - Length
  - Character diversity
  - Pattern recognition

**UI Components**:
- Compact design for extension popup
- Grey color theme (inspired by AdBlock extension)
- Clear visual hierarchy
- Light/dark mode toggle
- Support button (Ko-fi link)

**Technical Requirements**:
- Pure JavaScript for client-side operation
- Local browser storage for password history
- No server-side components
- Firefox and Chrome compatibility

### Dark Mode Implementation

**User**: Replace with the question mark button next to the toggle to a "Support" button, which should redirect to this page: https://ko-fi.com/vaultkey

**Assistant**: I'll replace the question mark button with a Support button that redirects to Ko-fi. Let me do this for you.

*[Implementation details of support button replacement]*

**User**: Yes. Everything is perfect and ready to deploy.

**Assistant**: Great! I'm glad you're happy with the implementation. The support button is now fully functional, allowing users to access the Ko-fi page directly from the VaultKey extension. Let's summarize what we've accomplished:

✓ Added dark/light mode toggle with persistent preference using localStorage
✓ Implemented theme switching throughout the UI for all elements
✓ Replaced help button with Support button linking to Ko-fi
✓ Added heart icon with pink color for Support button
✓ Included feedback toast when Support button is clicked
→ Ready for deployment

### Deployment Guidance

**User**: How can I deploy this to Firefox extension store?

**Assistant**: *[Detailed instructions for Firefox Add-ons Store deployment]*

**User**: When I upload the zip file to Submit a New Addon, I get an error saying "manifest.json was not found"

**Assistant**: *[Detailed instructions on fixing ZIP file structure]*

### GitHub Repository Structure

**User**: Could you restructure the files to match standard browser extension development for GitHub?

**Assistant**: I'll restructure the project for standard browser extension development on GitHub. We'll move from client/server architecture to a more standard browser extension structure with a src directory.

*[Implementation details of project restructuring]*

**User**: Perfect! The restructured files look good for GitHub.

**Assistant**: Great! The project is now properly structured for GitHub with a standardized browser extension layout:

✓ Moved files to standard browser extension structure
✓ Updated build script to use new file paths
✓ Created proper src/js, src/css, and src/icons directories
✓ Updated README documentation to reflect new structure
✓ Ready for GitHub publication and Firefox Add-ons Store submission

## License

MIT License

## Support Development

If you find this extension useful, please consider supporting its development:

[Support on Ko-fi](https://ko-fi.com/vaultkey)
