var assert = require("assert");

// expect(4+5).to.equal(9);

// write tests, then build structure around them

/*
1. expect each of the elements in data to have a location key with an object containing at least latitude and longitude
2. expect each of the elements in data to have a distance key
3. expect value of data[i].distance to calculate properly
4. expect results to be sorted in ascending order
5. expect deleted fields to be removed
6. expect certain fields to exist for each element
7. expect minDate and maxDate to be numbers
8. expect minDate and maxDate to be expressed in seconds when building location URL
9. expect dayInMilliSeconds() to equal 86,400,000
10. expect minDate and maxDate to not be greater than 2 days apart (86400000 * 2)

*/

// 1
expect(typeof results.data[0].location).to.equal('object');
expect(typeof results.data[0].location.latitude).to.equal('number');
expect(typeof results.data[0].location.longitude).to.equal('number');

// 2
expect(typeof results.data[0].distance).to.not.equal('undefined');
expect(typeof results.data[0].distance).to.equal('number');

//3
expect(Math.floor(distanceBetween(37.5416,37,-122.2402,-122))).to.equal(39);

// 4
expect(results.data[0].distance < results.data[1].distance).to.equal(true);

// 5
expect(typeof results.data[0].users_in_photo).to.equal('undefined');
expect(typeof results.data[0].comments).to.equal('undefined');
expect(typeof results.data[0].attribution).to.equal('undefined');

// 8
expect(minDate < (Date.now()/1000)).to.equal(true);
expect(maxDate < (Date.now()/1000)).to.equal(true);


// 9
expect(dayInMilliSeconds()).to.equal.(86400000);

// 10
expect(maxDate - minDate < (dayInMilliSeconds() * 2)/1000).to.equal(true);




