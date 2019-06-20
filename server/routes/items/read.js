const { Item } = require('@models')

module.exports = async (req, res) => {
  const [customers, count] = await Item.findAndCountAll()
  res.json({ customers, count })
}