const app = require('express')()
const user = require('./user');
const item = require('./item');
const list = require('./list');
const fs = require("fs");
const bodyparser = require ('body-parser');

app.use(bodyparser.json())
app.use('/user', user)
app.use('/item', item)
app.use('/list', list)

app.listen(3600, () => {
    console.log('App listening on port 3600')
   })