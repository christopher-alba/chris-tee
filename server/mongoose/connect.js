const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://christopher-alba:14Keyboard@chrishty.2ivgu.mongodb.net/Chrishty?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connect succesfully to db.');
});

module.exports = {
  db,
};
