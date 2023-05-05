import init, { World } from "snake_game";
init().then(_ => {
    const CELL_SIZE = 20;
    const WORLD_WIDTH = 8;
    const SNAKE_SPAWN_INDEX = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);
    const world = World.new(WORLD_WIDTH, SNAKE_SPAWN_INDEX);

    const canvas = document.getElementById('snake-game-canvas') as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    canvas.height = WORLD_WIDTH * CELL_SIZE;
    canvas.width = WORLD_WIDTH * CELL_SIZE;

    function drawWorld() {
        context.beginPath();
        for (let x = 0; x <= WORLD_WIDTH; x++) {
            context.moveTo(CELL_SIZE * x, 0);
            context.lineTo(CELL_SIZE * x, WORLD_WIDTH * CELL_SIZE);
        }

        for (let y = 0; y <= WORLD_WIDTH; y++){
            context.moveTo(0, CELL_SIZE * y);
            context.lineTo(WORLD_WIDTH * CELL_SIZE, CELL_SIZE * y);
        }

        context.stroke();
    }

    function drawSnake() {
        const col = SNAKE_SPAWN_INDEX % WORLD_WIDTH;
        const row = Math.floor(SNAKE_SPAWN_INDEX / WORLD_WIDTH);

        context.beginPath();
        context.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        context.stroke();
    }

    function drawActors() {
        drawSnake();
        drawWorld();
    }

    function updateGame() {
        const refreshSpeedFPS = 3;
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.update_snake();
            drawActors();
            requestAnimationFrame(updateGame);
        }, 1000 / refreshSpeedFPS)
    }

    drawActors();
    updateGame();
})
