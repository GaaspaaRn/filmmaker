const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Fix the HTML typo specifically
content = content.replace(/<\/<\/div data-reveal="" id="w-node-c5a4f362-2316-5353-ec20-601455756218-22ebb560"/g, '</div></div><div data-reveal="" id="w-node-c5a4f362-2316-5353-ec20-601455756218-22ebb560"');

fs.writeFileSync(path, content, 'utf8');
console.log('Typo fix complete');
