import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'time.js', 'chicken.svg', 'favicon.svg']) {
  await copyFile(file, `dist/${file}`);
}
console.log('Built 6 static files in dist/');
