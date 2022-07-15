const connectmongo=require('./Connect')
const express = require('express')
var cors = require('cors')
connectmongo() 
 
//create port for the backend
const app = express()
const port = 5000

app.use(cors())

app.use(express.json())

// app.use('/notes', require('./Routes/notes'))
app.use('/auth', require('./Routes/auth'))
app.use('/notes', require('./Routes/notes'))

 

app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`)
})