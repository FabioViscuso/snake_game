use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right
}
struct SnakeCell(usize);

#[wasm_bindgen]
pub struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction
}

#[wasm_bindgen]
impl Snake {
    pub fn new(starting_index: usize) -> Snake {
        Snake {
            body: vec!(SnakeCell(starting_index)),
            direction: Direction::Right
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    size: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_spawn_index: usize) -> World {
        let width = width;
        World {
            width,
            size: width * width,
            snake: Snake::new(snake_spawn_index)
        }
    }
    pub fn width(&self) -> usize {
        self.width
    }
    pub fn snake_head(&self) -> usize {
        self.snake.body[0].0
    }
    pub fn change_direction(&mut self, direction: Direction) {
        self.snake.direction = direction;
    }
    pub fn update_snake(&mut self) {
        let snake_head_index = self.snake_head();
        let row = snake_head_index / self.width;
        let col = snake_head_index % self.width;

        if self.snake.direction == Direction::Up {
            let next_row = (row - 1) % self.width;
            self.snake.body[0].0 = (next_row * self.width) + col;
        }
        if self.snake.direction == Direction::Down {
            let next_row = (row + 1) % self.width;
            self.snake.body[0].0 = (next_row * self.width) + col;
        }
        if self.snake.direction == Direction::Left {
            let next_column = (col - 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_column;
        }
        if self.snake.direction == Direction::Right {
            let next_column = (col + 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_column;
        }
    }
}
