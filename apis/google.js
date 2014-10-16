var request = require('request'); 
var cheerio = require('cheerio');
var querystring = require('querystring');
var util = require('util');

var stories = 'li.g';
var sourceSel = '.slp';
var newsSel = 'div.st';
var linkSel = 'h3.r a';
var removSel = 'div.s';

var URL = 'http://www.google.com/search?hl=en&q=%s&start=0&sa=N&num=%s&ie=UTF-8&oe=UTF-8&tbm=nws';

// selects correct news elements from dom and returns an object
// with a title, link, source, description, and time
var buildNews = function(i, elem, $) {
  var linkElem = $(elem).find(linkSel);
  var newsDescription = $(elem).find(newsSel);
  var removeElem = $(elem).find(removSel);
  var newsSource = $(elem).find(sourceSel);

  var href = querystring.parse($(linkElem).attr('href'));
  var sourceTime = newsSource.text().split(' - ');

  var item = {};
  item.title = $(linkElem).first().text() || null, 
  item.link = href['/url?q'] || null;
  item.source = sourceTime[0] source || null;
  item.description = newsDescription.text() || null;
  item.time = sourceTime[1] || null;

  $(removElem).find('div').remove();
  return item;
};

// invokes call to google with and returns "queryAmount" amount of
// results, invokes callback on array of results 
module.exports = function(query, queryAmount, callback) {
  queryAmount = queryAmount > 100 ? 100 : queryAmount;

  var site = util.format(URL, querystring.escape(query), pageResults);

  request(site, function(err, res, body) {
    if (err) {
      callback(err, null); 
    } else {
      var $ = cheerio.load(body);
      var links = [];
      $(stories).each(function(i, elem) {
        var newsStory = buildNews(i, elem, $)
        links.push(newsStory);
      });

      callback(null, links);
    }
  });
};



