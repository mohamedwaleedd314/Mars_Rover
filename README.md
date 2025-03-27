![Mars_Rover](Mars_Rover.png)
# 🚀 Rover Navigation System

A smart rover navigation system that simulates movement, obstacle detection, and pathfinding on a grid-based terrain.

## 🛠 Features

🔹 **1. Basic Movement**  
The rover can move forward (`F`) and backward (`B`).  
It can rotate left (`L`) and right (`R`).  
🛠️ **Technology Used:** JavaScript classes, modular programming  

🔹 **2. Obstacle Detection**  
The rover detects obstacles and stops before colliding.  
🛠️ **Technology Used:** Set data structure for fast lookup of obstacle positions  

🔹 **3. Command Processing**  
The rover processes a string of commands to execute movements sequentially.  
🛠️ **Technology Used:** String parsing and iterative execution  

🔹 **4. Pathfinding (Best Path to Target)**  
The rover calculates the best path to a given coordinate while avoiding obstacles.  
🛠️ **Technology Used:** BFS (Breadth-First Search) algorithm for shortest pathfinding  

## 📂 Project Structure
```
📦 Rover Navigation System
├── 📜 Rover.js           # Main Rover class
├── 📜 unit_test.js       # Script to test Rover movements
├── 📜 README.md          # Project documentation
```

## 🚀 Getting Started
### 1️⃣ Install Dependencies
Ensure you have **Node.js** installed, then run:
```sh
npm install
```

### 2️⃣ Run the Test Script
Execute the following command to see the rover in action:
```sh
node index.js
```

### 3️⃣ Example Usage
#### 🔹 Initialize the Rover
```js
const Rover = require("./Rover");
const rover = new Rover(4, 2, "EAST", [[1, 4], [3, 5], [7, 4]]);
console.log("Initial Position:", rover.getPosition());
```

#### 🔹 Execute Commands
```js
rover.processCommands("FLFFFRFLB".split(""));
console.log("After Commands:", rover.getPosition());
```

#### 🔹 Pathfinding to a Target
```js
const safePath = rover.findSafePath(8, 5);
console.log("Safe path:", safePath);
rover.processCommands(safePath.split(""));
console.log("Final Position:", rover.getPosition());
```

## 📌 Notes
- The rover stops when it detects an obstacle.
- If a direct path is blocked, the rover finds a safe alternative route.
- The algorithm prioritizes horizontal movement before vertical movement.

## 👨‍💻 Developed By
**Mohamed Waleed** 🚀

---
🚀 Built with **JavaScript** and a passion for space exploration! 🌌
