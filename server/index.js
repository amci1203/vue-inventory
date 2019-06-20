require('module-alias/register')
require('dotenv').config()

const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')

const generateRoutes = require('./index.routes')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // set initial value of current store to none
  app.locals.store = ''
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server
  
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  
  
  // middlewares
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Server routes
  app.use('/api', await generateRoutes())
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()