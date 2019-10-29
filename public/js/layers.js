export function createBackgroundLayer(level, sprites) {
	const tiles = level.tiles;
	const resolver = level.tileCollider.tiles;

        const buffer = document.createElement('canvas');
        buffer.width = 500 + 100;
        buffer.height = 500;

	const context = buffer.getContext('2d');

	let startIDX;
	let endIDX;

	function redraw(drawFrom, drawTo) {
		if (drawFrom === startIDX && drawTo === endIDX) {
			return;
        }

	startIDX = drawFrom;
	endIDX = drawTo;

	   for (let x = startIDX; x <= endIDX; x++) {
		const column = tiles.grid[x];
		if (column) {
		    column.forEach((tile, y) => {
                    sprites.drawTile(tile.name, context, x - startIDX, y);
		});
   	    }
	  }
	}

        return function drawBackgroundLayer(context, camera) {
	 const drawW = resolver.toIndex(camera.size.x);
	 const drawFrom = resolver.toIndex(camera.post.x);
	 const drawTo = drawFrom + drawW;
	 redraw(drawFrom, drawTo);

           context.drawImage(buffer,
			  -camera.post.x % 16,
			  -camera.post.y);
  };
}
export function createSpriteLayer(entities, width = 64, height = 64) {
	const spriteBuffer = document.createElement('canvas');
	spriteBuffer.width = width;
	spriteBuffer.height = height;
	const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context, camera) {
	entities.forEach(entity => {
	  spriteBufferContext.clearRect(0, 0, width, height);

           entity.draw(spriteBufferContext);
		
	context.drawImage(
		spriteBuffer,
		entity.post.x - camera.post.x,
		entity.post.y - camera.post.y);
      });
  };
}

