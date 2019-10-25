import Resolver from './TileResolver.js';

export default class TileCollider {
	constructor(tileMatrix) {
		this.tiles = new Resolver(tileMatrix);
	}

        checkX(entity) {
	let x;
        if (entity.vel.x > 0) {
            x = entity.post.x + entity.size.x;
       } else if (entity.vel.x < 0) {
            x = entity.post.x;
        } else {
            return;
        }

        const matches = this.tiles.searchRange(
            x, x,
            entity.post.y, entity.post.y + entity.size.y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.post.x + entity.size.x > match.x1) {
                    entity.post.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.post.x < match.x2) {
                    entity.post.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
}

	checkY(entity) {
	let y;
          if (entity.vel.y > 0) {
                y = entity.post.y + entity.size.y;
         } else if (entity.vel.y < 0) {
            y = entity.post.y;
        } else {
            return;
        }

        const matches = this.tiles.searchRange(
            entity.post.x, entity.post.x + entity.size.x,
            y, y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.post.y + entity.size.y > match.y1) {
                    entity.post.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) {
                if (entity.post.y < match.y2) {
                    entity.post.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }
}

