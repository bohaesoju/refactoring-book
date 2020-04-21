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
        switch(playFor(aPerformance).type){
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)    
        }
        return result;  // 함수 안에서 값이 바뀌는 변수 반환
    }

    const volumeCreditsFor = (aPerformance) => {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        //희극 관객 5명 마다 추가 포인트를 제공한다.
        if("comedy" === playFor(aPerformance).type) 
        result += Math.floor(aPerformance.audience / 5);
        return result;    
    }

    const usd = (aNumber) => {
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD',
            minimumFractionDigits: 2}).format(aNumber/100);
    }
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;

    for(let perf of invoice[0].performances){
        volumeCredits += volumeCreditsFor(perf);
        let thisAmount = amountFor(perf);

        //청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }
    result += `총액: ${usd(totalAmount)}\n`
    result +=  `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

statement(invoicesJson, playsJson);
console.log(statement(invoicesJson, playsJson)); 
