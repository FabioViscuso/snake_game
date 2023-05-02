use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;
#[wasm_bindgen]
struct SnakeCell(usize);

#[wasm_bindgen]
pub struct Snake {
    body: Vec<SnakeCell>
}

#[wasm_bindgen]
impl Snake {
    pub fn new(starting_index: usize) -> Snake {
        Snake {
            body: vec!(SnakeCell(starting_index))
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new() -> World {
        World {
            width: 16,
            snake: Snake::new(10)
        }
    }
    pub fn width(&self) -> usize {
        self.width
    }
    pub fn snake_head(&self) -> usize {
        self.snake.body[0].0
    }
}
