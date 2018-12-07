var request = require('request');
var cheerio = require('cheerio');
var Crawler = require('crawler');
var fs = require('fs');
var url = 'https://www.medium.com';


let c = new Crawler({
  maxConnections: 5,
  callback: function(err, res, done){
      var $ = res.$;
      console.log($("title").text());
      done();
    }
})

request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
   
    $(links).each(function(i, elem) {
        
        fs.appendFile('crawl.txt', c.queue($(elem).attr('href')), function (err) {
            if (err) throw err;
          });

        //   c.queue({
        //     uri: $(elem).attr('href'),
        //     preRequest: function(err, res, done){
                
        //         fs.appendFile('append.txt', request.uri, function (err) {
        //             if (err) throw err;
        //           });
        //     } 
           
        //   })
          
     });
})

