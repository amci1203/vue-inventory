const { Customer } = require('@models')

module.exports = async (req, res) => {
  const [customers, count] = await Customer.findAndCountAll()
  res.json({ customers, count })
}