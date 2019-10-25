// Create a new Camera

import {Vector} from './math.js';
export default class Camera {
	constructor() {
		this.post = new Vector (0, 0);
		this.size = new Vector (256, 225);
	}
}

