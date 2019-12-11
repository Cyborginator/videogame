'use strict';


let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let coins = [];
let playerImg;
let coinImg;
let firstTime = true;
let secondTime = true;
let thirdTime = true;
let fourthTime = true;
let fifthTime = true;
let sixthTime = true;

function preload() {
  playerImg = loadImage('assets/player/mariolevel1.png');
  coinImg = loadImage('assets/coin/coinlevel1.png')
}

function setup() {
  cnv = createCanvas(w, h);

  textFont('Georgia');

  player = new Player();

  //coins[0] = new Coin();
  coins.push(new Coin());
}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
    break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    default:
      break;
  }
  /*
  if (state == 'title') {
    title();
    cnv.mouseClicked(titleMouseClicked);
  }
  else if (state == 'level 1' && points > 50) {
    level1();
    cnv.mouseClicked(level1MouseClicked);
  }
  else {

  }
  */
}

function keyPressed() {
  if(keyCode == LEFT_ARROW) {
    player.direction = 'left';
  }
  else if(keyCode == RIGHT_ARROW) {
    player.direction = 'right';
  }
  else if(keyCode == UP_ARROW) {
    player.direction = 'up';
  }
  else if(keyCode == DOWN_ARROW) {
    player.direction = 'down';
  }
  else if(key = ' ') {
    player.direction = 'still';
  }
}

function title() {
  background(0, 200, 50);
  textSize(80);
  fill(255);
  textAlign(CENTER);
  text('Coin Collector', w/2, h/5);

  textSize(30);
  text('Click Anywhere To Start', w/2, h/2);
}

function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level 1';
}

function level1() {
  background(50, 150, 200);
  // text('click for points', w/2, h - 30);

  if(random(1) <= 0.01) {
    coins.push(new Coin());
  }

  player.display();
  player.move();

/*
  // iterating through coins array to display and move them

  for(let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }
*/

/*
  // using forEach

  coins.forEach(function(coin) {
    coin.display();
    coin.move();
  })
*/

  // using for of loop
  for(let coin of coins) {
    coin.display();
    coin.move();
  }

  // check for collision, if there is a collision increase points by 1 AND splice coin out of array
  // need to iterate backwards through array

  for(let i = coins.length - 1; i >= 0; i--) {
    if(dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      console.log(points);
      coins.splice(i, 1);
    }
    else if(coins[i].y > h) {
      coins.splice(i, 1);
      console.log('coin is out of town');
    }
  }


  text(`Points: ${points}`, w/4, h - 30);

  if(points == 10) {
    if(firstTime) {
      playerImg = loadImage('assets/player/mariolevel2.png');
      coinImg = loadImage('assets/coin/coinlevel2.png')
    }
    firstTime = false;
  }
  if(points == 20) {
    if(secondTime) {
      playerImg = loadImage('assets/player/mariolevel3.png');
      coinImg = loadImage('assets/coin/coinlevel3.png')
    }
    secondTime = false;
  }
  if(points == 30) {
    if(thirdTime) {
      playerImg = loadImage('assets/player/mariolevel4.png');
      coinImg = loadImage('assets/coin/coinlevel4.png')
    }
    thirdTime = false;
  }
  if(points == 40) {
    if(fourthTime) {
      playerImg = loadImage('assets/player/mariolevel5.png');
      coinImg = loadImage('assets/coin/coinlevel5.png')
    }
    fourthTime = false;
  }
  if(points == 50) {
    if(fifthTime) {
      playerImg = loadImage('assets/player/mariolevel6.png');
      coinImg = loadImage('assets/coin/coinlevel6.png')
    }
    fifthTime = false;
  }
  if(points == 60) {
    if(sixthTime) {
      playerImg = loadImage('assets/player/mariolevel7.jpg');
      coinImg = loadImage('assets/coin/coinlevel7.png')
    }
    sixthTime = false;
  }
  if(points == 70) {
    state = 'you win';
  }
}

function level1MouseClicked() {
  /*
  console.log('points = ' + points);
  points++;

  if(points >= 10) {
    state = 'you win';
  }
  */
}

function youWin() {
  background(255, 50, 80);
  textSize(80);
  stroke(255);
  text('YOU WIN', w/2, h/2);

  textSize(30);
  text('click anywhere to restart', w/2, h*3/4);
}

function youWinMouseClicked() {
  state = 'level 1';
  points = 0;
}
