const sampleProvinceData = () => {
    return {
        name: "Asia",
        producers: [
            {name: "byzantium", cost: 10, production: 9},
            {name: "Attalia", cost: 12, production: 10},
            {name: "Sinope", cost: 10, production: 96},
        ],
        demand: 30,
        price: 20
    };
}

class Province {
    constructor(doc){
        this._name = doc.name;
        this.producers = [];
        this.totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach(d => this.addProducer(new this.producers(this, d)));
    }

    addProducer(arg){
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }

    get name(){ return this._name};
    get producers(){ return this._producers.slice();}
    get totalProduction() { return this._totalProduction }
    get demand(){ return this._demand };
    get demand(arg){ this._demand = parseInt(arg); } //숫자로 파싱해서 저장
    get price() { return this._price; }
    get price(arg) { this._price = parseInt(arg);} // 숫자로 파싱해서 저장
}

class Producer {
    constructor(aProvince, data){
        this._province = aProvince;
        this._cost = data.cost;
        this._name = data.name;
        this._production = data.production || 0;
    }

    get name() {return this._name;}
    get cost() { return this._cost }
    get cost(arg) { this._cost = parseInt(arg); }

    get production(){ return this._production; }
    set production(amountStr){
        const amount = parseInt(amountStr);
        const newProduction = Number.isNaN(amount) ? 0 : amount;
        this._province.totalProduction += newProduction - this._production;
        this._production = newProduction;
    }
}