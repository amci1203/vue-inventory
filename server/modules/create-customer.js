const { Customer } = require('@models')
const debug = require('debug')('Create Customer')

module.exports = async (name) => {
  try {
    const store_id = req.app.locals.store
    const customer = await Customer.create({
      store_id,
      name
    })
    return customer
  } catch (err) {
    debug(err)
    return { err }
  }
}