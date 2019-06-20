module.exports = [
  ['/', 'read'],
  ['post', '/', 'create'],
  ['post', '/:id', 'push'],
  ['put', '/:id', 'update'],
  ['delete', '/:id', 'delete'],
  ['delete', '/:id/last', 'pop']
]