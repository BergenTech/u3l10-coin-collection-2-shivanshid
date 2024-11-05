// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let Obstaclespeed = 5
coinCollected = false
hits = 0

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = random(20, width-20);
  obstacleY = 0;
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  coinCollected = false
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) && playerX > 0) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) && playerX < width ) {
    playerX += 5;
  }
  if (keyIsDown(UP_ARROW) && playerY > 0) {
    playerY -= 5
  }
  if (keyIsDown(DOWN_ARROW) && playerY < height) {
    playerY += 5
  }
  
  // TODO: Add up/down movement
  // HINT: Use UP_ARROW and DOWN_ARROW keys
  // Movement should be 5 pixels per frame
  
  // TODO: Add boundary checking
  // HINT: Keep player within canvas bounds
  // Check against 0, width, and height
}

function moveObstacle() {
  if(obstacleY < height){
    obstacleY += Obstaclespeed
  }
  else {
    obstacleY = 0
    obstacleX = random(20, width-20)
    Obstaclespeed += 0.5
  }
  // TODO: Move obstacle from left to right
  // HINT: Increase obstacleX by obstacleSpeed
  
  // TODO: Reset obstacle when it goes off screen
  // HINT: Check if obstacleX > width
  // Reset to left side and new random Y position
}

function checkCoinCollection() {
  if(dist(playerX, playerY, coinX, coinY) < 15 && !coinCollected) {
    score++
    Obstaclespeed += 0.5
    coinCollected = true
    newCoin()
  }
  // TODO: Check if player touches coin
  // HINT: Use dist(playerX, playerY, coinX, coinY)
  // If distance < 15:
  //   - Increase score
  //   - Create new coin
  //   - Increase obstacle speed slightly
}

function checkCollisions() {
  if(dist(playerX, playerY, obstacleX, obstacleY) < 20) {
    hits += 1
    Obstaclespeed += 1
    if (hits >= 3) {
      gameOver = true
    }
  }
  // TODO: Check if player hits obstacle
  // HINT: Similar to coin collection
  // If hit (distance < 20):
  //   - Increase hits
  //   - Check for game over (hits >= 3)
  //   - Reset positions
}

function displayStats() {
  fill(0);
  textAlign(CENTER, CENTER)
  textSize(16);
  text("Score: " + score, width/2, 20);
  text("Speed: " + Obstaclespeed, width / 2 - 70, 20)
  text("Hits: " + hits, width/2 + 70, 20)
  // TODO: Add display for hits and speed
}

function displayGameOver() {
  background(220)
  textAlign(CENTER, CENTER)
  textSize(24)
  text("Game Over", width/2, 70)
  text("Final score: " + score, width/2, height/2)
  text("Press R to Restart", width/2, 100)

  // TODO: Show game over screen
  // HINT: Use textAlign(CENTER, CENTER)
  // Show:
  //   - "Game Over" message
  //   - Final score
  //   - "Press R to Restart"
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  // TODO: Reset all game variables
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()
}

function keyPressed() {
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}
