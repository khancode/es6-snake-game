import Board from './Board';
import Snake from './Snake';
import Food from './Food';
import COLLISION from './COLLISION';

export default class Game {
    constructor() {
        this.board = new Board(500, 500);
        this.snake = new Snake();
        this.food = new Food();
        this.respawnFood();
        this.timer = null;
        this.speed = 125;
        this.points = 0;
        window.onkeyup = e => {
            const key = e.keyCode ? e.keyCode : e.which;
            if (37 <= key && key <= 40) {
                // Up, Down, Left, or Right arrow key pressed
                this.snake.changeDirection(key);
            }
        };

        this.update = this.update.bind(this);
    }

    start() {
        this.timer = setInterval(this.update, this.speed);
    }

    stop(message) {
        clearInterval(this.timer);
        alert(`${message}\nScore: ${this.points}`);
    }

    respawnFood() {
        let x, y;
        const UPPER_BOUND = 34;
        const LOWER_BOUND = 0;
        let isValidPosition = true;

        do {
            x = Math.floor((Math.random() * UPPER_BOUND) + LOWER_BOUND);
            y = Math.floor((Math.random() * UPPER_BOUND) + LOWER_BOUND);

            for (const i in this.snake.bodies) {
                const snakePosition = this.snake.bodies[i];
                if (x === snakePosition.x && y === snakePosition.y) {
                    isValidPosition = false;
                    break;
                }
            }
        } while(!isValidPosition);

        this.food.update(x, y);
    }

    update() {
        this.snake.move();

        // Check for collision with this.board
        const collision = this.board.updateGrid(this.snake.bodies, this.food.position);
        const { NONE, SNAKE, WALL, FOOD } = COLLISION;
        switch (collision) {
        case NONE:
            // CONTINUE GAME
            break;
        case SNAKE:
            // GAME OVER
            this.stop('Game Over - collided with snake');
            break;
        case WALL:
            // GAME OVER
            this.stop('Game Over - collided with wall');
            break;
        case FOOD:
            // EARN POINTS
            this.points += 10;
            this.snake.ateFood();
            this.respawnFood();
            break;
        }

        this.board.updateUI(this.snake.bodies, this.food.position);
    }
}
