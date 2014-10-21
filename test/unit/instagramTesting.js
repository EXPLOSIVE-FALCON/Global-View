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

*/