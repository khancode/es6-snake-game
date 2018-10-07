import Draw from './Draw';
import COLLISION from './COLLISION';

const STATES = Object.freeze({
    GROUND: Symbol('ground'),
    SNAKE: Symbol('snake'),
    FOOD: Symbol('food')
});

export default class Board {
    constructor(width, height) {
        this.readOnly = Object.freeze({
            numOfRows: 35,
            numOfColumns: 35,
            cellSize: width / 35
        });
        this.width = width;
        this.height = height;
        this.grid = [];
        for (let i = 0; i < this.readOnly.numOfRows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.readOnly.numOfColumns; j++) {
                this.grid[i][j] = STATES.GROUND;
            }
        }

        this.draw = new Draw(width, height);
    }

    updateGrid(snakePositions, foodPosition) {
        const map = {};
        for (const i in snakePositions) {
            const pos = snakePositions[i];
            const { numOfRows, numOfColumns } = this.readOnly;
            if (map[pos.coordinates] !== undefined) {
                // Snake collided with itself, GAME OVER
                return COLLISION.SNAKE;
            } else if (pos.x < 0 || pos.x >= numOfColumns || pos.y < 0 || pos.y >= numOfRows) {
                // Snake collided into wall, GAME OVER
                return COLLISION.WALL;
            }
            else if (pos.coordinates === foodPosition.coordinates) {
                // Snake ate food, CONTINUE GAME
                return COLLISION.FOOD;
            }

            map[pos.coordinates] = true;
        }

        // Snake didn't make any collision, CONTINUE GAME
        return COLLISION.NONE;
    }

    updateUI(snakePositions, foodPosition) {
        // Functions below for drawing on canvas
        this.clear();
        this.updateSnake(snakePositions);
        this.updateFood(foodPosition);
    }

    clear() {
        // clear drawing area
        this.draw.drawSquare('white', 0, 0, this.width, this.height);
    }

    updateSnake(snakePositions) {
        const { cellSize } = this.readOnly;
        snakePositions.forEach(pos => {
            this.draw.drawSquare('green', pos.x*cellSize, pos.y*cellSize, cellSize, cellSize);
            this.draw.drawSquareOutline('lightgreen', pos.x*cellSize, pos.y*cellSize, cellSize, cellSize);
        });
    }

    updateFood(foodPosition) {
        const pos = foodPosition;
        const { cellSize } = this.readOnly;
        this.draw.drawSquare('red', pos.x*cellSize, pos.y*cellSize, cellSize, cellSize);
    }
}
