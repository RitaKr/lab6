const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0'; // Set to the desired host
const port = 8080; // Set to the desired port

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
}).listen(port, host, function () {
  console.log(`CORS Anywhere is listening on ${host}:${port}`);
});

//node cors-proxy.js
//to run server

