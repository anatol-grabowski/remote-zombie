const express = require('express')
const { connections } = require('../connections')

const app = express()

app.get('*', (request, response) => {
  const conns = connections.map(conn => {
    conn = {...conn}
    delete conn.ws
    return conn
  })
  console.log(conns)
  response.json(conns)
})

module.exports = app
