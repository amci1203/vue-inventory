module.exports = [
  ['/:id?', 'read'],
  ['post', '/', 'create'],
  ['put', '/:id', 'update'],
  ['delete', '/:id', 'delete']
]