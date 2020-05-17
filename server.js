const express = require('express')

const app = express() // создал экспрес приложение
const server = require('http').Server(app) // сщздал сервер благодоря библиотеке http и он будет работать через арр
const io = require('socket.io')(server) //подключил сервер к сокетам, то что вернет сокет передаь в пременную io

app.use(express.json()) // приложение может принимать json данные, (express.json()) - обрабатывает запрос

const rooms = new Map()

app.get('/rooms', (req, res) => {
  res.json(rooms)
})

app.post('/rooms', (req, res) => {
  const {roomId, userName} = req.body
  if (!rooms.has(roomId)) { // если среди всех комнат нету roomId, то я её создаю, для этого ..
    rooms.set( // с помощью set я перемищаю свою колекцию (данные) в Map, далие ..
       roomId,// указываю roomId, у казываю для roomId значение new Map, и далие объясняю что у Map есть свойство user и messages
       new Map([
         ['user', new Map()],
         ['messages', []]
       ])
    )
  }

  res.send()
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