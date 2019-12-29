
const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files
const printPassTimes =(passTimes) => {
for (items of passTimes) {
 // console.log(Object.keys(items));
  let spotted = Object.keys(items)
for (times of spotted){

  console.log(times , "-->",items[times])
}
  //console.log(Object.values(items));

}
}
// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });