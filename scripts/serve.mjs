import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const types = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript', svg: 'image/svg+xml' };
const files = new Set(['index.html', 'style.css', 'app.js', 'time.js', 'chicken.svg', 'favicon.svg']);
createServer(async (req, res) => {
  const name = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
  if (!files.has(name)) { res.writeHead(404); res.end('Niet gevonden. Tok ook nog niet.'); return; }
  try { res.writeHead(200, { 'Content-Type': types[name.split('.').pop()] }); res.end(await readFile(new URL(`../${name}`, import.meta.url))); }
  catch { res.writeHead(500); res.end('Er ging iets mis.'); }
}).listen(4173, '127.0.0.1', () => console.log('Tok preview: http://localhost:4173'));
