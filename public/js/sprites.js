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
