'use strict';



function Robot() {
  // implement your solution here!
  this.bearing = null;
}

Robot.prototype.orient = function (direction) {
  if (direction === "east" || direction === "west" || direction === "north" || direction === "south"){
    this.bearing = direction;
  } else {
    throw new Error('Invalid Robot Bearing');
  };
};

Robot.prototype.turnRight = function (){
  var directions = ['north', 'east', 'south', 'west'];
  var currentDirIndex = directions.indexOf(this.bearing);
  var newDirIndex = currentDirIndex + 1;
  if (newDirIndex === 4) {
    newDirIndex = 0;
  }
  this.bearing = directions[newDirIndex];
  //this.bearing = directions[(directions.indexOf(this.bearing) + 1) % 4];
}

Robot.prototype.turnLeft = function (){
  var directions = ['north', 'east', 'south', 'west'];
  var currentDirIndex = directions.indexOf(this.bearing);
  var newDirIndex = currentDirIndex - 1;
  if (newDirIndex === -1 ) {
    newDirIndex = 3;
  }
  this.bearing = directions[newDirIndex];
  //this.bearing = directions[(directions.indexOf(this.bearing) + 3) % 4];
}

Robot.prototype.at = function (x, y) {
  this.coordinates = [x, y];
}

Robot.prototype.advance = function() {
  this.orient;
  if (this.bearing === "north"){
    this.at(this.coordinates[0], this.coordinates[1] + 1);
  } else if (this.bearing === "east") {
    this.at(this.coordinates[0] + 1, this.coordinates[1]);
  } else if (this.bearing === "south") {
    this.at(this.coordinates[0], this.coordinates[1] - 1);
  } else if (this.bearing === "west") {
    this.at(this.coordinates[0] - 1, this.coordinates[1]);
  }
}

Robot.prototype.instructions = function(str) {
  var letters_array = str.split("");
  var arr = [];
  for (var i = 0; i < letters_array.length; i++){
    if (letters_array[i] === "L"){
      arr.push("turnLeft");
    } else if (letters_array[i] === "A"){
      arr.push("advance");
    } else if (letters_array[i] === "R"){
      arr.push("turnRight");
    }
  }
  return arr;
}

Robot.prototype.place = function(robotProps){
  this.orient(robotProps["direction"]);
  this.at(robotProps["x"], robotProps["y"]);
}

Robot.prototype.evaluate = function(str){
  var arr = this.instructions(str);
  arr.forEach(function(instruction){
    if (instruction === "turnLeft"){
      this.turnLeft();
    } else if (instruction === "turnRight"){
      this.turnRight();
    } else if (instruction === "advance"){
      this.advance();
    }
  }.bind(this));
}
