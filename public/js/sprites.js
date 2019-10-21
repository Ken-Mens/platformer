import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadMainSprite() {

    return loadImage('/images/people.png')
    .then(image => {
      const sprites = new SpriteSheet(image, 18, 18);
      sprites.define('idle', 195, 100, 46, 46);
      return sprites;
   });
}

export function loadBackgroundSprites() {

    return loadImage('/images/people.png')
    .then(image => {
      const sprites = new SpriteSheet(image, 16, 16);
      sprites.defineTile('ground', 1, 13);
      sprites.defineTile('sky', 35, 14);
      return sprites;
   });
}
