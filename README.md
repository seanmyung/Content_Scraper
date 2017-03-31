# Build a Content Scraper
Treehouse Techdegree Project #6

#Project Requirements
====================

- [x] Create a scraper.js file that will contain your command line application. Your project should also include a package.json file that includes your project’s dependencies. The npm install command should install your dependencies.
- [x] Program your scraper to check for a folder called ‘data’. If the folder doesn’t exist, the scraper should create one. If the folder does exist, the scraper should do nothing.
- [x] Choose and use two third-party npm packages. One package should be used to scrape content from the site. The other package should create the CSV file. Be sure to research the best package to use (see the project resources for a link to the video about how to choose a good npm package) Both packages should meet the following requirements: At least 1,000 downloads, Has been updated in the last six months
- [x] Program your scraper so that it visits the website http://shirts4mike.com and uses http://shirts4mike.com/shirts.php as single entry point to scrape information for 8 tee-shirts from the site, without using any hard-coded urls like http://www.shirts4mike.com/shirt.php?id=101.
- [x] The scraper should get the price, title, url and image url from the product page and save this information into a CSV file.
- [x] The information should be stored in an CSV file that is named for the date it was created, e.g. 2016-11-21.csv.
- [x] Assume that the the column headers in the CSV need to be in a certain order to be correctly entered into a database. They should be in this order: Title, Price, ImageURL, URL, and Time
- [x] The CSV file should be saved inside the ‘data’ folder.
- [x] If your program is run twice, it should overwrite the data in the CSV file with the updated information.
- [x] The error should be human-friendly, such as “There’s been a 404 error. Cannot connect to the to http://shirts4mike.com.”
- [x] To test and make sure the error message displays as expected, you can disable the wifi on your computer or device.

# Extra Credit
- [x] Edit your package.json file so that your program runs when the npm start command is run.
- [x] When an error occurs, log it to a file named scraper-error.log . It should append to the bottom of the file with a time stamp and error e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>
