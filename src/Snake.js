import Position from './Position';

const DIRECTION = Object.freeze({
    LEFT: Symbol('left'),
    RIGHT: Symbol('right'),
    UP: Symbol('up'),
    DOWN: Symbol('down')
});

export default class Snake {
    constructor() {
        this.direction = DIRECTION.RIGHT;
        this.bodies = [new Position(15, 15), new Position(14, 15), new Position(13, 15)];
        this.lastTailPos = this.bodies[0];
    }

    move() {
        const peek = this.bodies[0];
        const pos = new Position(peek.x, peek.y);

        const { LEFT, RIGHT, UP, DOWN } = DIRECTION;
        switch (this.direction) {
        case LEFT:
            pos.x--;
            break;
        case RIGHT:
            pos.x++;
            break;
        case UP:
            pos.y--;
            break;
        case DOWN:
            pos.y++;
            break;
        default:
            throw Error('Invalid direction');
        }

        this.bodies.unshift(pos);
        this.lastTailPos = this.bodies.pop();
    }

    ateFood() {
        this.bodies.push(this.lastTailPos);
    }

    changeDirection(key) {
        if (key === 38 && this.direction !== DIRECTION.DOWN) {
            this.direction = DIRECTION.UP;
        } else if (key === 40 && this.direction !== DIRECTION.UP) {
            this.direction = DIRECTION.DOWN;
        } else if (key === 37 && this.direction !== DIRECTION.RIGHT) {
            this.direction = DIRECTION.LEFT;
        } else if (key === 39 && this.direction !== DIRECTION.LEFT) {
            this.direction = DIRECTION.RIGHT;
        } else {
            throw Error('Invalid key');
        }
    }
}
