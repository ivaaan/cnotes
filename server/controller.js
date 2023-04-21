const google = require('./google.js');

const get = async (req, res) => {
  try {
    const data = await google.getData();
    res.status(200).json(data);
    return data;
  } catch (e) {
    res.status(500);
  }
};

const post = (req, res) => {
  res.status(201);
};

module.exports = { get, post };
