const { createServer } = require('json-server')
const server = createServer()
const path = require('path')

server.use(require('json-server').defaults())
server.use(require('json-server').router(path.join(__dirname, 'db.json')))

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`)
})