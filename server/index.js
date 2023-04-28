const express = require('express');
const app = express();
const port = 4201;
const cors = require('cors');

const router = require('./router.js');

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    app.listen(port, () => {
      console.log(`🌽 Listening on http://localhost:${port}`);
    });
  } catch (e) {
    console.log('Error in connecting to database :', e);
  }
})();

    // app.listen(port, () => {
    //   console.log(`🌽 Listening on http://localhost:${port}`);
    // });

    module.exports = app;
