import {loadLevel} from './loaders.js'; 
import {loadMainSprite, loadBackgroundSprites} from './sprites.js'; 

function drawBackground(background, context, sprites) {
	background.ranges.forEach(([x1, x2, y1, y2]) => {
          for (let x = x1; x < x2; x++) {
              for(let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
         }
       }
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMainSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([mainsprite, sprites,level]) => {


   const post = {
	x: 64,
	y: 64,
};
	function update() {
        level.backgrounds.forEach(background => {
         drawBackground(background, context, sprites);
    });
    mainsprite.draw('idle', context, post.x, post.y);
    post.x += 2;
    post.y += 2;
    requestAnimationFrame(update);
  }
   update();
});
