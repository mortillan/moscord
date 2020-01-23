const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = async function database() {
  try {

    if(process.env.APP_ENV === 'local') {
      mongoose.set('debug', true);
    }

    if(mongoose.connection.readyState) {
      return;
    }

    return mongoose.connect(process.env.DB_DATABASE, {
      // dbName: process.env.DB_DATABASE,
      auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
      poolSize: 4,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (err) {
    
    throw err;

  }
}