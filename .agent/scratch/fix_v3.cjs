const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
const content = fs.readFileSync(path, 'utf8');

const start = 'Photography + Fullset</span></div>';
const end = '<div data-reveal="" id="w-node-c5a4f362-2316-5353-ec20-601455756218-22ebb560"';

const startIndex = content.indexOf(start);
const endIndex = content.indexOf(end);

if (startIndex !== -1 && endIndex !== -1) {
    const between = content.substring(startIndex + start.length, endIndex);
    console.log('BETWEEN:', JSON.stringify(between));
    
    const newContent = content.substring(0, startIndex + start.length) + '</div>' + content.substring(endIndex);
    fs.writeFileSync(path, newContent, 'utf8');
    console.log('SUCCESS: Typo replaced with </div>');
} else {
    console.log('ERROR: Markers not found', { startIndex, endIndex });
}
