require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const ConnectToMongo = require('./db.js')
app.use(cors());
app.use(express.json());

app.use(express.static('uploads'));
ConnectToMongo(); 

app.use('/api/auth' , require('./Routes/auth/Authentication.js')); 
app.use('/api/post' , require('./Routes/Posts/router.js')); 
app.use('/api/UserDetail' , require('./Routes/UserDetail/router.js'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})