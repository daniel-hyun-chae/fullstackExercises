require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}

// this configuration can be replaced by node-config package if app gets complicated
// https://github.com/lorenwest/node-config