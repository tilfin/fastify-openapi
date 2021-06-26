import fastify from 'fastify'
import { UserController } from './controllers/user'
const schemas = require('../schema.json').definitions

const server = fastify()
server.register(require('fastify-swagger'), {
  routePrefix: '/documentation',
  openapi: {
    info: {
      title: 'Fastify OpenAPI',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    servers: [{
      url: 'http://localhost:8080'
    }],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    }
  },
  exposeRoute: true
})

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

const userCtrl = new UserController()

server.get('/users/:id', {
  schema: {
    params: {

    },
    querystring: schemas.GetUserQuery,
    response: {
      200: schemas.User,
    },
  }
}, userCtrl.get)

server.ready((err: Error) => {
  if (!err) {
    (server as any).swagger()
  }
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
