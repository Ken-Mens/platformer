export function setupMouseC(canvas, entity, camera) {
let lastEve;

    ['mousedown', 'mousemove'].forEach(eventName => {
canvas.addEventListener(eventName, event => {
if (event.buttons === 1) {
	entity.vel.set(0,0);
	entity.post.set(
        event.offsetX + camera.post.x,
        event.offsetY + camera.post.y);
     } else if (event.buttons === 2
		&& lastEve && lastEve.buttons === 2
		&& lastEve.type === 'mousemove'){
		camera.post.x -= event.offsetX - lastEve.offsetX;
	}
	lastEve = event;
   });
 });

canvas.addEventListener('contextmenu', event => {
	event.preventDefault();
	});
}


