
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var obstacleGroup
var bananasGroup
var survivaltime
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (600,600)
  ground = createSprite(300,595,600,10)
  monkey = createSprite(50,510,20,20)
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale=0.2
  bananasGroup = new Group()
  obstacleGroup = new Group()
  
  
}


function draw() {
background("Black")
  
  ground.velocityX=-5
  if (ground.x > 200){
    ground.x = ground.width/2
  }
  
  monkey.collide(ground)
  monkey.velocityY=10
  
  if(bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach()
  }
  
  if(obstacleGroup.collide(monkey)){
    obstacleGroup.destroyEach()
    bananasGroup.destroyEach()
    obstacleGroup.lifetime=0
    bananasGroup.lifetime=0
    obstacleGroup.velocityX=0
    bananasGroup.velocityX=0
    ground.velocityX=0
  }
  
  if(keyDown("space") && monkey.y > 100){
    monkey.velocityY=-5
  }
  
  survivaltime = Math.round(frameCount/frameRate())
  text("Survival time:" + survivaltime,200,50)
  spawnobstacles();
  spawnbananas();
  drawSprites();
}



function spawnobstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(600,550,20,20)
    obstacle.addAnimation("Obstacle",obstacleImage)
    obstacle.velocityX=-5
    obstacle.scale=0.25
    obstacle.lifetime=600
    obstacleGroup.add(obstacle)
  }
}

function spawnbananas(){
  if (frameCount % 100===0){
    bananas = createSprite(600,450,20,20)
    bananas.addAnimation("bananas",bananaImage)
    bananas.velocityX=-5
    bananas.scale=0.25
    bananas.lifetime=600;
    bananas.y=Math.round(random(120,400))
    bananasGroup.add(bananas)
  }
}