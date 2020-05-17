export function reportYoungestAgeAndTotalSalary(people){
    // return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

    // function totalSalary(){
    //     return people.reduce((total, person) => total + person.salary, 0)
    // }

    // function youngestAge(){
    //     return Math.min(...people.map(p => p.age));
    // }

    // const totalSalary = () => {
    //     let totalSalary = 0;
    //     for (const p of people){
    //         totalSalary += p.salary;
    //     }
    //     return totalSalary;
    // }

    const totalSalary = () => {
        return people.reduce((total, person) => total + person.salary, 0)
    }

    // const youngestAge = () =>{
    //     let youngest = people[0] ? people[0].age : Infinity;
    //     for (const p of people){
    //         if(p.age < youngest) youngest = p.age;
    //     }
    //     return youngest;
    // }

    function youngestAge(){
        return Math.min(...people.map(p => p.age));
    }

    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;
}

