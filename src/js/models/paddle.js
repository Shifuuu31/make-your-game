import { dimensions } from "./dimensions.js";

export class Paddle {
    constructor(containerDimensions, container) {
        this.paddle = null;
        this.border = window.innerHeight * 0.005;
        this.dimensions = null;
        this.containerDimensions = containerDimensions;
        this.renderPaddle(containerDimensions, container);
    }

    renderPaddle(containerDimensions, container) {
        const paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);

        this.dimensions = new dimensions(paddle);

        const newx = (containerDimensions.right - (containerDimensions.width / 2)) - (this.dimensions.width / 2);
        const newy = (containerDimensions.bottom - this.dimensions.height) - window.innerHeight * 0.01;

        this.dimensions.update({
            x: newx,
            y: newy,
            left: newx,
            top: newy,
            right: newx + this.dimensions.width,
            bottom: newy + this.dimensions.height,
        });

        paddle.style.left = `${newx}px`;
        paddle.style.top = `${newy}px`;

        this.paddle = paddle;
    }


    moveRight(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;
        const moveStep = (window.innerWidth * 40) / 2700;

        if (this.dimensions.x < containerRect.right - paddleWidth) {
            this.dimensions.x += moveStep;

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
        const moveStep = (window.innerWidth * 40) / 2700;

        if (this.dimensions.x > containerRect.left) {
            this.dimensions.x -= moveStep;

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
            default:
                break;
        }
    };

}
