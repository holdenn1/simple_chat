const express = require('express')

const app = express() // создал экспрес приложение
const server = require('http').Server(app) // сщздал сервер благодоря библиотеке http и он будет работать через арр
const io = require('socket.io')(server) //подключил сервер к сокетам, то что вернет сокет передаь в пременную io

const rooms = new Map()

app.get('/rooms', (req, res) => {
  res.json(rooms)
})

app.post('/rooms', (req, res) => {
  console.log('Hello')
})

io.on('connection', (socket) => { // когда пользователь подключился к сокетам то тогда сказать user connecting
  console.log('user connecting', socket.id)
})

server.listen(5000, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('Server running...')
})