import { dimensions } from "/src/js/models/dimensions.js";

export class Ball {
    constructor(isPortrait) {
        this.elem = null;
        this.vectx = 0;
        this.vecty = isPortrait ? -window.innerWidth * 0.004 : -window.innerHeight * 0.004;
        this.dimensions = null;
        this.initialDimensions = null;
    }

    renderBall(paddleDimensions, container) {
        const ball = document.createElement('div');
        ball.className = "ball";
        container.append(ball);
        this.vectx = 0;
        this.dimensions = new dimensions(ball);
        this.initialDimensions = {
            x: this.dimensions.x,
            y: this.dimensions.y,
            width: this.dimensions.width,
            height: this.dimensions.height,
            top: this.dimensions.top,
            right: this.dimensions.right,
            bottom: this.dimensions.bottom,
            left: this.dimensions.left,
        };

        this.dimensions.x = paddleDimensions.right - (paddleDimensions.width / 2) - (this.dimensions.width / 2);
        this.dimensions.y = paddleDimensions.top - this.dimensions.height - 2;
        this.dimensions.update({
            top: this.dimensions.y,
            left: this.dimensions.x,
            right: this.dimensions.x + this.dimensions.width,
            bottom: this.dimensions.y + this.dimensions.height,
        });

        ball.style.transform = `translate(${this.dimensions.x - this.initialDimensions.x}px, ${this.dimensions.y - this.initialDimensions.y}px)`;
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
        this.elem.style.transform = `translate(${this.dimensions.x - this.initialDimensions.x}px, ${this.dimensions.y - this.initialDimensions.y}px)`
    }

    reset(paddle) {
        this.dimensions.x = paddle.right - (paddle.width / 2) - (this.dimensions.width / 2);
        this.dimensions.y = paddle.top - this.dimensions.height - 2;

        this.elem.style.transform = `translate(${this.dimensions.x - this.initialDimensions.x}px, ${this.dimensions.y - this.initialDimensions.y}px)`
        this.vectx = 0;
        this.dimensions.update({
            left: this.dimensions.x,
            top: this.dimensions.y,
            right: this.dimensions.x + this.dimensions.width,
            bottom: this.dimensions.y + this.dimensions.height,
        });
    }
}