export { statement }

const playsJson =
{
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};

let  invoicesJson =
[
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }
];     

function statement(invoice, plays){
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
        let result = 0;
        for(let perf of data.performances){
            result += perf.volumeCredits;
        }
        return result;
    }

    const totalAmount = (data) => {
        let result = 0;
        for(let perf of data.performances){
            result += perf.amount
        }
        return result;
    }

    const enrichPerformance = (aPerformance) => {
        const result = Object.assign({}, aPerformance); //얕은 복사 수행
        result.play = playFor(result);  //중간 데이터에 연극 정보를 저장
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }
    const statementData = {};
    statementData.customer = invoice[0].customer;
    statementData.performances = invoice[0].performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlainText(statementData, plays);
}
const renderPlainText = (data, plays) => {    

    const usd = (aNumber) => {
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD',
            minimumFractionDigits: 2}).format(aNumber/100);
    }

    let result = `청구 내역 (고객명: ${data.customer})\n`;

    for(let perf of data.performances){
        //청구 내역을 출력한다.
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}\n`
    result +=  `적립 포인트: ${data.totalVolumeCredits}점\n`;
    return result;
}


statement(invoicesJson, playsJson)
