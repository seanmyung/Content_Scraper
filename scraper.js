/*
  use cheerio, request and fast-csv packages for web scraping
  because of the requirements
   1.At least 1,000 downloads
   2.Has been updated in the last six months
 */
const fs = require('fs');
const cheerio = require('cheerio');
const csv = require('fast-csv');
var request = require("request");

var now = new Date();
var homeUrl = "http://shirts4mike.com";
var productUrl = "http://shirts4mike.com/shirt.php";
var csvStream = csv.format({headers: true});
const myDir = './data';

//printError function to disaply error message
function printError(error) {
  var errorCode = error.code;
  var message = `There's been a ${errorCode} error. `;
  message += `Cannot connect to the to ${homeUrl}`;
  fs.appendFile('scraper-error.log', `[${now}] ${message}`, (err) => {
    if (err) throw err;
    console.log(message);
  });
}

//isDirSync function to check whether the 'data' directory exist
function isDirSync(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    } else {
      throw error;
    }
  }
}
//If there's no data folder, make it.
if (!isDirSync(myDir)) {
  fs.mkdirSync(myDir);
}

//Vist the home page and shirts page thorugh each loop
request(productUrl, function(error, response, html) {
  if(!error && response.statusCode === 200) {
      var $ = cheerio.load(html);

      var shirtHref = $('a[href*="shirt.php?id="]');
      shirtHref.each(function () {
        var shirtPath = $(this).attr('href');
        var fullHref  = homeUrl + '/' + shirtPath;
        scrapeInfo(fullHref);
      }); //End each loop
        convertCsv(csvStream);
  } else {
    printError(error);
  }
}); // End main request

// Go to scrapeInfo function to scape shirts information
function scrapeInfo(detailURL) {
  request(detailURL, function(error, response, html) {
    if(!error && response.statusCode === 200) {
      var $ = cheerio.load(html);
      var title, price, imageUrl, url, time;

      title = $('img').attr('alt');
      price = $('.price').text();
      var imageHref = $('img').attr('src');
      imageUrl = homeUrl + '/' + imageHref;
      url = detailURL;
      var shirtData = {
        Title: title,
        Price: price,
        ImageURL: imageUrl,
        URL: url,
        Time: now.toISOString().slice(11,19)
      };
        csvStream.write(shirtData);
    } else {
      printError(error);
    }
  }); // End second request
} // end scrapeInfo function

//Save the data as csv
function convertCsv(shirtData) {
  var fileStream = fs.createWriteStream(csvPath());
  shirtData.pipe(fileStream);
  console.log('New file saved');
}

//csvPath to make csv file named the current date
function csvPath() {
  var currentDate = now.toISOString().slice(0,10);
  return "data/" + currentDate + ".csv";
}
