const http = require('http')
const fs = require('fs')
const path = require('path')

// import http from "http"
// import * as fs from "fs"
// import { fileURLToPath } from "url"
// import path from "path"

const PORT = 3000
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  console.log('Server request')
  console.log(req.url, req.method)

  res.setHeader('Content-Type', 'text/html')


  const createPath = page => path.resolve(__dirname, 'views', `${page}.html`)

  let baseUrl = ''

  switch (req.url) {
    case '/':
    case '/home':
    case '/index.html':
      baseUrl = createPath('index')
      res.statusCode = 200
      break;
    case '/hola':
      res.statusCode = 301
      res.setHeader('Location', '/hello')
      res.end()
      break;
    case '/hello':
      baseUrl = createPath('hello')
      res.statusCode = 200
      break;
    case '/world':
      baseUrl = createPath('world')
      res.statusCode = 200
      break;
    default:
      baseUrl = createPath('error')
      res.statusCode = 404
      break;
  }

  fs.readFile(baseUrl, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    }
    else {
      res.write(data)
      res.end()
    }
  });
})

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(`Error`) : console.log(`Listening port ${PORT}`)
})
