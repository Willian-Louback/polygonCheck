const canvas = document.querySelector("#canvas");

const context = canvas.getContext("2d");

const windowWidth = 1481;
const windowHeight = 741;

canvas.style.backgroundColor = "#FF0043";

canvas.width = windowWidth;
canvas.height = windowHeight;

const height = 100;
const width = 100;
const centerX = (windowWidth / 2 - width / 2);
const centerY = (windowHeight / 2 - height / 2);

const endAngle = 360 * Math.PI / 180;

context.beginPath();

context.arc(centerX, centerY, 100, 0, endAngle);

context.fillStyle = "blue";
context.fill();

context.stroke();

context.beginPath();

context.arc(centerX, centerY, 3, 0, Math.PI * 2);
context.fillStyle = "#000";
context.fill();