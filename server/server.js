const express = require('express')
const path = require('path')

const app = express()
const port = 5500
app.use(express.json())

console.log(path.join(__dirname,'../build'))

app.use(express.static(path.join(__dirname,'../build/')))
app.use('/api',require('./routes'))
app.get(/(.*)/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'))
})


app.listen(port,()=>console.log(`http://localhost:${port}`))
