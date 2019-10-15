import Compositor from './Compositor.js';
import Timer from './timer.js';
import Entity from './Entity.js';
import {loadLevel} from './loaders.js'; 
import {createP} from './entities.js'; 
import {loadBackgroundSprites} from './sprites.js'; 
import {createBackgroundLayer, createSpriteLayer} from './layers.js'; 

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');



Promise.all([
    createP(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([main_p, backgroundSprites, level]) => {
   const comp = new Compositor();

   const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
   comp.layers.push(backgroundLayer);

   const gravity = 30;
    main_p.post.set(64, 180);
    main_p.vel.set(200, -600);


   const spriteLayer = createSpriteLayer(main_p);
   comp.layers.push(spriteLayer);

   const timer = new Timer(1/60);
   timer.update = function update(deltaTime) {
           comp.draw(context);
           main_p.update(deltaTime);
           main_p.vel.y += gravity;
	}
   timer.start();
});
