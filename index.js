//Configurção inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()



//Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }), 
)
app.use(express.json())

//rotas da api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)
//Rota inicial / endepoint

app.get('/',(req, res) => {
    //Mostrar req
    res.json({ message: 'oioi express!' })
})

//Entregar porta

mongoose.connect(`mongodb+srv://user:WwWord@apicluster.ptdhj4m.mongodb.net/bancodaapi?retryWrites=true&w=majority`)

.then(() => {
    console.log('conectamos ao mongoDB')
    app.listen(3000)
})
.catch((err) => console.log(err))

