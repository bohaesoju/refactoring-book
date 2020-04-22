export default function createStatementData(invoice, plays) {
    const playFor = (aPerformance) => {
        return plays[aPerformance.playID];
    }
    const amountFor = (aPerformance, play) => {  //값이 바뀌지 않는 변수는 매개변수로 전달
        let result = 0;   // 명확한 이름으로 변경
        switch(aPerformance.play.type){
            case "tragedy": 
                result = 4000;
                if(aPerformance.audience > 30){
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if(aPerformance.audience > 20){
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }    
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)    
        }
        return result;  // 함수 안에서 값이 바뀌는 변수 반환
    }

    const volumeCreditsFor = (aPerformance) => {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        //희극 관객 5명 마다 추가 포인트를 제공한다.
        if("comedy" === aPerformance.play.type) 
        result += Math.floor(aPerformance.audience / 5);
        return result;    
    }

    const totalVolumeCredits =(data) => {
        return data.performances.reduce((total, p) => 
            total + p.volumeCredits, 0);
    }

    const totalAmount = (data) => {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    const enrichPerformance = (aPerformance) => {
        const result = Object.assign({}, aPerformance); //얕은 복사 수행
        result.play = playFor(result);  //중간 데이터에 연극 정보를 저장
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    const result = {};
    result.customer = invoice[0].customer;
    result.performances = invoice[0].performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
}