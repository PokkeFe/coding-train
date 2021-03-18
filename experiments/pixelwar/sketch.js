let cityList = [];
let index = 0;

function setup() {
  createCanvas(400,400);
  let testCity = new City(width/2,height/2,1,index);
  index++;
  cityList.push(testCity);
  background(51);
  drawOnce();
}

function draw() {
}

function drawOnce() {
  background(51);
  for(let city of cityList){
    city.draw();
    city.drawConnections();
    city.drawName();
  }
}

function mousePressed() {
  let newCity = new City(mouseX,mouseY,1,index);
  index++;
  cityList.push(newCity);
  updateCityNeighbors();
  drawOnce();
}

function keyPressed() {
  if(keyCode === UP_ARROW){
    console.log("-------------------------------------------");
    for(let city of cityList){
      console.log(city.name);
      console.log(city);
    }
    console.log("-------------------------------------------");
  }
}

function updateCityNeighbors() {
  let maxRange = 100;

  for(let city of cityList) {

    city.neighbors = [];

    // collect all distances
    let distances = [];
    for(let neighbor of cityList) {
      let distance = dist(city.pos.x, city.pos.y, neighbor.pos.x, neighbor.pos.y);
      if(neighbor != city && distance != 0 && distance < 200) {
        distances.push({dist: distance, city: neighbor});
      }
    }

    if(city.name == "3"){
     console.log("DISTANCES");
     console.log(distances);
    }

    // sort by distance 
    let sorted = [];
    
    for(let obj of distances) {
      // console.log(sorted);
      if(sorted.length == 0){
        sorted.push(obj);
      } else {
        for(let check = 0; check <= sorted.length; check++){
          if(check == sorted.length){
            sorted.push(obj);
            break;
          } else if(obj.dist < sorted[check].dist) {
            sorted.splice(check, 0, obj);
            break;
          }
        }
      }
    }

    if(city.name == "3"){
     console.log("SORTED");
     console.log(sorted);
    }

    // Add as neighbors
    let validCities = [];
    for(let obj of sorted){
      if(obj.dist > 0 && obj.dist < maxRange){
        validCities.push(obj.city);
      }
    }

    
    if(city.name == "3"){
     console.log("VALID CITIES");
     console.log(validCities);
    }

    if(validCities < 3){
      city.neighbors = validCities;
    } else {
      city.neighbors = validCities.slice(0,3);
    }

    // console.log("CITY");
    // console.log(city.neighbors);
  }
  // console.log("Neighbors Updated");
}