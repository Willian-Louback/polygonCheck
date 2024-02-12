// Esse código é para verificar via terminal o algoritmo

const { Decimal } = require("decimal.js");

Decimal.set({ precision: 500 });

const sides = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
const radius = new Decimal(100);
const pi = Decimal.acos(-1);
const two = new Decimal(2);

const generateCircle = () => {
    for(let i = 1; i <= sides; i++) {
            const j = new Decimal(i);
            const angle = new Decimal(pi.dividedBy(j))
            const sin = angle.sin();
            const sizeSide = two.times(radius).times(sin);
            const perimeter = sizeSide.times(j);
            const piTest = perimeter.dividedBy(radius).dividedBy(two);

            //console.log(`sides: ${i}\nPerímetro: ${perimeter}\nTesteDePi: ${piTest}`);
            console.log(`Lados: ${i}\nTesteDePi: ${piTest}`);
    }
}

const draw = (sidesT) => {
    const i = new Decimal(sidesT);
    const angle = new Decimal(pi.dividedBy(i))
    const sin = angle.sin();
    const sizeSide = two.times(radius).times(sin);
    const perimeter = sizeSide.times(i);
    const piTest = perimeter.dividedBy(radius).dividedBy(two);
    const piReal = `3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146`;
    const test = piTest.toString().includes(piReal);

    console.log(`Lados: ${i}\nPerímetro: ${perimeter}\nTesteDePi: ${piTest}`);
    console.log(test, piReal.length)
}

generateCircle();
// draw(sides);