var app = require('express'); 
var router = app.Router(); 
var fs = require("fs");

router.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })

 router.delete('/deleteUser/:userId', function (req, res) {
    const userId = req.params.userId
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data['user' + userId];
       fs.writeFile( __dirname + "/" + "users.json",JSON.stringify(data), 'utf8')
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })
 
router.post('/addUser', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        if(err) throw err;
        data = JSON.parse( data );
        data[`user${req.body.id}`] ={id : req.body.id, 
                            name : req.body.name, 
                            password: req.body.password} 
        fs.writeFile( __dirname + "/" + "users.json",JSON.stringify(data), 'utf8')
        console.log( data );
        res.send( JSON.stringify(data));
    });
 })

router.patch('/patchUser/:userId', function(req, res) {
    const userId = req.params.userId
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data[`user${req.body.id}`] ={name : req.body.name, 
                            password: req.body.password} 
        fs.writeFile( __dirname + "/" + "users.json",JSON.stringify(data), 'utf8')
        res.end( JSON.stringify(data));
    });
})
module.exports =router; 