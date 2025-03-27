#!/bin/bash

# VaultKey Browser Extension Build Script
# This script prepares the extension for submission to browser extension stores

# Color constants
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════╗"
echo "║                                                   ║"
echo "║   VaultKey Browser Extension Build Script         ║"
echo "║                                                   ║"
echo "╚═══════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check for required dependencies
echo -e "${YELLOW}Checking required dependencies...${NC}"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/ (version 14+ recommended)"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "✓ ${GREEN}Node.js detected:${NC} $NODE_VERSION"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    echo "npm should be installed with Node.js"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "✓ ${GREEN}npm detected:${NC} $NPM_VERSION"

# Create dist directory if it doesn't exist
echo -e "\n${YELLOW}Creating build directory...${NC}"
mkdir -p dist
echo -e "✓ ${GREEN}Build directory created${NC}"

# Create output structure
echo -e "\n${YELLOW}Preparing extension files...${NC}"

# Copy manifest.json to dist
echo "Copying manifest.json..."
cp manifest.json dist/

# Copy index.html
echo "Copying index.html..."
cp index.html dist/

# Copy src directory structure
echo "Copying source files..."
cp -r src dist/

# Check if zip command is available for creating the final package
if command -v zip &> /dev/null; then
    echo -e "\n${YELLOW}Creating extension package...${NC}"
    cd dist
    zip -r ../vaultkey-extension.zip ./*
    cd ..
    echo -e "✓ ${GREEN}Extension package created:${NC} vaultkey-extension.zip"
else
    echo -e "\n${YELLOW}Note: 'zip' command not found. Package not created.${NC}"
    echo "To create the extension package manually, zip the contents of the 'dist' folder."
fi

echo -e "\n${GREEN}Build completed successfully!${NC}"
echo -e "The extension files are available in the ${BLUE}dist/${NC} directory"
if command -v zip &> /dev/null; then
    echo -e "The packaged extension is available as ${BLUE}vaultkey-extension.zip${NC}"
fi
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test the extension in your browser"
echo "2. Submit to browser extension stores"
echo ""