
export default class Draw {
    constructor(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style = 'border:5px solid #000000;';
        document.body.appendChild(canvas);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    drawSquare(color, x, y, width, height) {
        const { ctx } = this;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    drawSquareOutline(color, x, y, width, height) {
        const { ctx } = this;
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, width, height);
    }
}
