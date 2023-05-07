import init, { World, Direction } from "snake_game";
init().then(wasm => {
    // Build world
    const CELL_SIZE = 20;
    const WORLD_WIDTH = 8;
    const SNAKE_SPAWN_INDEX = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);
    const world = World.new(WORLD_WIDTH, SNAKE_SPAWN_INDEX);

    // Build snake
    const snakeCellPtr = world.snake_cells();
    const snakeLenght = world.get_snake_lenght();

    // Build canvas
    const canvas = document.getElementById('snake-game-canvas') as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    canvas.height = WORLD_WIDTH * CELL_SIZE;
    canvas.width = WORLD_WIDTH * CELL_SIZE;

    document.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowUp":
                console.log("moving up");
                world.change_direction(Direction.Up);
                break;
            case "ArrowDown":
                console.log("moving down");
                world.change_direction(Direction.Down);
                break;
            case "ArrowLeft":
                console.log("moving left");
                world.change_direction(Direction.Left);
                break;
            case "ArrowRight":
                console.log("moving right");
                world.change_direction(Direction.Right);
                break;
            default: console.log("Invalid key");
        }
    })

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
        const snakeCells = new Uint32Array(
            wasm.memory.buffer,
            snakeCellPtr,
            snakeLenght
        );

        snakeCells.forEach((cell, i)=> {
            const col = cell % WORLD_WIDTH;
            const row = Math.floor(cell / WORLD_WIDTH);

            context.fillStyle = i === 0 ? "#DBF9B8" : "#87A878"

            context.beginPath();
            context.fillRect(
                col * CELL_SIZE,
                row * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        });
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
            world.step();
            drawActors();
            requestAnimationFrame(updateGame);
        }, 1000 / refreshSpeedFPS)
    }

    drawActors();
    updateGame();
})
