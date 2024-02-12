const dataChange = document.querySelector("#dataChange");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const height = canvas.clientHeight;
const width = canvas.clientWidth;

canvas.width = width;
canvas.height = height;

const centerX = width / 2;
const centerY = height / 2;

let stop = false;
let angrA = [];
const timeout = [];

const drawCircle = (config) => {
    if(config.verify) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, config.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

const draw = (moveToX, moveToY, endX, endY) => {
    ctx.beginPath();
    ctx.moveTo(moveToX, moveToY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

const init = (config, sequence) => {
    stop = false;

    if(sequence === true) {
        for(let i = 2; i <= config.sides; i++) {
            timeout.push(setTimeout(() => {
                angrA = [];

                if(!config.viewAll) {
                    ctx.clearRect(0, 0, width, height);
                }

                drawCircle(config);

                const sideSize = calculate(config, i);

                dataChange.innerText = `
                        Raio: ${config.radius}
                        Lados: ${i}
                        Tamanho do lado (i): ${sideSize}
                        Perímetro: ${sideSize * i}
                        Teste de Pi: ${(sideSize * i) / config.radius / 2}
                `;
            }, (i - 2) * config.velocity));

            if(stop === true) {
                break;
            }
        }
    } else {
        angrA = [];

        ctx.clearRect(0, 0, width, height);

        drawCircle(config);

        const sideSize = calculate(config, config.sides);

        dataChange.innerText = `
            Raio: ${config.radius}
            Lados: ${config.sides}
            Tamanho do lado (i): ${sideSize}
            Perímetro: ${sideSize * config.sides}
            Teste de Pi: ${(sideSize * config.sides) / config.radius / 2}
        `;
    }

}

const calculate = (config, i) => {
    const grausRad = i % 2 === 0 ? - ((180 * (i - 2)) / i / 2) * (Math.PI / 180) : ((180 * (i - 2)) / i / 2) * (Math.PI / 180);

    let moveToX = centerX + config.radius * Math.cos(grausRad);
    let moveToY = centerY + config.radius * Math.sin(grausRad);

    let anteriorAngle = 0;

    const sideSize = (2 * config.radius * Math.sin(Math.PI/i));

    for(let j = (i + 1); j != 1; j--) {
        let angle = i % 2 !== 0 ? - ((180 * (i - 2)) / i) : ((180 * (i - 2)) / i);

        if(j <= i){
            if(i % 2 === 0) {
                angle = anteriorAngle + (360 / i);
            } else {
                angle = anteriorAngle + (angle * (i - 1));
            }

            if(angle > 360) {
                angle %= 360;
            }
        }

        anteriorAngle = angle;

        const angleRad = angle * (Math.PI / 180);

        angrA.push(angleRad);
    }

    let y = 0;

    for(let j = (i + 1); j != 1; j--) {
        if(j === i + 1) {
            y = 1;
        } else {
            y--;

            if(y < 0) {
                y = (i - 1);
            }
        }

        let endX = moveToX + parseFloat(sideSize) * Math.cos(angrA[y]);
        let endY = moveToY + parseFloat(sideSize) * Math.sin(angrA[y]);

        draw(moveToX, moveToY, endX, endY)

        moveToX = endX;
        moveToY = endY;
    }

    return sideSize;
}

document.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const automate = formData.get("automate");

    const config = {
        verify: formData.get("circleView"),
        sides: parseInt(formData.get("sides")),
        velocity: parseInt(formData.get("velocity")),
        radius: parseInt(formData.get("radius")),
        viewAll: formData.get("viewAllDraw")
    }

    stop = true;

    timeout.forEach(timeout => {
        clearTimeout(timeout);
    })

    ctx.clearRect(0, 0, width, height);

    if(!automate) {
        init(config, false);
    } else {
        init(config, true);
    }
}