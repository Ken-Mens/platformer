import {Vector} from './math.js'

export class Trait {
	constructor(name) {
	    this.NAME = name;
	}
	update() {
	console.warn('Unhandled update in Trait');
    }
}

export  default class Entity {
        constructor() {
         this.post = new Vector(0, 0);
         this.vel = new Vector(0, 0);
         this.size = new Vector(0, 0);

	 this.traits = [];
        }

	addTrait(trait) {
	this.traits.push(trait);
	this[trait.NAME] = trait;
    }
	update(deltaTime) {
	this.traits.forEach(trait => {
	trait.update(this, deltaTime);
	})
    }
}
