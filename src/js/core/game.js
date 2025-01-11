import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { dimensions } from "../models/dimensions.js";
import { Paddle } from "../models/paddle.js";
import { levels } from "./levels.js";

export class Game {
    constructor() {
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
        this.paddle = new Paddle(this.gameContainerDimensions, this.gameContainer);
        this.ball = new Ball();

        this.setupbricks();
        this.ball.renderBall(this.paddle.dimensions, this.gameContainer);
    }

    setup() {
        this.updateHeader();
    }

    setupbricks() {
        const board = levels[this.currentLevel];
        this.bricksLive = board.flatMap((row, i) =>
            row.map((brickType, j) => {
                if (brickType === 0) {
                    const brick = new Brick();
                    const brickelem = brick.renderBrick();
                    brick.type = brickType;
                    this.bricksContainer.appendChild(brickelem);
                    brick.dimension = new dimensions(brickelem);
                    brickelem.classList.add('hidden');
                    return null
                };
                const brick = new Brick();
                const brickelem = brick.renderBrick();
                brick.type = brickType;
                this.bricksContainer.appendChild(brickelem);
                brick.dimension = new dimensions(brickelem);
                return brick;
            }).filter(brick => brick !== null)
        );
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
        const ballElem = this.ball.dimensions;
        const ball = this.ball;
        const paddleDimensions = this.paddle.dimensions;

        const ballRadius = ballElem.width / 2;

        const ballCenterX = ballElem.left + ballRadius;
        const ballCenterY = ballElem.top + ballRadius;

        const ballLeft = ballCenterX - ballRadius;
        const ballRight = ballCenterX + ballRadius;
        const ballTop = ballCenterY - ballRadius;
        const ballBottom = ballCenterY + ballRadius;

        if (ballRight >= paddleDimensions.left &&
            ballLeft <= paddleDimensions.right &&
            ballBottom >= paddleDimensions.top &&
            ballTop <= paddleDimensions.bottom) {

            const paddleWidth = paddleDimensions.right - paddleDimensions.left;
            const paddleCenter = paddleDimensions.left + (paddleWidth / 2);
            const hitOffset = ballCenterX - paddleCenter;
            const normalizedHitOffset = hitOffset / (paddleWidth / 2);

            const baseSpeed = Math.sqrt(ball.vectx * ball.vectx + ball.vecty * ball.vecty);
            const maxBounceAngle = Math.PI / 3;

            const bounceAngle = normalizedHitOffset * maxBounceAngle;

            ball.vectx = baseSpeed * Math.sin(bounceAngle);
            ball.vecty = -ball.vecty;

            if (this.paddle.velocity) {
                ball.vectx += this.paddle.velocity * 0.2;
            }

            const variation = (Math.random() - 0.5) * 0.2;
            ball.vectx += variation;

            const minVerticalSpeed = baseSpeed * 0.5;
            if (Math.abs(ball.vecty) < minVerticalSpeed) {
                ball.vecty = ball.vecty > 0 ? minVerticalSpeed : -minVerticalSpeed;
            }

            ball.elem.style.top = (paddleDimensions.top - ballElem.height - 1) + 'px';
        }

        ball.move();
    }

    collisionWithBricks() {
        const ballElem = this.ball.dimensions;
        const ball = this.ball;
        const ballRadius = ballElem.width / 2;
        const ballCenterX = ballElem.left + ballRadius;
        const ballCenterY = ballElem.top + ballRadius;

        this.bricksLive.forEach((brick, index) => {
            const brickRect = brick.dimension;
            if (
                ballCenterX + ballRadius >= brickRect.left &&
                ballCenterX - ballRadius <= brickRect.right &&
                ballCenterY + ballRadius >= brickRect.top &&
                ballCenterY - ballRadius <= brickRect.bottom
            ) {
                this.player.score += 10;
                const overlapLeft = Math.abs(ballCenterX + ballRadius - brickRect.left);
                const overlapRight = Math.abs(ballCenterX - ballRadius - brickRect.right);
                const overlapTop = Math.abs(ballCenterY + ballRadius - brickRect.top);
                const overlapBottom = Math.abs(ballCenterY - ballRadius - brickRect.bottom);
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

    gameover() {
        this.isPaused = true;
        let dashbord = document.getElementById('game-result-dashboard');
        let score = dashbord.querySelector('.game-result-score');
        score.textContent = `Score: ${this.player.score}`;
        dashbord.classList.replace('hiddenStop', 'shown');
        this.overlay.classList.replace('hiddenStop', 'shown');
    }

    updateHeader() {
        this.livesContainer.textContent = '💙'.repeat(this.player.lives);;
        this.time.textContent = `time: ${Math.floor(this.chrono / 60)}:${(this.chrono % 60).toString().padStart(2, '0')}`;
        this.score.textContent = `Score: ${this.player.score}`;
        this.level.textContent = `Level: ${this.currentLevel}`;

    }
    
    isWin() {
        return this.bricksLive.length === 0;
    }

    listenertoreseize() {
        const reloadOnResize = debounce(() => {
            window.location.reload();
        }, 200);

        window.addEventListener('resize', (event) => {
            reloadOnResize();
        });
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

function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
