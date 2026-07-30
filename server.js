const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 5173;

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

function serveStatic(req, res, pathname) {
  const filePath = path.join(ROOT, pathname === "/" ? "index.html" : decodeURIComponent(pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": CONTENT_TYPES[path.extname(filePath)] || "text/plain" });
    res.end(data);
  });
}

async function serveProxy(req, res, targetUrl) {
  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing or invalid ?url= parameter");
    return;
  }
  try {
    const upstream = await fetch(targetUrl, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TagTraceLocalProxy/1.0)" },
    });
    const text = await upstream.text();
    res.writeHead(upstream.status, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(text);
  } catch (err) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Proxy fetch failed: " + err.message);
  }
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, "http://localhost");
  if (parsed.pathname === "/fetch-proxy") {
    serveProxy(req, res, parsed.searchParams.get("url"));
    return;
  }
  serveStatic(req, res, parsed.pathname);
});

server.listen(PORT, () => {
  console.log(`Tag Trace running at http://localhost:${PORT}`);
  console.log("URL fetching now bypasses CORS via the local /fetch-proxy endpoint.");
});
