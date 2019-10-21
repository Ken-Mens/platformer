import Timer from './timer.js';
import Camera from './camera.js';
import {loadLevel} from './loaders.js';
import {createD} from './entities.js';
import {creatColayer} from './layers.js';
import {setupKeyboard} from './input.js';
import {setupMouseC} from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createD(),
    loadLevel('1-1'),
])
.then(([dragon, level]) => {
    const camera = new Camera();
    window.camera = camera;

    dragon.post.set(64, 64);

    level.entities.add(dragon);

  const input = setupKeyboard(dragon);
  input.listenTo(window);

   setupMouseC(canvas, dragon, camera);

   const timer = new Timer(1/60);
   timer.update = function update(deltaTime) {
           level.update(deltaTime);

           level.comp.draw(context, camera);

           //dragon.vel.y += gravity * deltaTime;
	}
   timer.start();
});
