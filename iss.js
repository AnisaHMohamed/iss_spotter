/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
// const ip = require('ip')
// console.log(ip.address())
const request = require('request');
const website = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  request(website, (error, response, body) => {
    // use request to fetch IP address from JSON
  //const data =JSON.parse(body);
    if (response.statusCode === 200) {
      // const msg = `Status Code ${response.statusCode} ; when fetching IP. Response: ${body}`;
      const objIp = JSON.parse(body);
      const ip = objIp["ip"];
      // console.log(msg);
      callback(null,ip);
    } else  if (JSON.parse(body)['status'] === 404) {
      callback("Please check the URL and try again  later!",null);
    } else if (!body) {
      callback("no ip found",null);
    }
  });
};
const fetchCoordsByIP = function(ip,callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    //console.log(response.statusCode)
    if (JSON.parse(body)['status'] === 404) {
      callback("It didn't work',null");
    } else if (response.statusCode === 200) {
      const location = JSON.parse(body);
      //console.log(location)
      const latitude = location["data"]["latitude"];
      const longitude = location["data"]["longitude"];
      const locationObj = {};

      locationObj['latitude'] = latitude;

      locationObj['longitude'] = longitude;

      callback(null,locationObj);
    } else {
      callback('IP Page Not Found',null);
    }
  }
  );
};
const fetchISSFlyOverTimes = function(coords, callback) {
  const latitude = coords["latitude"];
  const longitude = coords["longitude"];
  //console.log(latitude,longitude)
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    const bodyParsed = JSON.parse(body);
    // console.log(response.statusCode)
    if (response.statusCode === 200) {
    //console.log(bodyParsed['response']);
      callback(null,bodyParsed['response']);
    } else {
      callback('COORDS Page Not Found',null);
    }

  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (ip) {
      const coords = fetchCoordsByIP(ip, (error, coords) => {
        if (coords) {
          fetchISSFlyOverTimes(coords, (error, passtimes) =>{
            if (passtimes) {
              const finalDATA = passtimes;
              callback(null,finalDATA);
            } else {
              // console.log(error)
              callback("PASS TIMES FAILED",null);
            }
          });
        } else {
          callback("COORDINATES FAILED!!!");
        }
      });
    } else {
      callback("IP FAILED", null);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation
};