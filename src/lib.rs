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

#[derive(Clone)]
pub struct SnakeCell(usize);

#[wasm_bindgen]
pub struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction
}

#[wasm_bindgen]
impl Snake {
    pub fn new(starting_index: usize, size: usize) -> Snake {
        let mut body = vec!();

        for i in 0..size {
            body.push(SnakeCell(starting_index - i));
        }

        Snake {
            body,
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
            snake: Snake::new(snake_spawn_index, 3)
        }
    }
    pub fn width(&self) -> usize {
        self.width
    }
    pub fn snake_head(&self) -> usize {
        self.snake.body[0].0
    }
    // In this fn we're using raw pointer to escape borrowing rules
    // This is because we can't export a Vec to JS
    // and we know that the data referred to by the pointer will always be there
    pub fn snake_cells(&self) -> *const SnakeCell {
        self.snake.body.as_ptr()
    }
    pub fn get_snake_lenght(&self) -> usize {
        self.snake.body.len()
    }
    pub fn change_direction(&mut self, direction: Direction) {
        let next_cell = self.generate_next_snake_cell(&direction);
        if self.snake.body[1].0 == next_cell.0 {
            return;
        }
        self.snake.direction = direction;
    }
    pub fn step(&mut self) {
        let temp_array = self.snake.body.clone();
        let next_cell = self.generate_next_snake_cell(&self.snake.direction);
        self.snake.body[0] = next_cell;

        let length = self.snake.body.len();

        // We start from 1 because 0 is the head, we are interested in the body
        for i in 1..length {
            self.snake.body[i] = SnakeCell(temp_array[i - 1].0)
        }
    }
    fn generate_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
        let snake_head_index = self.snake_head();
        let row = snake_head_index / self.width;

        return match direction {
            Direction::Up => {
                let treshold = snake_head_index - (row * self.width);
                if snake_head_index == treshold {
                    SnakeCell((self.size - self.width) + treshold)
                } else {
                    SnakeCell(snake_head_index - self.width)
                }
            },
            Direction::Down => {
                let treshold = snake_head_index + ((self.width - row) * self.width);
                if snake_head_index + self.width == treshold {
                    SnakeCell(treshold - ((row + 1) * self.width))
                } else {
                    SnakeCell(snake_head_index + self.width)
                }
            },
            Direction::Left => {
                let treshold = row * self.width;
                if snake_head_index == treshold {
                    SnakeCell(treshold + (self.width - 1))
                } else {
                    SnakeCell(snake_head_index - 1)
                }
            },
            Direction::Right => {
                let treshold = (row + 1) * self.width;
                if snake_head_index + 1 == treshold {
                    SnakeCell(treshold - self.width)
                } else {
                    SnakeCell(snake_head_index + 1)
                }
            },
        }
    }
}
