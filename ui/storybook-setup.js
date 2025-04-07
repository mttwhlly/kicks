/**
 * This script checks if Storybook configuration is valid
 * without actually starting the server.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check essential files
const essentialFiles = [
  '.storybook/main.js',
  '.storybook/preview.tsx',
  '.storybook/mocks.ts',
  'app/components/SimpleBox/SimpleBox.tsx',
  'app/components/SimpleBox/SimpleBox.stories.tsx',
];

let allExists = true;

console.log('Checking Storybook configuration...');

essentialFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allExists = false;
  }
});

// Check story files
const componentDirs = fs.readdirSync(path.join(__dirname, 'app/components'));
console.log('\nChecking components directories...');
componentDirs.forEach(dir => {
  console.log(`- ${dir}`);
});

// Check for stories
console.log('\nChecking for story files...');
let storyCount = 0;
function countStories(dir) {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      countStories(path.join(dir, file));
    } else if (file.includes('.stories.')) {
      console.log(`✅ Found story: ${path.join(dir, file)}`);
      storyCount++;
    }
  });
}

countStories('app/components');
console.log(`\nTotal stories found: ${storyCount}`);

if (allExists && storyCount > 0) {
  console.log('\n✅ Storybook setup looks good!');
  console.log('Run "npm run storybook" to start the Storybook server.');
} else {
  console.log('\n❌ Storybook setup has issues to resolve.');
}