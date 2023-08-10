
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
    const query = req.body.place;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.APIKEY+"&units="+unit;
    https.get(url,function(response)
    {

            response.on("data",function(data)
        {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>Currently the weather is "+des+".</p>");
            res.write("<h1> The temperature in "+query+" is "+temp+" degrees celcius.</h1>");
            res.write("<img src="+iconUrl+">");
            res.send();
        })
    })

});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});