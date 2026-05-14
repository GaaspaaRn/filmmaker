const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
const content = fs.readFileSync(path, 'utf8');

// The problematic string
const bad = '</</div data-reveal="" id="w-node-c5a4f362-2316-5353-ec20-601455756218-22ebb560"';
const good = '</div></div><div data-reveal="" id="w-node-c5a4f362-2316-5353-ec20-601455756218-22ebb560"';

if (content.includes(bad)) {
    const newContent = content.replace(bad, good);
    fs.writeFileSync(path, newContent, 'utf8');
    console.log('SUCCESS: Typo fixed');
} else {
    console.log('ERROR: Bad string not found');
    // Check if it's already fixed or slightly different
    if (content.includes(good)) {
        console.log('INFO: Good string already present');
    }
}
