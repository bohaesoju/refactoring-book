import { expect } from 'chai';
import { printOwing } from '../src/PrintOwing';

const Clock = {
    today: {
        getFullYear(){
            return 2000;
        },

        getMonth() {
            return 0;
        },

        getDate(){
            return 1;
        }
    }
};

class Console {
    constructor(){
        this._content = "";
    }

    log(content){
        this._content += content + "\n";
    }

    get content(){
        return this._content;
    }
}

describe('PrintOwing', () => {
    it('should print owing', () => {
        const invoice = {
            "orders": [
                {"amount": 1}
            ],
            "customer": "JL"
        };
        const console = new Console();

        let expected = `***********************
    **** Customer Owes ****
    ***********************
    name: JL
    amount: 1
    due: 1/31/2000`
            // "name: JL\n" +
            // "amount: 1\n" +
            // "due: 1/31/2000\n";

        // printOwing(invoice, console, Clock);
        
        expect(printOwing(invoice)).to.equal(expected);
        // expect(console.content).to.equal(expected);
    });
});
