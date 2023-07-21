const dataChange = document.querySelector("#dataChange");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

/*const windowWidth = window.innerWidth - 20;
const windowHeight = window.innerHeight - 10;

canvas.style.backgroundColor = "#FF0043";*/

const height = canvas.clientHeight;
const width = canvas.clientWidth;

canvas.width = width;
canvas.height = height;

const centerX = width / 2;
const centerY = height / 2;
let raio = 100;
let lados = 100;
let velocity = 2000;
let verify = false;
let stop = false;
let viewAll = false;
const timeout = [];

const drawCircle = (verify) => {
    if(verify) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, raio, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

const drawSequence = () => {
    let x = 0;
    stop = false;
    for(let i = 2; i <= lados; i++) {
        timeout.push(setTimeout(() => {
            if(!viewAll) {
                ctx.clearRect(0, 0, width, height);
            }
            drawCircle(verify);

            ctx.beginPath();
            const grausRad = i % 2 === 0 ? -((180 * (i - 2)) / i / 2) * (Math.PI / 180) : ((180 * (i - 2)) / i / 2) * (Math.PI / 180);
            let moveToX = centerX + raio * Math.cos(grausRad);
            let moveToY = centerY + raio * Math.sin(grausRad);

            let anguloAnterior = 0;

            const angrA = [];

            const tamanhoLado = (2 * raio * Math.sin(Math.PI/i));

            for(let j = (i + 1); j != 1; j--) {
                let angulo = i % 2 !== 0 ? -((180 * (i - 2)) / i) : ((180 * (i - 2)) / i);

                if(j <= i){
                    if(i % 2 === 0) {
                        angulo = anguloAnterior + (360 / i);
                    } else {
                        angulo = anguloAnterior + (angulo * (i - 1));
                    }

                    if(angulo > 360) {
                        angulo %= 360;
                    }

                    console.log(angulo, j)
                } else {
                    console.log(angulo, j)
                }
                anguloAnterior = angulo;

                const anguloRad = angulo * (Math.PI / 180);
                angrA.push(anguloRad);
            }

            let y = 0;

            for(let j = (i + 1); j != 1; j--) {
                if(j === i+1) {
                    y = 1;
                } else {
                    y--;
                    if(y < 0) {
                        y = (i - 1);
                    }
                }

                ctx.moveTo(moveToX, moveToY);
                let endX = moveToX + parseFloat(tamanhoLado) * Math.cos(angrA[y]);
                let endY = moveToY + parseFloat(tamanhoLado) * Math.sin(angrA[y]);

                moveToX = endX;
                moveToY = endY;

                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            dataChange.innerText =
                `   Raio: ${raio}
                    Lados: ${i}
                    Tamanho do lado (i): ${tamanhoLado}
                    Perímetro: ${tamanhoLado * i}
                    Teste de Pi: ${(tamanhoLado * i) / raio / 2}
                `;
            x++;
        }, (i - 2) * velocity));

        if(stop === true) {
            break;
        }
    }
}

const drawOne = (i) => {
    ctx.clearRect(0, 0, width, height);
    drawCircle(verify);

    ctx.beginPath();
    const grausRad = i % 2 === 0 ? -((180 * (i - 2)) / i / 2) * (Math.PI / 180) : ((180 * (i - 2)) / i / 2) * (Math.PI / 180);
    let moveToX = centerX + raio * Math.cos(grausRad);
    let moveToY = centerY + raio * Math.sin(grausRad);

    let anguloAnterior = 0;

    const angrA = [];

    const tamanhoLado = (2 * raio * Math.sin(Math.PI/i));

    for(let j = (i + 1); j != 1; j--) {
        let angulo = i % 2 !== 0 ? -((180 * (i - 2)) / i) : ((180 * (i - 2)) / i);

        if(j <= i){
            if(i % 2 === 0) {
                angulo = anguloAnterior + (360 / i);
            } else {
                angulo = anguloAnterior + (angulo * (i - 1));
            }

            if(angulo > 360) {
                angulo %= 360;
            }
        }

        anguloAnterior = angulo;

        const anguloRad = angulo * (Math.PI / 180);
        angrA.push(anguloRad);
    }

    let y = 0;

    for(let j = (i + 1); j != 1; j--) {
        if(j === i+1) {
            y = 1;
        } else {
            y--;
            if(y < 0) {
                y = (i - 1);
            }
        }

        ctx.moveTo(moveToX, moveToY);
        let endX = moveToX + parseFloat(tamanhoLado) * Math.cos(angrA[y]);
        let endY = moveToY + parseFloat(tamanhoLado) * Math.sin(angrA[y]);

        moveToX = endX;
        moveToY = endY;

        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    dataChange.innerText =
        `   Raio: ${raio}
            Lados: ${i}
            Tamanho do lado (i): ${tamanhoLado}
            Perímetro: ${tamanhoLado * i}
            Teste de Pi: ${(tamanhoLado * i) / raio / 2}
        `;
}

document.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const automatizar = formData.get("automatizar");
    verify = formData.get("circleView");
    lados = parseInt(formData.get("lados"));
    velocity = formData.get("velocity");
    raio = formData.get("raio");
    viewAll = formData.get("viewAllDraw");

    stop = true;

    timeout.forEach(timeout => {
        clearTimeout(timeout);
    })

    ctx.clearRect(0, 0, width, height);

    if(!automatizar) {
        drawOne(lados);
    } else {
        drawSequence();
    }
}