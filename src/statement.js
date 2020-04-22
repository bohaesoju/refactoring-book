import createStatementData from './createStatementData';
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
    return renderPlainText(createStatementData(invoice, plays));
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
