const { Item } = require('@models')
const debug = require('debug')('Create Item')

module.exports = async (params) => {
  try {
    const store_id = req.app.locals.store
    const item = await Item.create({
      store_id,
      ...params
    })
    return item
  } catch (err) {
    debug(err)
    return { err }
  }
}