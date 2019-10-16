import {Trait} from '../Entity.js';
export default class Velocity extends Trait {
        constructor() {
         super('velocity');
       }

        update(entity, deltaTime) {
              entity.post.x += entity.vel.x * deltaTime;
              entity.post.y += entity.vel.y * deltaTime;
        }
 }
