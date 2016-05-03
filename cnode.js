// scape a specific info page from cnode/good.

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || 3000;
var html = fs.readFileSync('index.html');

var noNewLine = function(char){
  return char != '\n';
}

app.get('/', function(req, res){
  url = "https://cnodejs.org/?tab=good"; // cnode the good parts
  src = "https://cnodejs.org/";

  request(url, function(err, response, html){
    if(!err){
      var $ = cheerio.load(html);
      var title, link, author;
      var cellLst = [];
      var cap = 2;

      $("span.put_good").each(function(i, element){
        var cell = {title: "", link: "", author: ""};
        var data = $(this).next();
        // sometimes we may need integer instead of pure string, use `parseInt()`.
        cell.title = data.text().replace(/\s\s+/g, '');
        // obtain the value of an attribute by use `attr('ATTRNAME')`
        cell.link = src + data.attr('href');
        // or use .eq(i) to select element among children.
        cell.author = $(this).parent().prev().prev().prev().children().first().attr('src');
        console.log(cell);
        cellLst.push(cell);
      })

     console.log(cellLst);

      // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      //   console.log("File successfully written!");
      // })

      var outputString = "";
      for(var i=0; i<cellLst.length; i++){
        outputString += JSON.stringify(cellLst[i]);
      }

      res.send("check your console!\n" + outputString);
      // res.writeHead(200);
      // res.write(html);
      // res.end();
    }
  });


})

app.listen(port);
module.exports = app;
