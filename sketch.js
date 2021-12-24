var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleClimbersGroup, invisibleClimbers;
var gameState = "play"
var gameOverImg, gameOver;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("cartoon.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 3;

  ghost = createSprite(200, 200, 50, 50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.07

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleClimbersGroup = new Group()
}

function draw() {
  background(200);

  if (gameState == "play") {

    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("left")) {
      ghost.x = ghost.x - 5
    }

    if (keyDown("right")) {
      ghost.x = ghost.x + 5
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }

    if (invisibleClimbersGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }

    spawndoors();
    drawSprites();
  }
  else if (gameState == "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 260);
  }
}

function spawndoors() {
  if (frameCount % 240 === 0) {
    doors = createSprite(200, -50)
    doors.addImage(doorImg)
    doors.velocityY = 1
    var rand = Math.round(random(120, 400))
    doors.x = rand;
    doors.lifetime = 500
    doors.scale = 0.2

    climbers = createSprite(200, 10)
    climbers.addImage(climberImg)
    climbers.velocityY = 1
    climbers.x = doors.x;
    climbers.lifetime = 400

    invisibleClimbers = createSprite(200, 15, climbers.width, 2)
    invisibleClimbers.velocityY = 1
    invisibleClimbers.x = doors.x;
    climbers.lifetime = 800

    //console.log(doors.depth)
    //console.log(ghost.depth)
    doors.depth = ghost.depth
    ghost.depth = ghost.depth + 1

    doorsGroup.add(doors)
    climbersGroup.add(climbers)
    invisibleClimbersGroup.add(invisibleClimbers)

  }

}
