const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const extractKeywords = require('./extract-keywords');

describe('extractKeywords API', () => {
  let server;
  let port;

  beforeAll((done) => {
    server = http.createServer((req, res) => {
      if (req.url === '/api/extract-keywords' && req.method.toLowerCase() === 'post') {
        extractKeywords(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    });

    server.listen(0, () => {
      port = server.address().port;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 405 if method is not POST', (done) => {
    http.get(`http://localhost:${port}/api/extract-keywords`, (res) => {
      expect(res.statusCode).toBe(405);
      done();
    });
  });

  it('should return 400 if no file is uploaded', (done) => {
    const req = http.request(
      {
        method: 'POST',
        host: 'localhost',
        port: port,
        path: '/api/extract-keywords',
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
      },
      (res) => {
        expect(res.statusCode).toBe(400);
        done();
      }
    );
    req.write('------WebKitFormBoundary7MA4YWxkTrZu0gW--');
    req.end();
  });
});
