var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,invisible;
var banana ,bananaImage, obstacle, obstacleImage, ground ,groundImage;
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 groundImage = loadImage("Game_Background.png");
}



function setup() {
  createCanvas(500,330);
 monkey=createSprite(80,210,20,20);
  monkey. addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  score = 0; 
 ground = createSprite(355,70,20,50);
 ground.addImage(groundImage);
 ground.scale =1
    if (ground.x < 0){   
      ground.x = ground.width/2;
    }
  ground.velocityX=-6  
    
  ground.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
  invisible = createSprite(400,270,800,10);
     invisible.visible = false;

 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
obstacleGroup = createGroup();
bananaGroup = createGroup();
}


function draw() {
background("black");
   
  if(gameState === PLAY){
    if(keyDown("space")) {
   monkey.velocityY=-5
   } 
    monkey.velocityY = monkey.velocityY + 0.2  
              monkey.collide(invisible);
  obstacleGroup.collide(invisible);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  spawnbanana();
  spawnobstacle();
   if(obstacleGroup.isTouching(monkey)){
       gameState = END;
      //obstacleGroup.velocityX = 0;
    }
  
  }
    else if (gameState === END) {
      ground.x = ground.width/2;
      monkey.velocityY = monkey.velocityY + 0.2  
              monkey.collide(invisible);
       obstacleGroup.setVelocityXEach(0)

       bananaGroup.setVelocityXEach(0)
  
      spawnbanana();
  spawnobstacle();
       obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    }
  
  

  
         
  
  
  

  

 //       ground.velocityX = -(4 + 3* score/100)
  obstacleGroup.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/10);
  
  drawSprites()
  text("Sirvival time: "+ score, 400,50); 
}


function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800,250,0,10);
   
   obstacle.addImage( obstaceImage);
    obstacle.scale = 0.2;
   obstacle.velocityX = -6;
    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
    
    
   
     obstacleGroup.add(obstacle);
  }
    
}
    
    
    
 function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    var banana = createSprite(800,50,0,10);
    //banana.y = Math.round(random(120,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
     bananaGroup.add(banana);
  }
    
}   
    
    
    
    
    
    
    
    
    
    
    
    
    
    


