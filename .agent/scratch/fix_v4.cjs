const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
const content = fs.readFileSync(path, 'utf8');

const startMarker = 'Fotografia + Fullset</span></div>';
const endMarker = 'id="w-node-c5a4f362-2316-5353-ec20-601455756218-22ebb560"';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    // Find the start of the div that contains the endMarker
    const divStart = content.lastIndexOf('<div', endIndex);
    
    const between = content.substring(startIndex + startMarker.length, divStart);
    console.log('BETWEEN:', JSON.stringify(between));
    
    const newContent = content.substring(0, startIndex + startMarker.length) + '</div>' + content.substring(divStart);
    fs.writeFileSync(path, newContent, 'utf8');
    console.log('SUCCESS: Fixed typo between markers');
} else {
    console.log('ERROR: Markers not found', { startIndex, endIndex });
}
