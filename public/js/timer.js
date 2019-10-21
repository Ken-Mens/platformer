export default class Timer {
	constructor(deltaTime = 1/60) {
 let accuTime = 0;
 let lasTime = 0;

  this.updateProxy = (time) => {
            accuTime += (time - lasTime) / 1000;

        while (accuTime > deltaTime)  {
		this.update(deltaTime);

                accuTime -= deltaTime;
         }
        lasTime = time;


            this.enqueue();
		}
	}
        enqueue() {
            requestAnimationFrame(this.updateProxy);
}


	start() {
            this.enqueue();
   }
}
