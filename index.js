const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const currentDirectory = __dirname; // The current directory where the script is located

app.get('/', (req, res) => {
  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Internal Server Error');
    }

    const htmlFiles = files.filter(file => path.extname(file) === '.html');
    const fileListHTML = htmlFiles.map(file => `<li>${file}</li>`).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>List of HTML Files</title>
      </head>
      <body>
        <h1>List of HTML Files in the Current Directory:</h1>
        <ul>
          ${fileListHTML}
        </ul>
      </body>
      </html>
    `;

    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
