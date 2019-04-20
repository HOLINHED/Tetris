
class Peice {

   constructor() {
      this.x    = (BOARD_WIDTH / 2) - 2
      this.type = TYPES.getRandom();
      this.y    = 0;
      this.rot  = 0;

      if (!this.moveLegal(this.x,this.y,this.rot)) {
         gameOver = true;
      }
   }

   draw() {
      fill(this.type.fill);
      for(let i = 0; i < 4; i++) 
         for (let j = 0; j < 4; j++) {
            const dx = this.getRotated(j,i,this.rot);
            if (this.type.data[dx] != '0') 
               rect((this.x + j) * SCALE, (i + this.y) * SCALE, SCALE, SCALE);
         }
   }

   rotate(inc) {
      if (this.moveLegal(this.x,this.y,this.rot + inc))
         this.rot += inc;
   }

   fall(speed) {
      if (!this.moveLegal(this.x, this.y + speed, this.rot)) return false;
      this.y += speed;
      return true;
   }

   move(dir) {
      if (this.moveLegal(this.x + dir, this.y, this.rot))
         this.x += dir;
   }

   addToBoard() {
      for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
            const index = this.getRotated(j,i,this.rot);

            if (this.type.data[index] != '0')
               board[(this.y + i) * BOARD_WIDTH + (this.x + j)] = this.type.id;
         }
      }
   }

   moveLegal(newX, newY, rot) {
   
      for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
            const index = this.getRotated(j,i,rot);
            
            if (this.type.data[index] != '0' && board[(newY + i) * BOARD_WIDTH + (newX + j)] != 0)
               return false;
         }
      }
      
      return true;
   }

   getRotated(x, y, r) {

      let index = 0;
      
      switch(abs(r) % 4) {
      
         case 0: index = y * 4 + x;        break;   // 0 
         case 1: index = 12 + y - (x * 4); break;   // 90 
         case 2: index = 15 - (y * 4) - x; break;   // 180
         case 3: index = 3 - y + (x * 4);  break;   // 270
      }
   
      return index;
   }

}