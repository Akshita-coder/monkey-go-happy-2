var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacleGroup,foodGroup,bananaGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var banana,bananaImg;
var obstacle,obstacleImg;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

 // banana.addImage(bananaImg);
 // obstacle.addImage(obstacleImg);
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  bananaGroup = createGroup();


  if(keyDown("space") && player.y > 300){
    player.velocityYn= -12;
  }
  
  if(bananaGroup.isTouching(player)){
    bananaGroup.destroyEach();
    score=score+1;
  }
  
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  
  drawSprites();
  
  fill("black")
  textSize(25);
  text("score"+score,250,50);  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }




  drawSprites();
  spwanObstacles();
  spwanBanana();
}


function spwanObstacles(){
  if(frameCount % 150 === 0){
    var obstacle = createSprite(600,380,20,20);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -6;
    
    var rand = Math.round(random(1));
    switch(rand){
        case 1: obstacle.addImage(obstacleImg);
                break;
       default:break;        
    }
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);
  }
}

function spwanBanana(){
  
  if(frameCount % 160 === 0){
    var banana = createSprite(400, 300,10,10);
    banana.y = Math.round(random(150,310));
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    bananaGroup.add(banana);
  }
}