const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Fix the HTML typo
content = content.replace(/<\/<\/div/g, '</div></div><div');

// Remove the legacy links
content = content.replace(/<\/svg><\/a><\/div><div class="link-group">.*?Whatsapp<\/a><\/div>/g, ' </svg></a></div>');

fs.writeFileSync(path, content, 'utf8');
console.log('Cleanup complete');
