const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix the main structural typo
content = content.replace(/<\/<\/div/g, '</div><div');

// 2. Fix the broken tag at the start of the next section
content = content.replace(/\/a><\/div><div class="underline__css/g, '</div><div class="underline__css');

// 3. Ensure the social links are clean (remove legacy text links if they still exist in that giant line)
content = content.replace(/<\/svg><\/a><\/div><div class="link-group">.*?Whatsapp<\/a><\/div>/g, ' </svg></a></div>');

fs.writeFileSync(path, content, 'utf8');
console.log('Site restored and cleaned.');
