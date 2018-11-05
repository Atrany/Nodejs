var app = require('express'); 
var router = app.Router(); 
var fs = require("fs");

router.get('/listList', function (req, res) {
    fs.readFile( __dirname + "/" + "list.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })

 router.delete('/deleteList/:listId', function (req, res) {
    const listId = req.params.listId
    fs.readFile( __dirname + "/" + "list.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data['list' + listId];
       fs.writeFile( __dirname + "/" + "list.json",JSON.stringify(data), 'utf8')
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })
 
router.post('/addList', function (req, res) {
    fs.readFile( __dirname + "/" + "list.json", 'utf8', function (err, data) {
        if(err) throw err;
        data = JSON.parse( data );
        data[`list${req.body.id}`] ={id : req.body.id, 
                            name : req.body.name, 
                            user : req.body.user,
                            item : req.body.item} 
        fs.writeFile( __dirname + "/" + "list.json",JSON.stringify(data), 'utf8')
        console.log( data );
        res.send( JSON.stringify(data));
    });
 })

router.patch('/patchList/:listId', function(req, res) {
    const listId = req.params.listId
    fs.readFile( __dirname + "/" + "list.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data[`list${req.body.id}`] ={name : req.body.name, 
            user: req.body.user,
            item : req.body.item} 
        fs.writeFile( __dirname + "/" + "list.json",JSON.stringify(data), 'utf8')
        res.end( JSON.stringify(data));
    });
})
module.exports =router; 