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
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;
    const format = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD',
    minimumFractionDigits: 2}).format;

    for(let perf of invoice[0].performances){
        const play = playFor(perf);
        let thisAmount = amountFor(perf, play);

        //포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);

        //희극 관객 5명 마다 추가 포인트를 제공한다.
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        //청구 내역을 출력한다.
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount / 100)}\n`
    result +=  `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

const amountFor = (aPerformance, play) => {  //값이 바뀌지 않는 변수는 매개변수로 전달
    let result = 0;   // 명확한 이름으로 변경
    switch(play.type){
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
            throw new Error(`알 수 없는 장르: ${play.type}`)    
    }
    return result;  // 함수 안에서 값이 바뀌는 변수 반환
}

statement(invoicesJson, playsJson);
console.log(statement(invoicesJson, playsJson)); 
