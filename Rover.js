class Rover {
    constructor(x, y, direction, obstacles = []) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.obstacles = new Set(obstacles.map(coord => coord.join(',')));
        this.directions = ["NORTH", "EAST", "SOUTH", "WEST"];
        this.stopped = false;
    }

    getPosition() {
        return `(${this.x}, ${this.y}) ${this.direction} ${this.stopped ? "STOPPED due to collision" : ""}`.trim();
    }

    rotateLeft() {
        this.direction = this.directions[(this.directions.indexOf(this.direction) + 3) % 4];
    }

    rotateRight() {
        this.direction = this.directions[(this.directions.indexOf(this.direction) + 1) % 4];
    }

    moveForward() {
        if (this.stopped) return;
        let [newX, newY] = this.getNextPosition(1);
        this.checkObstacle(newX, newY);
    }

    moveBackward() {
        if (this.stopped) return;
        let [newX, newY] = this.getNextPosition(-1);
        this.checkObstacle(newX, newY);
    }

    getNextPosition(step) {
        let newX = this.x, newY = this.y;
        switch (this.direction) {
            case "NORTH": newY += step; break;
            case "SOUTH": newY -= step; break;
            case "EAST": newX += step; break;
            case "WEST": newX -= step; break;
        }
        return [newX, newY];
    }

    checkObstacle(newX, newY) {
        if (this.obstacles.has(`${newX},${newY}`)) {
            this.stopped = true;
        } else {
            this.x = newX;
            this.y = newY;
        }
    }

    processCommands(commands) {
        for (let command of commands) {
            if (this.stopped) break;
            switch (command) {
                case "F": this.moveForward(); break;
                case "B": this.moveBackward(); break;
                case "L": this.rotateLeft(); break;
                case "R": this.rotateRight(); break;
            }
        }
    }

    resetStatus() {
        this.stopped = false;
    }

    findSafePath(targetX, targetY) {
        let commands = "";
        while (this.x !== targetX || this.y !== targetY) {
            if (this.stopped) break;
            let moved = false;

            if (this.x < targetX && !this.obstacles.has(`${this.x + 1},${this.y}`)) {
                commands += this.faceDirection("EAST") + "F";
                this.moveForward();
                moved = true;
            } else if (this.x > targetX && !this.obstacles.has(`${this.x - 1},${this.y}`)) {
                commands += this.faceDirection("WEST") + "F";
                this.moveForward();
                moved = true;
            } else if (this.y < targetY && !this.obstacles.has(`${this.x},${this.y + 1}`)) {
                commands += this.faceDirection("NORTH") + "F";
                this.moveForward();
                moved = true;
            } else if (this.y > targetY && !this.obstacles.has(`${this.x},${this.y - 1}`)) {
                commands += this.faceDirection("SOUTH") + "F";
                this.moveForward();
                moved = true;
            }

            if (!moved) {
                commands += this.avoidObstacle();
            }
        }
        return commands;
    }

    faceDirection(targetDirection) {
        let rotationCommands = "";
        while (this.direction !== targetDirection) {
            this.rotateRight();
            rotationCommands += "R";
        }
        return rotationCommands;
    }

    avoidObstacle() {
        let avoidCommands = "";
        if (this.direction === "NORTH" || this.direction === "SOUTH") {
            if (!this.obstacles.has(`${this.x + 1},${this.y}`)) {
                avoidCommands = this.faceDirection("EAST") + "F";
                this.moveForward();
            } else if (!this.obstacles.has(`${this.x - 1},${this.y}`)) {
                avoidCommands = this.faceDirection("WEST") + "F";
                this.moveForward();
            }
        } else {
            if (!this.obstacles.has(`${this.x},${this.y + 1}`)) {
                avoidCommands = this.faceDirection("NORTH") + "F";
                this.moveForward();
            } else if (!this.obstacles.has(`${this.x},${this.y - 1}`)) {
                avoidCommands = this.faceDirection("SOUTH") + "F";
                this.moveForward();
            }
        }
        return avoidCommands;
    }
}

module.exports = Rover;

