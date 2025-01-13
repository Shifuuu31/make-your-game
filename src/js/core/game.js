import { Ball } from "/src/js/models/ball.js";
import { Brick } from "/src/js/models/brick.js";
import { dimensions } from "/src/js/models/dimensions.js";
import { Paddle } from "/src/js/models/paddle.js";
import { levels } from "/src/js/core/levels.js";

export class Game {
    constructor(isPortrait) {
        this.chrono = 0;
        this.lastTime = 0;
        this.timeAccumulator = 0;
        this.isPaused = false;
        this.bricksLive = [];
        this.currentLevel = 0;
        this.player = null;
        this.time = document.querySelector('.time');
        this.container = document.querySelector('.container');
        this.ContainerDimensions = new dimensions(this.container);
        this.gameContainer = document.querySelector('.game-container');
        this.gameContainerDimensions = new dimensions(this.gameContainer);
        this.score = document.querySelector('.score');
        this.level = document.querySelector('.level');
        this.livesContainer = document.querySelector('.lives-container');
        this.gameContainer = document.querySelector('.game-container');
        this.containerdimension = new dimensions(this.gameContainer);
        this.bricksContainer = document.querySelector('.bricks-container');
        this.overlay = document.querySelector('.overlay');
        this.paddle = new Paddle(isPortrait, this.gameContainerDimensions, this.gameContainer);
        this.ball = new Ball(isPortrait);
        this.ball.renderBall(this.paddle.dimensions, this.gameContainer);
    }

    setup() {
        this.updateHeader();
        this.setupbricks();
    }

    setupbricks() {
        const board = levels[this.currentLevel];
        for (let row of board) {
            for (let brickType of row) {
                if (brickType === 0) {
                    const brick = new Brick();
                    const brickelem = brick.renderBrick();
                    brick.type = brickType;
                    this.bricksContainer.appendChild(brickelem);
                    brick.dimension = new dimensions(brickelem);
                    brickelem.classList.add('hidden');
                    continue;
                };
                const brick = new Brick();
                const brickelem = brick.renderBrick();
                brick.type = brickType;
                this.bricksContainer.appendChild(brickelem);
                brick.dimension = new dimensions(brickelem);
                this.bricksLive.push(brick);
            }
        }
    }

    collisionswithcontainer() {
        const containerRect = this.gameContainerDimensions;
        const ball = this.ball;
        let border = 0.005 * window.innerHeight;

        if (ball.dimensions.x + ball.dimensions.width >= containerRect.right - border) {
            ball.vectx = -Math.abs(ball.vectx);
        }

        if (ball.dimensions.x <= containerRect.left + border) {
            ball.vectx = Math.abs(ball.vectx);
        }

        if (ball.dimensions.y <= containerRect.top + border) {
            ball.vecty = Math.abs(ball.vecty);
        }

        if (ball.dimensions.y + ball.dimensions.width >= containerRect.bottom - border) {
            this.player.lives--;
            this.ball.reset(this.paddle.dimensions);
            this.isPaused = true;
        }

        ball.move();

    }

    collisionWithPaddle() {
        const ballDimensions = this.ball.dimensions;
        const ball = this.ball;
        const paddleDimensions = this.paddle.dimensions;

        const ballRadius = ballDimensions.width / 2;

        const ballCenterX = ballDimensions.left + ballRadius;


        if (ballDimensions.right >= paddleDimensions.left &&
            ballDimensions.left <= paddleDimensions.right &&
            ballDimensions.bottom >= paddleDimensions.top &&
            ballDimensions.top <= paddleDimensions.bottom) {

            const paddleCenter = paddleDimensions.left + (paddleDimensions.width / 2);
            const hitOffset = ballCenterX - paddleCenter;
            const normalizedHitOffset = hitOffset / (paddleDimensions.width / 2);

            const hypotenuse = Math.sqrt(ball.vectx * ball.vectx + ball.vecty * ball.vecty);
            const maxBounceAngle = Math.PI / 3;

            const bounceAngle = normalizedHitOffset * maxBounceAngle;

            if (bounceAngle == 0) {
                const variation = (Math.random() - 0.5) * 0.2;
                ball.vectx += Math.random() < 0.5 ? -variation : variation;
            }


            ball.vectx = hypotenuse * Math.sin(bounceAngle);
            ball.vecty = -ball.vecty;
        }
        ball.move();

    }

    collisionWithBricks() {
        const ball = this.ball;
        this.bricksLive.forEach((brick, index) => {
            const brickRect = brick.dimension;
            if (
                ball.dimensions.right >= brickRect.left &&
                ball.dimensions.left <= brickRect.right &&
                ball.dimensions.bottom >= brickRect.top &&
                ball.dimensions.top <= brickRect.bottom
            ) {
                this.player.score += 10;
                const overlapLeft = Math.abs(ball.dimensions.right - brickRect.left);
                const overlapRight = Math.abs(ball.dimensions.left - brickRect.right);
                const overlapTop = Math.abs(ball.dimensions.bottom - brickRect.top);
                const overlapBottom = Math.abs(ball.dimensions.top - brickRect.bottom);
                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if (minOverlap === overlapTop) {
                    ball.vecty = -Math.abs(ball.vecty);
                } else if (minOverlap === overlapBottom) {
                    ball.vecty = Math.abs(ball.vecty);
                } else if (minOverlap === overlapLeft) {
                    ball.vectx = -Math.abs(ball.vectx);
                } else if (minOverlap === overlapRight) {
                    ball.vectx = Math.abs(ball.vectx);
                }

                this.bricksLive.splice(index, 1);
                brick.elem.classList.add('hidden');
            }
        });
        ball.move();
    }

    gameResult(resultMessage) {
        this.isPaused = true;
        this.stopChrono();
        let dashbord = document.getElementById('game-result-dashboard');
        let score = dashbord.querySelector('.game-result-score');
        let resultMessageElem = dashbord.querySelector('.game-result-message');
        let gameTime = dashbord.querySelector('.game-result-time');
        let level = dashbord.querySelector('.game-result-level');
        let topLevel = dashbord.querySelector('.game-result-top-level');
        resultMessageElem.textContent = resultMessage;
        level.textContent = `${this.currentLevel + 1}`;
        topLevel.textContent = `${this.player.topLevel + 1}`;
        score.textContent = `${this.player.score}`;
        gameTime.textContent = `${Math.floor(this.chrono / 60).toString().padStart(2, '0')}:${(this.chrono % 60).toString().padStart(2, '0')}`;
        dashbord.classList.replace('hiddenStop', 'shown');
        this.overlay.classList.replace('hiddenStop', 'shown');
    }

    updateHeader() {
        this.livesContainer.textContent = "💙".repeat(this.player.lives)
        this.time.textContent = `TIME: ${Math.floor(this.chrono / 60).toString().padStart(2, '0')}:${(this.chrono % 60).toString().padStart(2, '0')}`;
        this.score.textContent = `SCORE: ${this.player.score}`;
        this.level.textContent = `LEVEL: ${this.currentLevel + 1}`;

    }

    isWin() {
        return this.bricksLive.length === 0;
    }



    updateChrono(currentTime) {
        if (!this.lastTime) {
            this.lastTime = currentTime;
            return;
        }

        const deltaTime = currentTime - this.lastTime;
        this.timeAccumulator += deltaTime;

        if (this.timeAccumulator >= 1000) {
            this.chrono++;
            this.timeAccumulator -= 1000;
        }

        this.lastTime = currentTime;
    }

    stopChrono() {
        this.lastTime = null;
        this.timeAccumulator = 0;
    }
}

