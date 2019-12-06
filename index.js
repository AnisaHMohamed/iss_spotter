// // index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP} = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// fetchCoordsByIP("66.207.199.230",(error,data)=>{
//   if (error) console.log(error);
//   else {
//     console.log(data);
//   }
// });


// fetchISSFlyOverTimes({ latitude: '37.38600', longitude: '-122.08380' },(err,data)=> {
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   } else {

//     console.log('It worked!', data);
//   }
// });
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});