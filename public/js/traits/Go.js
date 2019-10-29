import {Trait} from '../Entity.js';

export default class Go extends Trait {
        constructor() {

         super('go');
	this.dir = 0;
	this.accel = 400;
	this.decel = 300;
	this.dragging = 1/5000;

	this.distance = 0;
	this.header = 1;
     }
        update(entity, deltaTime) {
		const aba = Math.abs(entity.vel.x);
		entity.vel.x += this.accel * this.dir * deltaTime;
		this.header = this.dir;

	if (this.dir) {
		this.distance += aba * deltaTime;
	}    else if (entity.vel.x !== 0) {
		const decelx = Math.min(aba, this.decel * deltaTime);
		entity.vel.x += entity.vel.x > 0 ? -decelx : decelx;
	} else {
		this.distance = 0;
	   }
		const drag = this.dragging * entity.vel.x * Math.abs(entity.vel.x);
		entity.vel.x -= drag;
        }
}
