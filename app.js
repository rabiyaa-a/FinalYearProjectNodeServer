//adding 3rd packages
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mysql = require('mysql');


//Connecting to database
const db = require('./util/database');

//initializing express
const app = express();
let server = app.listen(3006);

// console.log(io);
//adding routes

module.exports.getIO = function () {
    return io;
}


//iniliazing body-parser
app.use(bodyparser.urlencoded());

//using express static to add css via public folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes to pages
app.use('/useradd', (req, res) => {
    var Email = req.query.Email;
    var Password = req.query.Password;
    var Name = req.query.Name;
    var Phone = req.query.phone;
    db.execute("INSERT INTO USER (ID, Email, Password, Name, Phone) VALUES ('','" + Email + "','" + Password + "','" + Name + "','" + Phone + "') ")
        .then(results => {
            res.send("inserted")
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/userlogin', (req, res) => {
    var Email = req.query.Email;
    var Password = req.query.Password;
    db.execute("SELECT * FROM USER WHERE Email = '" + Email + "' AND Password = '" + Password + "'  ")
        .then(results => {
            if (results[0].length > 0) {
                res.send("1");
            }
            else {
                res.send("0");
            }

            res.send(results[0])
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/userprofile', (req, res) => {
    var Email = req.query.Email;
    db.execute("SELECT * FROM USER WHERE Email = '" + Email + "' ")
        .then(results => {
            if (results[0].length > 0) {
                res.send(results[0]);
            }
            else {
                res.send("0");
            }
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/addreview', (req, res) => {
    var Email = req.query.Email;
    var PlaceID = req.query.PlaceID;
    var Review = req.query.Review;
    var Rating = req.query.Rating;


    //console.log(Email + PlaceID + Review)

    db.execute("Insert into review (PlaceID, Email, Review, Rating) values ('" + PlaceID + "', '" + Email + "', '" + Review + "', '" + Rating + "') ")

        .then(results => {
            res.send("inserted")
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/getreview', (req, res) => {
    var Email = req.query.Email;
    var PlaceID = req.query.PlaceID;
    db.execute("SELECT * FROM review WHERE Email = '" + Email + "' && PlaceID = '" + PlaceID + "' order by id desc limit 1 ")
        .then(results => {
            console.log("results[0]")
            // console.log(results[0])
            res.send(results[0]);

        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/savetrip', (req, res) => {

    var Email = req.query.Email;
    var DepartureID = req.query.DepartureID;
    var DestinationID = req.query.DestinationID;
    var Waypoints = req.query.Waypoints;


    //console.log(Email + PlaceID + Review)

    db.execute("Insert into savetrips (UserEmail, DepartureID, DestinationID, Waypoints) values ('" + Email + "', '" + DepartureID + "', '" + DestinationID + "', '" + Waypoints + "') ")

        .then(results => {
            res.send("inserted")
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/getsavedtrips', (req, res) => {
    var Email = req.query.Email;
    db.execute("SELECT * FROM savetrips WHERE UserEmail = '" + Email + "' ")
        .then(results => {
            if (results[0].length > 0) {
                res.send(results[0]);
            }
            else {
                res.send("No Trips Saved!");
            }
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/getsavedtripsbyid', (req, res) => {
    var id = req.query.id;
    db.execute("SELECT * FROM savetrips WHERE id = '" + id + "' ")
        .then(results => {
            if (results[0].length > 0) {
                res.send(results[0]);
            }
            else {
                res.send("No Trips Saved!");
            }
        })
        .catch(err => {
            console.log(err)
        });
});



