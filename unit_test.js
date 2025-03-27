const Rover = require("./Rover");
const rover = new Rover(4, 2, 'EAST', [[1, 4], [3, 5], [7, 4]]);
console.log("Initial position:", rover.getPosition());

// Part I: Execute commands
rover.processCommands('FLFFFRFLB'.split(''));
console.log("After commands:", rover.getPosition());

// Part II: Obstacle detection (will stop before obstacle)
rover.resetStatus();
rover.processCommands('FFFFF'.split(''));
console.log("After hitting obstacle:", rover.getPosition());

// Part III: Pathfinding
rover.resetStatus();
const safePath = rover.findSafePath(8, 5);
console.log(`Safe path to (8, 5): ${safePath}`);

if (safePath) {
    rover.processCommands(safePath.split(''));  
    console.log("After following safe path:", rover.getPosition());
}