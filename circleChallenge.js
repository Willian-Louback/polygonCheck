const dataChange = document.querySelector("#dataChange");
const dataFixed = document.querySelector("#dataFixed");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.style.backgroundColor = "#FF0043";

canvas.width = windowWidth;
canvas.height = windowHeight;

const height = 100;
const width = 100;
const centerX = (windowWidth / 2 - width / 2);
const centerY = (windowHeight / 2 - height / 2);
const lados = 100;
const raio = 100;
const velocidade = 400;

dataFixed.innerText = `Raio: ${raio}`;

const gerarCircle = (lados = lados) => {
    let x = 0;
    for(let i = 1; i <= lados; i++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
           /* ctx.beginPath();
            ctx.arc(centerX, centerY, raio, 0, 2 * Math.PI);
            ctx.stroke();*/

            /*ctx.beginPath();
            ctx.arc(centerX, centerY - 100, 100, 0, 2 * Math.PI);
            ctx.stroke();*/

            /*ctx.beginPath();
            ctx.arc(centerX, centerY + 100, 100, 0, 2 * Math.PI);
            ctx.stroke();*/

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
            dataChange.innerText = `Lados: ${i}\nPerímetro: ${tamanhoLado * i}\nTesteDePi: ${(tamanhoLado * i) / raio / 2}`;
            x++;
        }, i * velocidade);
    }
}

const draw = (i) =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    dataChange.innerText = `Lados: ${i}\nPerímetro: ${tamanhoLado * i}\nTesteDePi: ${(tamanhoLado * i) / raio / 2}`;
}

document.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputLados = parseInt(formData.get("lados"));
    const automatizar = formData.get("automatizar");
    console.log(automatizar)
    if(!automatizar) {
        draw(inputLados);
    } else {
        gerarCircle(inputLados);
    }
}

//gerarCircle();
//draw(lados);