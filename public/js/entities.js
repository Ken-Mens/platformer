import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import {loadSprites} from './loaders.js';

export function createD() {
       return loadSprites('dragon')
       .then(sprite => {
       const dragon = new Entity();
       dragon.size.set(14, 16);
	
      dragon.addTrait(new Go());
      dragon.addTrait(new Jump());

	const frames = ['run1', 'run2'];

     function routeF(dragon) {
		if(dragon.go.dir !== 0) {
		const frameIdx  = Math.floor(dragon.go.distance / 10) % frames.length;
		const frameN = frames[frameIdx];
			return frameN;

		}
	return 'idle';
	}

      dragon.draw = function drawMainP(context) {
      sprite.draw(routeF(this), context, 0, 0);
   }

        return dragon;
	});
     }
