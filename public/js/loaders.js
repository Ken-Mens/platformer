import Level from './level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import SpriteSheet from './SpriteSheet.js';

export function loadImage(url) {
 return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
              resolve(image);
      });
       image.src = url;
  });
}

function loadJSON(url) {
 return fetch(url)
    .then(r => r.json());
}

function createTiles(level, backgrounds) {

	function applyR(background, xST, xLEN, yST, yLEN) {
	  const xEND = xST + xLEN;
	  const yEND = yST + yLEN;
          for (let x = xST; x < xEND; x++) {
             for(let y = yST; y < yEND; y++) {
		level.tiles.set(x, y, {
			name: background.tile,
			type : background.type,
		  });
		}
            }
        }


    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
		if (range.length === 4) {
			const [xST, xLEN, yST, yLEN] = range;
			applyR(background, xST, xLEN, yST, yLEN);
      } else if (range.length === 3) {
	const [xST, xLEN, yST] = range;
	applyR(background, xST, xLEN, yST, 1);

	} else if (range.length === 2) {
			const [xST, yST] = range;
			applyR(background, xST, 1, yST, 1);
		}
          });
     });
}

function loadSprites(name) {
	return loadJSON(`/sprites/${name}.json`)
	.then(sheetSpec => Promise.all([
		sheetSpec,
		loadImage(sheetSpec.imageURL),
	]))
	.then(([sheetSpec, image]) => {
      		const sprites = new SpriteSheet(image,
					sheetSpec.tileW,
					sheetSpec.tileH);
	sheetSpec.tiles.forEach(tileSpec => {
	    sprites.defineTile(
		    tileSpec.name,
		    tileSpec.index[0],
		    tileSpec.index[1]);
	});

      	return sprites;
   });
}

export function loadLevel(name) {
	return Promise.all([
	   loadJSON(`/levels/${name}.json`),
	   loadSprites('totalworld'),
  ])
          .then(([levelSpec, backgroundSprites]) => {
	     const level = new Level();

	  createTiles(level, levelSpec.backgrounds);

          const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
          level.comp.layers.push(backgroundLayer);

          const spriteLayer = createSpriteLayer(level.entities);
          level.comp.layers.push(spriteLayer);
	
	
	  return level;
     });
  }
