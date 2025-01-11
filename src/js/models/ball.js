import { dimensions } from "./dimensions.js";

export class Ball {
    constructor() {
        this.elem = null;
        this.vectx = 0;
        this.vecty = -4;
        this.dimensions = null;
    }

    renderBall(paddleDimensions, container) {
        const ball = document.createElement('div');
        ball.className = "ball";
        container.append(ball);

        this.dimensions = new dimensions(ball);

        const newx = paddleDimensions.right - (paddleDimensions.width / 2) - (this.dimensions.width / 2);
        const newy = paddleDimensions.top - this.dimensions.height;

        this.dimensions.update({
            x: newx,
            y: newy,
            top: newy,
            left: newx,
            right: newx + this.dimensions.width,
            bottom: newy + this.dimensions.height,
        });

        ball.style.left = `${newx}px`;
        ball.style.top = `${newy}px`;

        this.elem = ball;
    }



    move() {
        this.dimensions.update({
            x: this.dimensions.x + this.vectx,
            y: this.dimensions.y + this.vecty,
            left: this.dimensions.x + this.vectx,
            top: this.dimensions.y + this.vecty,
            right: this.dimensions.x + this.vectx + this.dimensions.width,
            bottom: this.dimensions.y + this.vecty + this.dimensions.height,
        });
        this.elem.style.left = `${this.dimensions.x}px`;
        this.elem.style.top = `${this.dimensions.y}px`;
    }


    reset(paddle) {
        this.dimensions.x = paddle.right - (paddle.width / 2) - (this.dimensions.width / 2), this.dimensions.y = paddle.top - this.dimensions.height;
        this.elem.style.left = `${this.dimensions.x}px`;
        this.elem.style.top = `${this.dimensions.y}px`;
        this.dimensions.update({
            x: this.dimensions.x,
            y: this.dimensions.y,
            left: this.dimensions.x,
            top: this.dimensions.y,
            right: this.dimensions.x + this.dimensions.width,
            bottom: this.dimensions.y + this.dimensions.height,
        });
    }

}