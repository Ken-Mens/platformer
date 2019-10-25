import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import {loadMainSprite} from './sprites.js';

export function createD() {
       return loadMainSprite()
       .then(sprite => {
       const dragon = new Entity();
       dragon.size.set(14, 16);
	
      dragon.addTrait(new Go());
      dragon.addTrait(new Jump());

      dragon.draw = function drawMainP(context) {
      sprite.draw('idle', context, 0, 0);
   }

        return dragon;
	});
     }
