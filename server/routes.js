const routes = module.exports = require('next-routes')()

routes
  .add({ name: 'home', pattern: '/', page: 'Home/index' })
  // .add({ name: 'about', pattern: '/about', page: 'About/index' })