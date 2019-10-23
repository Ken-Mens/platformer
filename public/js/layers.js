export function createBackgroundLayer(level, sprites) {
	const tiles = level.tiles;
	const resolver = level.tileCollider.tiles;

        const buffer = document.createElement('canvas');
        buffer.width = 400;
        buffer.height = 400;

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

export function creatColayer(level) {
	const resolvedT = [];

	const tResolver = level.tileCollider.tiles;
	const tileSize = tResolver.tileSize;

	const getByIndexO =  tResolver.getByIndex;
	tResolver.getByIndex = function getByIndexFake(x, y) {
		resolvedT.push({x, y});
	return getByIndexO.call(tResolver, x, y);
   }
	return function drawCollis(context, camera) {
		context.strokeStyle = 'blue';
		resolvedT.forEach(({x, y}) => {
			context.beginPath();
			context.rect(
 					x * tileSize - camera.post.x,
		                     	y * tileSize - camera.post.y,
					 tileSize, tileSize);
   			context.stroke();
	      });

		context.strokeStyle = 'red';
		level.entities.forEach(entity => {
                context.beginPath();
		context.rect(
				entity.post.x - camera.post.x,
				entity.post.y - camera.post.y,
				entity.size.x, entity.size.y);
   		context.stroke();
		});
		resolvedT.length = 0;
	};
}

export function createCamLayer(cameraD) {
	return function drawCam(context, fromCamera) {
		context.strokeStyle = 'green';
		context.beginPath();
	        context.rect(
	         	cameraD.post.x - fromCamera.post.x,
                 	cameraD.post.y - fromCamera.post.y,
                 	cameraD.size.x, cameraD.size.y);
			context.stroke();
	};
}
