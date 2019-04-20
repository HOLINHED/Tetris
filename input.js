let keys = [];

function keyPressed() {
   
   switch(keyCode){
      case 90: peice.rotate(-1); break; // rotate left
      case 67: peice.rotate(1);  break; // rotate right
      case 32 : loop();          break; // restart game if over
   }
   
   if (keys.indexOf(keyCode) == -1)
      keys.push(keyCode);
}

function keyReleased() {
   const i = keys.indexOf(keyCode);
   keys.splice(i,1);
}

function checkKey(k) {
   return keys.indexOf(k) != -1;
}