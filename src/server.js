const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log('DB connection sucessfully');
});
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on  http://localhost:${port}`);
});
