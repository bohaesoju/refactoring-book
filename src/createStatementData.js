export default function createStatementData(invoice, plays) {

    class PerformanceCalculator {
        constructor(aPerformance, aPlay){
            this.performances = aPerformance;
            this.play = aPlay;
        }
        get amount(){
            throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
        }

        get volumeCredits(){
            return Math.max(this.performances.audience - 30, 0); 
        }
    }

    class TragedyCalculator extends PerformanceCalculator{
        get amount(){
            let result = 40000;
            if(this.performances.audience > 30){
                result += 1000 * (this.performances.audience - 30);
            }
            return result;
        }
    }

    class ComedyCalculator extends PerformanceCalculator{
        get amount(){
            let result = 30000;
            if(this.performances.audience > 20){
                result += 10000 + 500 * (this.performances.audience - 20);
            }    
            result += 300 * this.performances.audience;
            return result;
        }
        get volumeCredits(){
            return super.volumeCredits + Math.floor(this.performances.audience / 5);
        }
    }

    const createPerformanceCalculator = (aPerformance, aPlay) => {
        switch(aPlay.type){
            case "tragedy" : return new TragedyCalculator(aPerformance, aPlay);
            case "comedy" : return new ComedyCalculator(aPerformance, aPlay);
            default:
                throw new Error(`알 수 없는 장르: ${aPlay.type}`);
        }
    }


    const playFor = (aPerformance) => {
        return plays[aPerformance.playID];
    }

    const totalVolumeCredits =(data) => {
        return data.performances.reduce((total, p) => 
            total + p.volumeCredits, 0);
    }

    const totalAmount = (data) => {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    const enrichPerformance = (aPerformance) => {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance); //얕은 복사 수행
        result.play = calculator.play;  //중간 데이터에 연극 정보를 저장
        result.amount = calculator.amount;  //amountFor() 대신 계산기의 함수 이용
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    const result = {};
    result.customer = invoice[0].customer;
    result.performances = invoice[0].performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
}