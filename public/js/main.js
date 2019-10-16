import Compositor from './Compositor.js';
import Timer from './timer.js';
import {loadLevel} from './loaders.js';
import {createD} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import Keyboard from './KeyboardState.js';

//returns element object for game screen
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createD(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([dragon, backgroundSprites, level]) => {
   const comp = new Compositor();

// declare and push background layer of game
   const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
   comp.layers.push(backgroundLayer);

   const gravity = 1900;
    dragon.post.set(64, 180);
    dragon.vel.set(200, -600);


   //Add mapping for keyboard input and print state
  const SPACE = 32;
  const input = new Keyboard(); 
  input.addMapping(SPACE, keyState => {
       if (keyState) {
	 dragon.jump.start();
	} else {
		dragon.jump.cancel();
	}
        console.log(KeyState);
  });
  input.listenTo(window);


   const spriteLayer = createSpriteLayer(dragon);
   comp.layers.push(spriteLayer);

   const timer = new Timer(1/60);
   timer.update = function update(deltaTime) {
           dragon.update(deltaTime);
           comp.draw(context);
           dragon.vel.y += gravity * deltaTime;
	}
   timer.start();
});
