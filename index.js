const { Decimal } = require("decimal.js");

Decimal.set({ precision: 500 });

const lados = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
const raio = new Decimal(100);
const pi = Decimal.acos(-1);
const dois = new Decimal(2);

const gerarCircle = () => {
    for(let ladosT = 1; ladosT <= lados; ladosT++) {
        //setTimeout(() => {
            const i = new Decimal(ladosT);
            const angulo = new Decimal(pi.dividedBy(i))
            const seno = angulo.sin();
            const tamanhoLado = dois.times(raio).times(seno);
            const perimetro = tamanhoLado.times(i);
            const piTest = perimetro.dividedBy(raio).dividedBy(dois);

            //console.log(`Lados: ${i}\nPerímetro: ${perimetro}\nTesteDePi: ${piTest}`);
            console.log(`Lados: ${i}\nTesteDePi: ${piTest}`);
        //}, i * 10);
    }
}

const draw = (ladosT) =>{
    const i = new Decimal(ladosT);
    const angulo = new Decimal(pi.dividedBy(i))
    const seno = angulo.sin();
    const tamanhoLado = dois.times(raio).times(seno);
    const perimetro = tamanhoLado.times(i);
    const piTest = perimetro.dividedBy(raio).dividedBy(dois);
    const piReal = `3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146`;
    const teste = piTest.toString().includes(piReal);

    console.log(`Lados: ${i}\nPerímetro: ${perimetro}\nTesteDePi: ${piTest}`);
    console.log(teste, piReal.length)
}

gerarCircle();
//draw(lados);