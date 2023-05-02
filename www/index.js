import init, { World } from "snake_game";
init().then(_ => {
    const world = World.new();
    const snakeIndex = world.snake_head();
    const WORLD_SIZE = world.width();
    console.log("World created successfully with number of cells ", WORLD_SIZE);
    console.log("Snake head positioned at index ", snakeIndex);
    const CELL_SIZE = Math.floor(WORLD_SIZE * .9);
    const canvas = document.getElementById('snake-game-canvas');
    const context = canvas.getContext("2d");
    canvas.height = WORLD_SIZE * CELL_SIZE;
    canvas.width = WORLD_SIZE * CELL_SIZE;

    function drawWorld() {
        context.beginPath();
        for (let x = 0; x <= WORLD_SIZE; x++) {
            context.moveTo(CELL_SIZE * x, 0);
            context.lineTo(CELL_SIZE * x, WORLD_SIZE * CELL_SIZE);
        }

        for (let y = 0; y <= WORLD_SIZE; y++){
            context.moveTo(0, CELL_SIZE * y);
            context.lineTo(WORLD_SIZE * CELL_SIZE, CELL_SIZE * y);
        }

        context.stroke();
    }

    function drawSnake() {
        const col = snakeIndex % WORLD_SIZE;
        const row = Math.floor(snakeIndex / WORLD_SIZE);

        context.beginPath();
        context.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        context.stroke();
    }

    drawSnake();
    drawWorld();
})
