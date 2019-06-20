const create = require('@modules/create-item')

module.exports = async (req, res) => {
  const body = req.body.items
  const items = []

  for (let i = body.length; i--;) {
    const data = body.items[i]
    const item = await create(data)
    items.push(item)
  }

  res.json(items.length === 1 ? items[0] : items)
}