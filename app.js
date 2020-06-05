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
    console.log(Email)
    console.log(Password)
    db.execute("SELECT * FROM user WHERE Email = '" + Email + "' AND Password = '" + Password + "'  ")
        .then(results => {
            console.log(results);
            if (results[0].length > 0) {
                res.send(results[0])
            }
            else {
                res.send("0");
            }   

            
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
                console.log("HElooo");
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

//trip count
app.use('/usertripscount', (req, res) => {
    var Email = req.query.Email;
   
    db.execute("SELECT COUNT(*) as count FROM savetrips WHERE UserEmail = '" + Email + "' ")
        .then(results => {
            if (results[0].length > 0) {
                //console.log("HElooo123");
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

//place count
app.use('/userplacescount', (req, res) => {
    var Email = req.query.Email;
   
    db.execute("SELECT COUNT(*) as count FROM saveplaces WHERE UserEmail = '" + Email + "' ")
        .then(results => {
            if (results[0].length > 0) {
                console.log("HElooo123");
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

//review count
app.use('/userreviewscount', (req, res) => {
    var Email = req.query.Email;
   
    db.execute("SELECT COUNT(*) as count FROM review WHERE Email = '" + Email + "' ")
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
    db.execute("SELECT * FROM review WHERE PlaceID = '" + PlaceID + "'  ")
        .then(results => {
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
    var StartTime = req.query.StartTime;
    var TripStartDate = req.query.TripStartDate;
    var LunchTime = req.query.LunchTime;
    var DinnerTime = req.query.DinnerTime;
    var DepartureName = req.query.DepartureName;
    var DestinationName = req.query.DestinationName ;

    console.log(TripStartDate)

    db.execute("Insert into savetrips (UserEmail, DepartureID, DestinationID, Waypoints, DepartureName, DestinationName, StartDate, StartTime, LunchTime, DinnerTime) values ('" + Email + "', '" + DepartureID + "', '" + DestinationID + "', '" + Waypoints + "' , '" + DepartureName + "' , '" + DestinationName + "' , '" + TripStartDate + "', '" + StartTime + "', '" + LunchTime + "', '" + DinnerTime + "'  ) ")

        .then(results => {
            console.log("inserted")
            res.send("inserted")
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/saveplace', (req, res) => {

    var Email = req.query.Email;
    var PlaceName = req.query.PlaceName;
    var PlaceID = req.query.PlaceID;
    var PlacePhoto = req.query.PlacePhoto;
    

    db.execute("Insert into saveplaces (UserEmail, SpotID, SpotPhotoReference, SpotName) values ('" + Email + "', '" + PlaceID + "', '" + PlacePhoto + "', '" + PlaceName + "') ")

        .then(results => {
            res.send("inserted")
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/checksaveplace', (req, res) => {

    var Email = req.query.Email;
    var PlaceID = req.query.PlaceID;
    

    db.execute("select * from saveplaces where UserEmail='"+Email+"' && SpotID='"+PlaceID+"' ")

        .then(results => {
            if (results[0].length > 0) {
                res.send('1');
            }
            else
            {
                res.send('0');
            }
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

app.use('/getsavedplaces', (req, res) => {
    var Email = req.query.Email;
    db.execute("SELECT * FROM saveplaces WHERE UserEmail = '" + Email + "' ")
        .then(results => {
            if (results[0].length > 0) {
                res.send(results[0]);
            }
            else {
                res.send("No Places Saved!");
            }
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/getreviews', (req, res) => {
    var Email = req.query.Email;
    db.execute("SELECT * FROM review WHERE Email = '" + Email + "' ")
        .then(results => {
            if (results[0].length > 0) {
                res.send(results[0]);
            }
            else {
                res.send("No Reviews Saved!");
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