const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url : "https://us3.api.mailchimp.com/3.0/lists/d01857901b", // api key 8da5aec7adda30aee261f64c13ac407e-us3
        method: "POST",
        headers: {
            "Authorization": "Wajahat1 8da5aec7adda30aee261f64c13ac407e-us3"
        },
        body: jsonData

    }

    request(options, function (error, response, body) {
        if (error) {
            res.send("Error");
        }
        else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");;
            }
        }
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

//vendor security assurance

//large company has alot of different clients 
//google can't do it all in house. 
//reviewing security reviews, looking at scope and webkitConvertPointFromPageToNode, metric tracking 

//internal leviathan pm 
//    - working with lots of security engineers and consultants to perform pentests 
//    - scoping threat modeling 
//    - technical writing and stuff

// Soft skills
// OWASP top 10 
// project management 

//