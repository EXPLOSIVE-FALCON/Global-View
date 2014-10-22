var assert = require("assert");

// 1. expect inputs to instagram API call to be the right type (and exist)
// 2. expect response from instagram API call to include keys with values of a certain type
// 3. expect response from instagram API call to not include keys removed in trimResponse()
// 4. expect min_timestamp and max_timestamp to be expressed in seconds when building location URL
// 5. expect min_timestamp and max_timestamp to not be greater than 2 days apart (86400000 * 2) and min_timestamp to be less than max_timestamp
// 6. expect value of data[i].distance to calculate properly, sort in ascending order and to be within <distance input> of <lat input> and <lng input>

// need to call instagram API and use results
// ?? use curl http://127.0.0.1:5000/api/instagram?lat=34&lng=-118&min_timestamp=1413747713000&max_timestamp=1413834152000&distance=1000

// 1
describe('Instagram API inputs', function() {
  it('should have 5 inputs - all of which are numbers', function() {
    expect(typeof lat).to.equal('number');
    expect(typeof lng).to.equal('number');
    expect(typeof min_timestamp).to.equal('number');
    expect(typeof max_timestamp).to.equal('number');
    expect(typeof distance).to.equal('number');
  });
});

// 2
describe('Instagram API response', function() {
  it('should have results of specific types', function() {
    expect(typeof results.data[0].link).to.equal('string');
    expect(typeof results.data[0].likes).to.equal('object');
    expect(typeof results.data[0].likes.count).to.equal('number');
    expect(typeof results.data[0].location).to.equal('object');
    expect(typeof results.data[0].location.latitude).to.equal('number');
    expect(typeof results.data[0].location.longitude).to.equal('number');
    expect(typeof results.data[0].created_time).to.equal('string');
    expect(typeof results.data[0].images).to.equal('object');
    expect(typeof results.data[0].images.low_resolution).to.equal('object');
    expect(typeof results.data[0].images.thumbnail).to.equal('object');
    expect(typeof results.data[0].images.standard_resolution).to.equal('object');
    expect(typeof results.data[0].distance).to.equal('number');
  });
});

// 3
describe('trimResponse function', function() {
  it('should remove users_in_photo, comments and attribution', function() {
    expect(typeof results.data[0].users_in_photo).to.equal('undefined');
    expect(typeof results.data[0].comments).to.equal('undefined');
    expect(typeof results.data[0].attribution).to.equal('undefined');
  });
});

// 4
describe('min_timestamp and max_timestamp inputs', function() {
  it('should be expressed in seconds instead of milliseconds', function() {
    expect(min_timestamp < (Date.now()/1000)).to.equal(true);
    expect(max_timestamp < (Date.now()/1000)).to.equal(true);
  });
  it('should be within 2 days', function() {
    expect(min_timestamp + (86400000 * 2) >= max_timestamp).to.equal(true);
  });
});

// 5
describe('min_timestamp', function() {
  it('should be less than max_timestamp', function() {
    expect(min_timestamp <= max_timestamp).to.equal(true);
  });
});

// 6
describe('distance between user lat/lng inputs and lat/lng of instagram photos', function() {
  it('should be less than user distance parameter', function() {
    expect(results.data[0].distance <= distance).to.equal(true);
    expect(results.data[results.data.length-1].distance <= distance).to.equal(true);
  });

  it('should calculate correctly', function() {
    expect(Math.floor(distanceBetween(37.5416,37,-122.2402,-122))).to.equal(39);
  });

  it('should sort correctly', function() {
    expect(results.data[0].distance < results.data[1].distance).to.equal(true);
  });
});


