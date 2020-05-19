const express = require('express')

const app = express() // создал экспрес приложение
const server = require('http').Server(app); // сщздал сервер благодоря библиотеке http и он будет работать через арр
const io = require('socket.io')(server) //подключил сервер к сокетам, то что вернет сокет передаь в пременную io

app.use(express.json()) // приложение может принимать json данные, (express.json()) - обрабатывает запрос

const rooms = new Map()

app.get('/rooms/:id', (req, res) => {
  const {id: roomId} = req.params;
  const obj = rooms.has(roomId)
     ?
     {
       users: [...rooms.get(roomId).get('users').values()],
       messages: [...rooms.get(roomId).get('messages').values()]
     }
     :
     {users: [], messages: []}
  res.json(obj)
})

app.post('/rooms', (req, res) => {
  const {roomId, userName} = req.body
  if (!rooms.has(roomId)) { // если среди всех комнат нету roomId, то я её создаю, для этого ..
    rooms.set( // с помощью set я перемищаю свою колекцию (данные) в Map, далие ..
       roomId,// указываю roomId, у казываю для roomId значение new Map, и далие объясняю что у Map есть свойство user и messages
       new Map([
         ['users', new Map()],
         ['messages', []]
       ])
    )
  }
  res.send()
})

io.on('connection', (socket) => { // когда пользователь подключился к сокетам то тогда сказать user connecting
  socket.on('ROOM:JOIN', ({roomId, userName}) => { // когда пользыватель мне прийдёт socket запрос с вот таки экшином ROOM:JOIN то я выполняю вот эту функцию, которая имект данные
    socket.join(roomId); // для того чтобы сокет запрос отправлялся только в опредиленную комнату
    rooms.get(roomId).get('users').set(socket.id, userName); // когда подключились к сокетам, то тогда из румса я получаю опредиленную комнату, (из всех комнат найти конкретную комнату),после того как её нашли, нужно найти список всех пользователей, socket.id - у каждого socket будет свой socket.id,далие userName - у конкретного пользователя у которого есть свой id, у его id в еолекции users есть такое имя
    const users = [...rooms.get(roomId).get('users').values()]; // хоу получить всех пользывателей с этой комнаты, values() - вместо ключей я получаю имена пользователей
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users); // в опредиленную комнату всем кроми меня broadcast нужно отправить сокет запрос ROOM:JOINED и этот запос передаю список всех пользователей,
  })

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomId).get('messages').push(obj);
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    })
  })

  console.log('user connecting', socket.id)
})


server.listen(5000, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('Server running...')
})