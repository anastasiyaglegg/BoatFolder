import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.')) || !types[extname(file)]) {
      response.writeHead(404).end('Not found');
      return;
    }
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)], 'Cache-Control': 'no-store' }).end(data);
  } catch {
    response.writeHead(404).end('Not found');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? 'Port 4173 is already in use. Try opening http://localhost:4173 or stop the other preview first.' : error.message);
  process.exitCode = 1;
});
server.listen(4173, '0.0.0.0', () => console.log('Portfolio preview: http://localhost:4173\nPress Ctrl+C to stop.'));
