import Position from './Position';

export default class Food {
    constructor(x, y) {
        this.position = new Position(x, y);
    }

    get x() {
        return this.position.x;
    }

    set x(x) {
        this.position.x = x;
    }

    get y() {
        return this.position.y;
    }

    set y(y) {
        this.position.y = y;
    }

    update(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}
