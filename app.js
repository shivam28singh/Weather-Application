//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.set( "view engine" , "ejs");




app.use(express.static('public'));

app.listen(3000,function(){
  console.log("server is running at port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const  place = req.body.inp;

  const api_key  =process.env.API_KEY;

  const url ="https://api.weatherbit.io/v2.0/current?city=" + place + "&key="+api_key;

  let  today = new Date();
  let  options = {

  day: "numeric",
  weekday: "long",
  month: "long"

};

 let date = today.toLocaleDateString("en-US", options);


request(url,function(error,response,body){

  // if(error)
  //  console.log(error);
  //  else
  //  console.log(response.statusCode);


   const json_obj = JSON.parse(body);

   

   let city = json_obj.data[0].city_name;
   let Temperature = json_obj.data[0].temp;
   let Pressure = json_obj.data[0].pres;
   let WindSpeed = json_obj.data[0].wind_spd;
   let Precipitation = json_obj.data[0].precip;


    res.render("app",{ date:date,place:city,temp:Temperature,pres:Pressure,wind_spd:WindSpeed,precip:Precipitation});

});



});
