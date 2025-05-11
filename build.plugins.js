const { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

function isNonEmptyFolder(folderPath) {
  if (!existsSync(folderPath)) {
    return false;
  }
  
  const items = readdirSync(folderPath);
  // Check if there are any items in the folder
  return items.some((item) => {
    const fullPath = join(folderPath, item);
    // Check if the item is a file or a non-empty directory
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      return isNonEmptyFolder(fullPath); // Recursively check subfolders
    }
    return true; // It's a file
  });
}

// Function to get all non-empty folders
function getNonEmptyFolders(rootFolder) {
  // 创建目录路径如果不存在
  const dirs = rootFolder.split('/');
  let currentPath = '.';
  
  for (const dir of dirs) {
    currentPath = join(currentPath, dir);
    if (!existsSync(currentPath)) {
      mkdirSync(currentPath, { recursive: true });
      console.log(`Created directory: ${currentPath}`);
    }
  }
  
  try {
    const result = [];
    const items = readdirSync(rootFolder);

    items.forEach((item) => {
      const fullPath = join(rootFolder, item);
      const stats = statSync(fullPath);
      if (stats.isDirectory() && isNonEmptyFolder(fullPath)) {
        result.push(item);
      }
    });

    return result;
  } catch (error) {
    console.error(`Error reading directory ${rootFolder}:`, error);
    return [];
  }
}

const abc = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const listPath = './libraries/plugins/src/list';
const list = getNonEmptyFolders(listPath);
const fileContent = list.length === 0 
  ? `export default [];` 
  : `${list
    .map((p, index) => {
      return `import Module${abc[
        index
      ].toUpperCase()} from '@gitroom/plugins/list/${p}/backend/module';`;
    })
    .join('\n')}

export default [${list
    .map((p, index) => {
      return `Module${abc[index].toUpperCase()}`;
    })
    .join(', ')}];
`;

// 确保plugins.ts文件存在
const pluginsFilePath = './libraries/plugins/src/plugins.ts';
writeFileSync(pluginsFilePath, fileContent);
console.log(`Successfully wrote to ${pluginsFilePath}`);
