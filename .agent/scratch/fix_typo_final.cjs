const fs = require('fs');
const path = 'c:\\Users\\pablo\\Documents\\Projetos\\cauaromei\\index.html';
let content = fs.readFileSync(path, 'utf8');

// The exact string seen in view_file: "</<div"
content = content.replace(/<\/<div/g, '</div><div');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed specifically </<div');
