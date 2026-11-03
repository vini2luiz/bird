/**
 * Zero-dependency static server for development and previews.
 *   node scripts/serve.mjs [dir]    (PORT env var, default 5173)
 * Supports HTTP Range requests, which browsers use to stream and seek video.
 * If the default port is taken it tries the next ones; an explicit PORT is honoured or fails.
 */
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '.');
const explicitPort = process.env.PORT !== undefined;
const firstPort = Number(process.env.PORT ?? 5173);
const MAX_ATTEMPTS = 10;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
};

async function resolveFile(urlPath) {
  const file = path.join(root, decodeURIComponent(urlPath));
  if (path.relative(root, file).startsWith('..')) return null; // path traversal
  const info = await stat(file).catch(() => null);
  if (info?.isDirectory()) return resolveFile(path.posix.join(urlPath, 'index.html'));
  return info?.isFile() ? { file, size: info.size } : null;
}

function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header ?? '');
  if (!match || (match[1] === '' && match[2] === '')) return null;
  const start = match[1] === '' ? size - Number(match[2]) : Number(match[1]);
  const end = match[1] !== '' && match[2] !== '' ? Number(match[2]) : size - 1;
  return { start: Math.max(0, start), end: Math.min(end, size - 1) };
}

async function handle(req, res) {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    const target = await resolveFile(pathname);
    if (!target) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }

    const headers = {
      'content-type': TYPES[path.extname(target.file)] ?? 'application/octet-stream',
      'accept-ranges': 'bytes',
      'cache-control': 'no-cache',
    };

    const range = parseRange(req.headers.range, target.size);
    if (req.headers.range && (!range || range.start > range.end)) {
      res.writeHead(416, { 'content-range': `bytes */${target.size}` }).end();
      return;
    }
    if (range) {
      res.writeHead(206, {
        ...headers,
        'content-range': `bytes ${range.start}-${range.end}/${target.size}`,
        'content-length': range.end - range.start + 1,
      });
      if (req.method === 'HEAD') return res.end();
      createReadStream(target.file, range).pipe(res);
      return;
    }

    res.writeHead(200, { ...headers, 'content-length': target.size });
    if (req.method === 'HEAD') return res.end();
    createReadStream(target.file).pipe(res);
  } catch (error) {
    console.error(error);
    res.writeHead(500).end();
  }
}

const server = createServer(handle);

// One listener for the port that actually bound (failed attempts must not log their own port)
server.once('listening', () => {
  const { port } = server.address();
  console.log(`Serving ${path.relative(process.cwd(), root) || '.'} at http://localhost:${port}`);
});

function listen(port, attempt = 1) {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && !explicitPort && attempt < MAX_ATTEMPTS) {
      console.log(`Port ${port} is in use, trying ${port + 1}…`);
      listen(port + 1, attempt + 1);
      return;
    }
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Stop the other server or set PORT to a free port.`);
      process.exit(1);
    }
    throw error;
  });
  server.listen(port);
}

listen(firstPort);
