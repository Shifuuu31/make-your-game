import { dimensions } from "/src/js/models/dimensions.js";

export class Paddle {
    constructor(isPortrait, containerDimensions, container) {
        this.paddle = null;
        this.moveStep = isPortrait ? window.innerWidth * 0.03 : window.innerHeight * 0.03;
        this.border = window.innerHeight * 0.005;
        this.initialDimensions = null;
        this.dimensions = null;
        this.containerDimensions = containerDimensions;
        this.renderPaddle(container);
    }

    renderPaddle(container) {
        const paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);

        this.dimensions = new dimensions(paddle);
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
        this.paddle = paddle;

        this.reset();
    }

    reset() {
        this.dimensions.x =  (this.containerDimensions.right - (this.containerDimensions.width / 2)) - (this.initialDimensions.width / 2);
        this.dimensions.y =  ((this.containerDimensions.bottom - this.initialDimensions.height) - window.innerHeight * 0.01);
        const newX = this.dimensions.x - this.initialDimensions.x;
        const newY = this.dimensions.y - this.initialDimensions.y;
        this.paddle.style.transform = `translate(${newX}px , ${newY}px)`;
        this.dimensions.update({
            left: this.dimensions.x ,
            top: this.dimensions.y ,
            right: this.dimensions.x + this.dimensions.width,
            bottom: this.dimensions.y + this.dimensions.height
        });
    }

    moveRight(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;
        const newY = this.dimensions.y - this.initialDimensions.y;
        if (this.dimensions.x < containerRect.right - paddleWidth) {
             this.dimensions.x += this.moveStep;
            const newX = Math.min(this.dimensions.x , containerRect.right - paddleWidth);
            const translatex = newX - this.initialDimensions.x;
            this.paddle.style.transform = `translate(${translatex}px , ${newY}px)`;
            this.dimensions.update({
                x: newX,
                left: newX,
                right: newX + paddleWidth,
            });
        }
    }

    moveLeft(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;
        const newY =this.dimensions.y - this.initialDimensions.y;
        if (this.dimensions.x > containerRect.left) {
              this.dimensions.x -= this.moveStep;

            const newX = Math.max(this.dimensions.x, containerRect.left + this.border);
            const translatex = newX - this.initialDimensions.x;

            this.paddle.style.transform = `translate(${translatex}px , ${newY}px)`;

            this.dimensions.update({
                x: newX,
                left: newX,
                right: newX + paddleWidth,
            });
        }
    }

    keyDownHandler = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                this.moveLeft(this.containerDimensions);
                break;
            case "ArrowRight":
                this.moveRight(this.containerDimensions);
                break;
        }
    };
}
