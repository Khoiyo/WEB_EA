

class GrafikusElem {
    constructor(x, y, sebesseg) {
        this.x = x;
        this.y = y;
        this.sebesseg = sebesseg;
        this.element = document.createElement('div');
        this.element.className = 'pizza-graphic';
    }

    megjelenit(szulo) {
        szulo.appendChild(this.element);
        this.frissitPozicio();
    }

    frissitPozicio() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}


class HulloPizza extends GrafikusElem {
    constructor(x, y, sebesseg, nev) {
        super(x, y, sebesseg); 
        this.nev = nev;
        this.element.innerHTML = '🍕';
        this.element.title = nev;
    }

    
    mozgas() {
        this.y += this.sebesseg;
        if (this.y > 400) {
            this.y = -50; 
        }
        this.frissitPozicio();
    }
}


class JatekMotor {
    constructor() {
        this.elemek = [];
        this.container = document.getElementById('canvas-container');
        this.pizzak = ["Margaréta", "Hawaii", "Songoku", "Magyaros"]; 
    }

    ujPizza() {
        const x = Math.random() * (this.container.clientWidth - 40);
        const sebesseg = 1 + Math.random() * 3;
        const nev = this.pizzak[Math.floor(Math.random() * this.pizzak.length)];
        
        const pizza = new HulloPizza(x, 0, sebesseg, nev);
        pizza.megjelenit(this.container);
        this.elemek.push(pizza);
    }

    indit() {
        setInterval(() => {
            this.elemek.forEach(el => el.mozgas());
        }, 30);
    }
}

const motor = new JatekMotor();
motor.indit();

document.getElementById('add-graphic').addEventListener('click', () => {
    for(let i = 0; i < 5; i++) {
        motor.ujPizza();
    }
});
