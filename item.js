var app = require('express'); 
var router = app.Router(); 
var fs = require("fs");

router.get('/listItems', function (req, res) {
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })

 router.delete('/deleteItem/:itemId', function (req, res) {
    const itemId = req.params.itemId
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data['item' + itemId];
       fs.writeFile( __dirname + "/" + "items.json",JSON.stringify(data), 'utf8')
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })
 
router.post('/additem', function (req, res) {
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        if(err) throw err;
        data = JSON.parse( data );
        data[`item${req.body.id}`] ={id : req.body.id, 
                            label : req.body.label, 
                            image: req.body.image,
                            description: req.body.description } 
        fs.writeFile( __dirname + "/" + "items.json",JSON.stringify(data), 'utf8')
        console.log( data );
        res.send( JSON.stringify(data));
    });
 })

router.patch('/patchItem/:itemId', function(req, res) {
    const itemId = req.params.itemId
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data[`item${req.body.id}`] ={label : req.body.label, 
            image: req.body.image,
            description: req.body.description} 
        fs.writeFile( __dirname + "/" + "items.json",JSON.stringify(data), 'utf8')
        res.end( JSON.stringify(data));
    });
})
module.exports =router; 