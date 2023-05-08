import init, { World, Direction, GameStatus, InitOutput } from "snake_game";
import { random } from "./utils/random";

init().then((wasm: InitOutput) => {
    // Build world
    const CELL_SIZE = 20;
    const WORLD_WIDTH = 8;
    const SNAKE_SPAWN_INDEX = random(WORLD_WIDTH * WORLD_WIDTH);
    const world = World.new(WORLD_WIDTH, SNAKE_SPAWN_INDEX);

    // Build canvas
    const canvas = document.getElementById('snake-game-canvas') as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    canvas.height = WORLD_WIDTH * CELL_SIZE;
    canvas.width = WORLD_WIDTH * CELL_SIZE;

    // UI -- Bindings
    const button = document.getElementById('game-panel__control');
    const statusTextLabel = document.getElementById('game-panel__info__status');
    const pointsCounter = document.getElementById('game-panel__score__points');
    drawPoints();
    drawStatus();

    // UI -- Button events
    button.addEventListener('click', () => {
        const gameStatus = world.game_status();
        if (gameStatus === undefined) {
            world.start_game();
            drawStatus();
            button.textContent = "Stop";
            gameLoop();
        } else {
            location.reload();
        }
    })

    // UI -- Keyboard events
    document.addEventListener("keydown", (e) => {
        const key = e.code;
        if (key === "ArrowUp" || key === "KeyW" ) {
            world.change_direction(Direction.Up);
        }
        else if (key === "ArrowDown" || key === "KeyS") {
            world.change_direction(Direction.Down);
        }
        else if (key === "ArrowLeft" || key === "KeyA") {
            world.change_direction(Direction.Left);
        }
        else if (key === "ArrowRight" || key === "KeyD") {
            world.change_direction(Direction.Right);
        }
        else {
            console.log("Invalid key");
        }
    })

    // UI -- Mobile swipe events
    document.addEventListener("touchstart", startTouch, false);
    document.addEventListener("touchmove", moveTouch, false);

    // Swipe Up / Down / Left / Right
    let initialX: number | null = null;
    let initialY: number | null = null;

    function startTouch(e: TouchEvent) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    };

    function moveTouch(e: TouchEvent) {
        if (initialX === null) {
            return;
        }

        if (initialY === null) {
            return;
        }

        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;

        let diffX = initialX - currentX;
        let diffY = initialY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
                // swiped left
                world.change_direction(Direction.Left);
            } else {
                // swiped right
                world.change_direction(Direction.Right);
            }
        } else {
            // sliding vertically
            if (diffY > 0) {
                // swiped up
                world.change_direction(Direction.Up);
            } else {
                // swiped down
                world.change_direction(Direction.Down);
            }
        }

        initialX = null;
        initialY = null;

        e.preventDefault();
    };

    function drawPoints() {
        pointsCounter.textContent = String(world.points());
    }

    function drawStatus() {
        statusTextLabel.textContent = world.game_status_tostring();
    }

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
            world.snake_cells(),
            world.get_snake_lenght()
        );

        snakeCells.forEach((cell, i) => {
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

    function drawReward() {
        const rewardCellIndex = world.reward_cell();
        const col = rewardCellIndex % WORLD_WIDTH;
        const row = Math.floor(rewardCellIndex / WORLD_WIDTH);

        context.fillStyle = "#FFD700";
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
        drawWorld();
        drawSnake();
        drawReward();
        drawStatus();
        drawPoints();
    }

    function gameLoop() {
        const gameStatus = world.game_status();
        if (gameStatus === GameStatus.Won) {
            button.textContent = "Another round?";
            return;
        } else if (gameStatus === GameStatus.Lost) {
            button.textContent = "Try again!";
            return;
        }
        const refreshSpeedFPS = 3;
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.step();
            drawActors();
            requestAnimationFrame(gameLoop);
        }, 1000 / refreshSpeedFPS)
    }

    drawActors();
})
