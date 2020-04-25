export const printOwing = (invoice) => {
    const outstanding = calculateOutstanding(invoice);

    const printDetails = () => {
        return `name: ${invoice.customer}
    amount: ${outstanding}
    due: ${invoice.dueDate.toLocaleDateString("en-US")}`;       
     }
     const printBanner = () => {
        return `***********************
    **** Customer Owes ****
    ***********************
    ${printDetails()}`
    }

    recordDueDate(invoice);
    
    return printBanner();
}

const calculateOutstanding = (invoice) => {
    let result = 0;
    for(const o of invoice.orders){
        result += o.amount;
    }
    return result;
}

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

const recordDueDate = (invoice) => {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
        today.getDate() + 30);
}

// printOwing()