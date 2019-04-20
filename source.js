// constants
const BOARD_WIDTH  = 12;
const BOARD_HEIGHT = 18;
const SCALE        = 30;

let board = [];
let game_speed, score,
    fallSpeed, gameOver,
    peice;

function setup() {
   // boardWidth * scale, boardHeight * scale
   createCanvas(360,540);
   frameRate(15);

   gameSetup();

   textSize(25);
}

function gameSetup() {

      game_speed = 20;
      score      = 0;
      fallSpeed  = 1;
      gameOver   = false;

      // init board
      for (let y = 0; y < BOARD_HEIGHT; y++) {
         for (let x = 0; x < BOARD_WIDTH; x++) {
            board[y * BOARD_WIDTH + x] =  x == 0 ||
            y == BOARD_HEIGHT - 1 || x == BOARD_WIDTH - 1 ? 9 : 0;
         }
      }

      peice = new Peice();
}

function draw() {
   background(0);

   // draw current board state
   for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
         const tile = board[y * BOARD_WIDTH + x];
         switch(tile) {
            case 9:  fill(40);         break;
            case 1:  fill(51,252,255); break;
            case 2:  fill(255,255,0);  break;
            case 3:  fill(0,0,255);    break;
            case 4:  fill(255,162,0);  break;
            case 5:  fill(58,255,0);   break;
            case 6:  fill(255,0,0);    break;
            case 7:  fill(170,0,255);  break;
            case 0:  fill(0);          break;
            default: fill(255);        break;
         }
         rect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
   }

   peice.draw();

   fill(255);
   text(`Score: ${score}`, 45, 30);

   if (frameCount % floor(game_speed) == 0) {
      if (!peice.fall(fallSpeed)) {
         peice.addToBoard();
         peice = new Peice();
         if (floor(game_speed - 0.25) > 0)
            game_speed -= 0.25;
      }
      checkBoard();
   }

   // input
   if (checkKey(37)) peice.move(-1);
   if (checkKey(39)) peice.move(1);
   if (checkKey(40)) { 
      peice.fall(fallSpeed);
      score += 1;
   }
   
   if (gameOver) {
      gameSetup();
      fill(0);
      rect(SCALE,height/2 - 50,width - SCALE*2,120);
      fill(255);
      text("         GAME OVER! \n  Press SPACE to restart.", (width / 2) - (30 * 4.8), height / 2);
      noLoop();
   }
}

function checkBoard() {
   let cleared = 0;
   for (let y = 0; y < BOARD_HEIGHT - 1; y++) {
      let line = 0;
      for (let x = 1; x < BOARD_WIDTH - 1; x++) {
         if (board[y * BOARD_WIDTH + x] != 0) line++;
         if (line > 0 && y == 0) gameOver = true;
         if (line >= BOARD_WIDTH - 2) {
            clearLine(y);
            cleared += 1;
         }
      }
   }
   if (cleared > 0)
      score += (100 << cleared);
}

function clearLine(line) {
   for (let y = line; y > 0; y--) {
      for (let x = 1; x < BOARD_WIDTH; x++) {
         board[y * BOARD_WIDTH + x] = board[(y - 1) * BOARD_WIDTH + x];
      }
   }
}





