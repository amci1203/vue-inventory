const { Customer } = require('@models')
const debug = require('debug')('Update Customer')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    const customer = await Customer.update(req.body, {
      where: { id },
      returning: true
    })
    return res.json(customer[1])
  } catch (err) {
    debug(err)
    res.status(500).send(err.toString())
  }
}