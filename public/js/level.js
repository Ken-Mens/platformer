import TileCollider from './collider.js';
import {Matrix} from './math.js';

export default class Level {
	constructor () {
	this.gravity = 4000;

	this.comp = new Compositor();
	this.entities = new Set();
	this.tiles = new Matrix();

	this.tileCollider = new TileCollider(this.tiles);
   }


    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.post.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.post.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

	     entity.vel.y += this.gravity * deltaTime;
        });
    }
}

    class Compositor {
           constructor() {
           this.layers = [];
           }
       draw(context, camera) {
           this.layers.forEach(layer => {
                   layer(context, camera);
       });
     }
  }
