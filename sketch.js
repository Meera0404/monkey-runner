var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivaltime;
var background;
var gameState;

function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage   = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(600,600);
  
//to create monkey
monkey = createSprite(100,595,20,20); monkey.addAnimation("running",monkey_running);
monkey.scale = 0.2;
  
//to create group
bananaGroup   = new Group();
obstacleGroup = new Group();
  
console.log(food())
  
}

function draw() {
background("white");
  
food();
obstacle();

//to create ground
ground = createSprite(400,595,900,10);
ground.velocityX = -2;
ground.x = ground.width/2;
  
//to jump when space pressed
if(keyDown("space")){
monkey.velocityY =-5;
}
//to give monkey velocity
monkey.velocityY = monkey.velocityY+0.8;
//to make monkey collide with ground
monkey.collide(ground);
  
if(obstacleGroup.isTouching(monkey)){
bananaGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
ground.velocityX = 0;
bananaGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);

}
  
stroke("white");
textSize(20);
fill("white");
text("Score:"+score,500,50);
stroke("black");
textSize(20);
fill("black");
survivaltime = Math.ceil(frameCount/frameRate());
text("survival:"+survivaltime,250,50);

banana.depth = monkey.depth;
monkey.depth = monkey.depth +1;
  
drawSprites();
}

//to create function for food 
function food(){
//to display after every 80 frame
if(frameCount%80 === 0){
 banana = createSprite(700,700,10,10);
 banana.addImage("banana",bananaImage);
 banana.scale = 0.2;
//to give score
 banana.velocityX = -4;
 banana.y = Math.round(random(100,400));
//to add banana to group
 bananaGroup.add(banana);
// to destroy 
 bananaGroup.lifetime = 100;
}
}

//to create function for obstacle
function obstacle(){
//to display after every 80 frame
if(frameCount%200===0){
 var stone = createSprite(700,570,10,10);
 stone.addImage("stone",obstacleImage);
 stone.scale = 0.4;
 stone.velocityX = -5;
// to destroy to prevent memory leakage
 obstacleGroup.lifetime = 100;
//to add stone to group
 obstacleGroup.add(stone);
}
}






