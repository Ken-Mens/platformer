import Entity from './Entity.js';
import {loadMainSprite} from './sprites.js';

export function createP() {
       return loadMainSprite()
	.then(sprite => {
  	const main_p = new Entity();

   main_p.draw = function drawMainP(context) {
      sprite.draw('idle', context, this.post.x, this.post.y);
   }

   main_p.update = function updateMainP(deltaTime) {
           this.post.x += this.vel.x * deltaTime;
           this.post.y += this.vel.y * deltaTime;
     }
        return main_p;
	});
}
