var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
  url = "https://movie.douban.com/subject/1453238/";

  request(url, function(err, response, html){
    if(!err){
      var $ = cheerio.load(html);
      var title, summery, rating;
      var json = {title: "", summery: "", rating: ""};

      $('#content').filter(function(){
        var data = $(this);
        title = data.children().first().children().first().text();
        json.title = title;
      });

      $('#link-report').filter(function(){
        var data = $(this);
        summery = data.children().first().text();
        json.summery = summery;
      });

      $('.rating_self').filter(function(){
        var data = $(this);
        rating = data.children().first().text();
        json.rating = rating;
      })
    }

    console.log(json);

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log("File successfully written!");
    })

    res.send("check your console!");

  });


})

app.listen('8081');
module.exports = app;
