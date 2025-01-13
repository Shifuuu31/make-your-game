import { dimensions } from "/src/js/models/dimensions.js";

export class Paddle {
    constructor(containerDimensions, container) {
        this.paddle = null;
        this.moveStep = (window.innerWidth * 40) / 2700;
        this.border = window.innerHeight * 0.005;
        this.dimensions = null;
        this.containerDimensions = containerDimensions;
        this.renderPaddle(container);
    }

    renderPaddle(container) {
        const paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);


        this.dimensions = new dimensions(paddle);
        this.paddle = paddle;

        this.reset();

    }

    reset() {
        this.dimensions.x = (this.containerDimensions.right - (this.containerDimensions.width / 2)) - (this.dimensions.width / 2);
        this.dimensions.y = (this.containerDimensions.bottom - this.dimensions.height) - window.innerHeight * 0.01;
        this.paddle.style.left = `${this.dimensions.x}px`;
        this.paddle.style.top = `${this.dimensions.y}px`;
        this.dimensions.update({
            left: this.dimensions.x,
            top: this.dimensions.y,
            right: this.dimensions.x + this.dimensions.width,
            bottom: this.dimensions.y + this.dimensions.height,
        });
    }

    moveRight(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;

        if (this.dimensions.x < containerRect.right - paddleWidth) {
            this.dimensions.x += this.moveStep;

            const newX = Math.min(this.dimensions.x, containerRect.right - paddleWidth);
            this.paddle.style.left = `${newX}px`;

            this.dimensions.update({
                x: newX,
                left: newX,
                right: newX + paddleWidth,
            });
        }
    }


    moveLeft(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;

        if (this.dimensions.x > containerRect.left) {
            this.dimensions.x -= this.moveStep;

            const newX = Math.max(this.dimensions.x, containerRect.left + this.border);
            this.paddle.style.left = `${newX}px`;

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
