class Battle {
    opponent1;
    opponent2;
    
    constructor(opponent1, opponent2) {
        this.opponent1 = opponent1;
        this.opponent2 = opponent2;
    }

    start() {
        console.log(`***---BATTLE----***`);
        console.log(`In the lefthand corner we have...${this.opponent1.name}!`);
        console.log(`In the righthand corner we have...${this.opponent2.name}!`);
        console.log('Fight!');
        console.log(`-------------`);
    }

    end(winner) {
        console.log(`This fight is over...${winner} wins!`);
        this.opponent1 = null;
        this.opponent2 = null;
    }

    fighterStatus() {
        console.log(`${this.opponent1.name} has ${this.opponent1.health > 0 ? this.opponent1.health : 'no'} health remaining!`);
        console.log(`${this.opponent2.name} has ${this.opponent2.health > 0 ? this.opponent2.health : 'no'} health remaining!`);
        console.log(`-------------`);
        this.checkFightOver();
    }

    checkFightOver() {
        if(this.opponent1.health <= 0) {
            return this.end(this.opponent2.name);
        }
        if(this.opponent2.health <= 0) {
            return this.end(this.opponent1.name);
        }
        return false;
    }
}

class Warrior {
    name;
    health;
    strength;

    constructor(name, health, strength) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    hit(opponent, battle) {
        opponent.health -= this.strength;
        console.log(`${this.name} hit ${opponent.name}!`);
        battle.fighterStatus();
    }
}

let jamieLannister = new Warrior('Jamie Lannister', 100, 20);
let robbStark = new Warrior('Robb Stark', 80, 35);
let battle = new Battle(jamieLannister, robbStark);

battle.start();
jamieLannister.hit(robbStark, battle);
robbStark.hit(jamieLannister, battle);
jamieLannister.hit(robbStark, battle);
robbStark.hit(jamieLannister, battle);
jamieLannister.hit(robbStark, battle);
robbStark.hit(jamieLannister, battle);