const express = require('express')
const fs = require('fs-extra')
const path = require('path')

const app = express()
const ROUTES_FOLDER = path.join(__dirname, 'routes')

async function generateRoutes () {
  let folders

  try {
    folders = await fs.readdir(ROUTES_FOLDER)
  } catch (err) {
    console.error('ERR: Unable to access routes directory')
    console.error(err)
    process.exit(1)
  }
  
  try {
    const routes = folders
      .map(f => ({
        base: path.join(ROUTES_FOLDER, f),
        name: '/' + f
      }))
      .filter(({ base }) => fs.lstatSync(base).isDirectory() && !base.includes('middleware'))
      .map(({ base, name }) => {
        const router = express.Router()
        const getHandler = n => path.resolve(base, n + '.js')
        const middleware = n => path.resolve(base, 'middleware', n + '.js')

        const routes = require(base + '.js')
        const len = routes.length

        for (let i = 0; i < len; i++) {
          const part = routes[i]

          // issa middleware
          if (typeof part === 'string') {
            router.use(middleware(part))
            continue
          }

          let method = 'get'
          let path
          let handler

          if (part[0].charAt(0) === '/') {
            // No method specified; is GET by default
            path = part[0]
            const fn = part.length === 1 ? path.substring(1) : part[1]
            handler = getHandler(fn)
          } else if (part.length === 2) {
            // A method was specified and the path name is the same as the handler
            method = part[0].toLowerCase()
            path = part[1]
            handler = getHandler(path.substring(1))
          } else {
            // A method, path, and handler were specified
            method = part[0].toLowerCase()
            path = part[1]
            handler = getHandler(part[2])
          }

          // console.log({ method, path, handler, part })
          router[method](path, require(handler))
        }

        return [name, router]
      })

    let index = routes.length
    if (index === 0) return

    while (index--) {
      app.use(...routes[index])
      console.log('%s routes successfully loaded', routes[index][0])
    }
    console.log('-----------------------------')

    return app
  } catch (err) {
    console.error('ERR: Problem occurred in loading a route handler')
    console.error(err)
    process.exit(1)
  }
}

module.exports = generateRoutes