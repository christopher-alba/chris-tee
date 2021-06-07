module.exports = (server) => {
  server.use('/api/product', require('./product'))
}
