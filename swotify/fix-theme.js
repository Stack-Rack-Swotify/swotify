const fs = require('fs');
const path = require('path');

const dirs = [
    'c:/hackathon/Gemini_CLI/swotify/swotify/src/modules/teacher',
    'c:/hackathon/Gemini_CLI/swotify/swotify/src/modules/admin',
    'c:/hackathon/Gemini_CLI/swotify/swotify/src/modules/superAdmin'
];

const replacements = [
    ['bg-blue-500', 'bg-[#ea580c]'],
    ['bg-blue-600', 'bg-[#ea580c]'],
    ['bg-blue-700', 'bg-[#c2410c]'],
    ['text-blue-500', 'text-[#ea580c]'],
    ['text-blue-600', 'text-[#ea580c]'],
    ['text-blue-700', 'text-[#c2410c]'],
    ['bg-blue-50', 'bg-orange-50'],
    ['bg-blue-100', 'bg-orange-100'],
    ['border-blue-200', 'border-orange-200'],
    ['border-blue-500', 'border-[#ea580c]'],
    ['ring-blue-500', 'ring-[#ea580c]'],
    ['focus:ring-blue-500', 'focus:ring-orange-500/30'],
    ['focus:border-blue-500', 'focus:border-orange-500'],

    ['bg-purple-500', 'bg-[#334155]'],
    ['bg-purple-600', 'bg-[#334155]'],
    ['text-purple-500', 'text-[#334155]'],
    ['text-purple-600', 'text-[#334155]'],
    ['text-purple-700', 'text-[#334155]'],
    ['bg-purple-50', 'bg-slate-50'],
    ['bg-purple-100', 'bg-slate-100'],
    ['border-purple-200', 'border-slate-200'],
    ['ring-purple-500', 'ring-[#334155]'],
    ['focus:ring-purple-500', 'focus:ring-orange-500/30'],

    ['bg-cyan-500', 'bg-[#ea580c]'],
    ['bg-cyan-600', 'bg-[#ea580c]'],
    ['text-cyan-500', 'text-[#ea580c]'],
    ['text-cyan-600', 'text-[#ea580c]'],
    ['text-cyan-700', 'text-[#ea580c]'],
    ['bg-cyan-50', 'bg-orange-50'],
    ['bg-cyan-100', 'bg-orange-100'],
    ['border-cyan-200', 'border-orange-200'],

    ['bg-pink-500', 'bg-[#334155]'],
    ['bg-pink-600', 'bg-[#334155]'],
    ['text-pink-500', 'text-[#334155]'],
    ['text-pink-600', 'text-[#334155]'],
    ['text-pink-700', 'text-[#334155]'],
    ['bg-pink-50', 'bg-slate-50'],
    ['bg-pink-100', 'bg-slate-100'],
    ['border-pink-200', 'border-slate-200'],

    ['bg-indigo-500', 'bg-[#ea580c]'],
    ['bg-indigo-600', 'bg-[#ea580c]'],
    ['text-indigo-600', 'text-[#ea580c]'],
    ['bg-indigo-50', 'bg-orange-50'],
    ['bg-indigo-100', 'bg-orange-100'],

    // Gradient replacements
    ['bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600', 'bg-[#ea580c]'],
    ['bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400', 'bg-[#ea580c]'],
    ['bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400', 'bg-[#ea580c]'],
    ['bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500', 'bg-[#ea580c]'],
    ['from-blue-600 via-purple-600 to-pink-600', 'from-[#ea580c] to-[#c2410c]'],
    ['from-blue-500 via-purple-500 to-orange-400', 'from-[#ea580c] to-[#c2410c]'],
];

function getAllJsxFiles(dir) {
    let results = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(getAllJsxFiles(fullPath));
        } else if (item.endsWith('.jsx')) {
            results.push(fullPath);
        }
    }
    return results;
}

let totalReplacements = 0;
let filesModified = 0;

for (const dir of dirs) {
    const files = getAllJsxFiles(dir);
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        for (const [search, replace] of replacements) {
            content = content.split(search).join(replace);
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            filesModified++;
            console.log(`Modified: ${file}`);
        }
    }
}

console.log(`\nTheme replacement complete!`);
console.log(`Files modified: ${filesModified}`);
