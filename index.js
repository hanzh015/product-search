//const http = require('http');
//const urlparser = require('url')
const findProducts = require('./src/findingAPI');
const findDetails = require('./src/shoppingAPI');
const findSimilar = require('./src/similarAPI');
const express = require('express')
const app = express()

const html = __dirname + '/dist/frontend/';
app.get('/products',(req,res)=>{
    /*
    if(!req.query.name){
        return res.send("<h1>fatal error, specify name please</h1>");
    }
    else if(!req.query.ship){
        return res.send("<h1>fatal error, specify ship options please");
    }
    else{
        return res.send({
            name: req.query.name,
            ship: req.query.ship
        })
    }*/
    if(!req.query.keywords){
        return res.send({"error": "invalidkeywords"});
    }
    else if(!req.query.Category){
        return res.send({"error": "lackingCategory"});
    }
    else if(!req.query.Zipcode){
        return res.send({"error": "invalidZipcode"});
    }
    else if(!req.query.Distance){
        return res.send({"error": "please specify max distance"});
    }
    else{
        findProducts(req.query,(error,body)=>{
            if(error){res.send({error})}
            else{
                res.send(body);
            }
        });
    }

});

app.get('/shopping',(req,res)=>{
    if(!req.query.ItemId){
        return res.send({"error":"please specify item value"});
    }
    else{
        findDetails(req.query,(error,body)=>{
            if(error){res.send({error})}
            else{
                res.send(body);
            }
        })
    }
});

app.get('/similar',(req,res)=>{
    if(!req.query.ItemId){
        return res.send({"error":"please specify item value"});
    }
    else{
        findSimilar(req.query,(error,body)=>{
            if(error){res.send({error})}
            else{
                res.send(body);
            }
        })
    }
});

app.use(express.static(html));
app.use(function(req, res) {
    res.sendFile(html + 'index.html');
  })

const port = process.env.PORT || 1337;
app.listen(port);

console.log("Server running at http://localhost:%d", port);
