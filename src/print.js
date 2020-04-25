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

const invoice = {
    "orders": [
        {"amount": 1}
    ],
    "customer": "JL"
};

const printOwing = (invoice) => {
    console.log('invoice', `${invoice.customer}`)
    const printDetails = () => {
        return `name: ${invoice.customer}`;     
        // console.log(`amount: ${outstanding}`);     
        // console.log(`due: ${invoice.dueDate.toLocaleDateString("en-US")}`);     
     }
     const printBanner = (invoice) => {
        return `***********************
    **** Customer Owes ****
    ***********************
    name: JL`
    // name: ${invoice.customer}`
    }
    // let outstanding = 0;


    //미해결 채무(outstanding)를 계산한다.
    // for(const o of invoice.orders){
    //     outstanding += o.amount;
    // }

    // 마감일(dueDate)를 계산한다.
    // const today = Clock.today;
    // invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
    //     today.getDate() + 30);
    return printBanner();

    printDetails();
}

printOwing(invoice)


