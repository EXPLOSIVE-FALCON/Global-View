/**
* @module queryGoogle
*/
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
/** 
* @function
* @param {Object} element individual li.g element from DOM
* @param {Object} $ jQuery like object containing entire DOM from results page
*/
var buildNewsStory = function(element, $) {
  var linkElem = $(element).find(linkSel);
  var newsDescription = $(element).find(newsSel);
  var removeElem = $(element).find(removSel);
  var newsSource = $(element).find(sourceSel);

  var href = querystring.parse($(linkElem).attr('href'));
  var sourceTime = newsSource.text().split(' - ');

  var item = {};
  item.title = $(linkElem).first().text() || null,
  item.link = href['/url?q'] || null;
  item.source = sourceTime[0] || null;
  item.description = newsDescription.text() || null;
  item.time = sourceTime[1] || null;

  $(removeElem).find('div').remove();
  return item;
};

/**
* Takes Body of results page and invokes buildNewsStory over every news story in the DOM
* @function
* @param {Object} body blah
*/
var getNews = function(body) {
  var $ = cheerio.load(body);
  var links = [];
  $(stories).each(function(i, elem) {
    links.push(buildNewsStory(elem, $));
  });
  return links;
};

// invokes call to google with and returns "queryAmount" amount of
// results, invokes callback on array of results
module.exports = function(query, queryAmount, callback) {
  queryAmount = queryAmount > 50 ? 50 : queryAmount;
  var site = util.format(URL, querystring.escape(query), queryAmount);

  request(site, function(error, res, body) {
    callback(error, getNews(body));
  });
};
