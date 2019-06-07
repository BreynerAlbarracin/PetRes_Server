var express = require("express")
var server = express()
//var loginController = require('./controller/loginController');

var MongoClient = require("mongodb").MongoClient

server.use(express.json())



//POST
server.post('/user', (req,res) => {
    var user = req.body.user;
    var pass = req.body.pass;
    var cc = req.body.cc;
    var contacto = req.body.contacto;
    var contacto2 = req.body.contacto2;
    var WhatsApp = req.body.WhatsApp;
    var correo = req.body.correo;

    var user = {
        user : user,
        pass : pass,
        cc : cc,
        contacto : contacto,
        contacto2 : contacto2,
        WhatsApp : WhatsApp,
        correo :correo
    }

    MongoClient.connect('mongodb://localhost:27017', function (error, db) {
        if (error) {
            throw error;
        } else {
            var dbo = db.db("PetRes")
            console.log('Conectado a MongoDB');
            dbo.collection("users").insertOne(user, (err, resDB)=>{
                if(err) res.send("error inserting user")
                db.close()
                res.send("add user")
            })
        }
    });
})

server.post('/pet', (req,res) => {
    var name = req.body.name;
    var duenio = req.body.duenio;
    var MAC = req.body.MAC;
    var details = req.body.details;

    var pet ={
        name : name,
        duenio : duenio,
        MAC : MAC,
        details : details
    };

    MongoClient.connect('mongodb://localhost:27017', function (error, db) {
        if (error) {
            throw error;
        } else {
            var dbo = db.db("PetRes")
            console.log('Conectado a MongoDB');
            dbo.collection("pets").insertOne(pet, (err, resDB)=>{
                if(err) res.send("error inserting pet")
                db.close()
                res.send("add pet")
            })
        }
    });
})

server.post('/LostPet', (req,res) => {
    var MAC = req.body.MAC;
    var estado = req.body.estado;
    var estadoAct = '';
    var fecha = new Date();
    var ubicacion = fecha.toDateString();
    var hora = fecha.toLocaleTimeString();
    
    //Alguien lo tiene o sigue en la calle
    if (estado == 'C'){
        estadoAct = 'Rescatado';
    }else{
        estadoAct = 'Sigue en la calle';
    }

    var lostPet = {
        MAC : MAC,
        estado : estadoAct,
        ubicacion : ubicacion,
        hora : hora
    };

    MongoClient.connect('mongodb://localhost:27017', function (error, db) {
        if (error) {
            throw error;
        } else {
            var dbo = db.db("PetRes")
            console.log('Conectado a MongoDB');
            console.log(MAC)
            console.log(estado)
            console.log(estadoAct)
            console.log(ubicacion)
            console.log(hora)
            dbo.collection("LostPets").insertOne(lostPet, (err, resDB)=>{
                if(err) res.send("error inserting lostPet")
                db.close()
                res.send("add lostPet")
            })
        }
    });
})

//GET USER'S PETS  -- no funciona :c
server.get('/pet/:cc', (req, res)=> {
    var cc = req.param.cc;
    var myQuery = { "cc":param };
    MongoClient.connect('mongodb://localhost:27017', function (error, db, cc) {
        if (error) {
            throw error;
        } else {
            var dbo = db.db("PetRes")
            console.log('Conectado a MongoDB');
            dbo.collection("LostPets").find({ myQuery: { "cc": param }}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close()
                res.send(result)
            })
        }
    });
})


//GET LOST PETS
server.get('/LostPet', (req, res)=> {
    MongoClient.connect('mongodb://localhost:27017', function (error, db) {
        if (error) {
            throw error;
        } else {
            var dbo = db.db("PetRes")
            console.log('Conectado a MongoDB');
            dbo.collection("LostPets").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close()
                res.send(result)
            })
        }
    });
})

server.get('/login', (req, res)=> {
    console.log(req.body)
    MongoClient.connect('mongodb://localhost:27017', function (error, db) {
        if (error) {
            throw error;
        } else {
            var dbo = db.db("PetRes")
            console.log('Conectado a MongoDB');
            dbo.collection("users").findOne({id : req.body.id, password: req.body.password}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close()
                res.send(result)
            })
        }
    });
})

server.listen(8004, () => {
    console.log("servidor levantado")
})
