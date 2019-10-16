import {Trait} from '../Entity.js';

export default class Jump extends Trait {
        constructor() {

         super('jump');
	this.duration = 0.5;
	this.velocity = 200;
	this.engaged = 0;
}
        // duration of key being pressed or engaged
	start() {
	 this.engaged = this.duration;
	}

      cancel() {
	   this.engaged = 0;
	}

        update(entity, deltaTime) {
	 if (this.engaged >  0) {
	    entity.vel.y = -this.velocity;
	    this.engaged -= deltaTime;
	   }
        }
 }
