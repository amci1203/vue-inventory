const { Store } = require('@models')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    const store = await Store.update(req.body, {
      where: { id },
      returning: true
    })
    return res.json(store[1])
  } catch (err) {
    console.error(err)
    res.status(500).send(err.toString())
  }
}