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

/**
* Scrapes news.google.com and returns an array of results;
* @function queryGoogle
* @param {string} query Search Term on news.google.com
* @param {string} location Search Location (City || State || Zip || Country) on news.google.com
* @param {number} queryAmount Number of results to return - Max 50 
* @param {function} callback callback function to invoke on results
*/
module.exports = function(query, location, queryAmount, callback) {
  var search = query + ' location:' + location;
  queryAmount = queryAmount > 50 ? 50 : queryAmount;
  var site = util.format(URL, querystring.escape(search), queryAmount);

  request(site, function(error, res, body) {
    callback(error, getNews(body));
  });
};

/** 
* Takes an individual news story form google news DOM results and returns object
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

