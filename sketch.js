var player1Health = 100;
var player2Health = 100;
var score = 0;
var helicopter
var flag = 0
var TentDurability = 100;
var edges

function preload(){
runningMan =loadAnimation(
  "pictures/PC1.png", "pictures/PC2.png", "pictures/PC3.png", "pictures/PC4.png"
)

runningZombie =loadAnimation(
  "pictures/RedStick1.png", "pictures/RedStick2.png", "pictures/RedStick3.png", "pictures/RedStick4.png"
)

backgroundImage = loadAnimation(
  "pictures/backgroundImage.jpeg"
)
helicopterImage = loadAnimation(
  "pictures/Helicopter.png"
)
crateImage = loadAnimation(
  "pictures/Crate.png"
)
GameTent = loadAnimation(
  "pictures/GameTent1.png"
)

}

function setup() {
  createCanvas(1425,800);
  Background = createSprite(750, 400, 20, 20);
  Player1 = createSprite(100, 675, 50, 50);
  Player2 = createSprite(200, 675, 50, 50);
  Tent = createSprite(100, 675)
  edges=createEdgeSprites()
  Tent.addAnimation("GameTent1", GameTent)
  Player1.addAnimation("RunningMan1", runningMan)
  Player2.addAnimation("RunningPlayer2", runningMan)
  Background.addAnimation("backgroundImage0", backgroundImage)
  Player1.scale = 10;
  Player2.scale = 10;
  Background.scale = 2
  zombieGroup = new Group();
}

function draw() {
  background(0, 0, 0);  
  
  drawSprites();

  if(keyDown("D")){
    Player2.velocityX=6;
  }
  else if(keyDown("A")){
    Player2.velocityX=-6;
  }
  else{
    Player2.velocityX=0;
  }
  
  if(keyDown(RIGHT_ARROW)){
    Player1.velocityX=6;
  }
  else if(keyDown(LEFT_ARROW)){
    Player1.velocityX=-6;
  }
  else{
    Player1.velocityX=0;

  }
  for(var i = 0; i<zombieGroup.length; i++){
    if(Player2.isTouching(zombieGroup.get (i))){
      player2Health = player2Health-1;
    }
    if(Player1.isTouching(zombieGroup.get (i))){
      player1Health = player1Health-1;
      if(keyDown("space")){
        zombieGroup.get(i).destroy();
      }

  }

  }
  for(var i = 0; i<zombieGroup.length; i++){
    if(Tent.isTouching(zombieGroup.get(i))){
      TentDurability=TentDurability-1;
  }
}




  if(score===30){
    flag++
    textSize(25)
    text("You Won!", 500, 500)
    zombieGroup.destroyEach();
  }
  if(flag==1){
    helicopter = createSprite(400, 700, 10, 10)
    helicopter.addAnimation("Helicopter", helicopterImage)
    helicopter.scale=0.5
  }
  fill("white")
  text("Player2", Player2.x, Player2.y -30)
  text("Player1", Player1.x, Player1.y -30)

  for(var i = 0; i<zombieGroup.length; i++){
      if(frameCount< 1160 && frameCount> 100){
        if(keyDown("space")|| keyDown("W")){
          zombieGroup.get(i).destroy();
          score++
          frameCount = 10;
        }
        textSize(15)
        text("ready", 1000, 100)
      }
  }
  if(player1Health===0){
    text("Player 1 is Down")
    player1Health=0
  }
  if(player2Health===0){
    text("Player 2 is Down")
    player2Health=0
  }
  if(player2Health<=0 && player1Health<=0||TentDurability<=0){
    Player1.velocityX=0
    Player2.velocityX=0
    textSize(100)
    text("Game Over", 612, 400)
    zombieGroup.destroyEach();
  }
  spawnZombie();
  textSize(15)
  text("Player1 Health:"+player1Health, 50, 100)
  text("Player2 Health:"+player2Health, 300, 100)
  text("Score:"+score, 200, 100)
  text("Tent Durability:"+TentDurability, 450, 100)
  
  
}

function Supplies(){
  crate = createSprite(600, 700)
  crate.addAnimation("Crate1", crateImage)
  crate.scale=0.3
  if(Player1.x>crate.x+5 && Player1.x<crate.x+5){
    Speed();
  }
}

function spawnZombie(){
  if(frameCount%77 === 0){
    zombie=createSprite(1100, 675, 10, 10)
    zombie.addAnimation("runningZombie1", runningZombie);
    zombie.scale=10
    zombie.velocityX=-4
    zombieGroup.add(zombie)
  }
}
function Speed(){
  if(keyDown(RIGHT_ARROW)){
    Player1.velocityX=19;
  }
  else if(keyDown(LEFT_ARROW)){
    Player1.velocityX=-19;
  }
  else{
    Player1.velocityX=0;

  }
  crate.destroy();
}

