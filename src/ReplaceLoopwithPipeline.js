// export function acquireData(input){
//     const lines = input.split("\n");
//     return lines.splice(1)
//         .filter(line => line.trim() !== "")
//         .map(line => line.split(","))
//         .filter(lineItems => lineItems[1].trim() === "India")
//         .map(lineItems => ({city: lineItems[0].trim(), phone: lineItems[2].trim()}));
// }

export function acquireData(input){
    const lines = input.split("\n"); //컬렉션
    return lines
            .slice  (1)
            .filter (line => line.trim() !== "")
            .map    (line => line.split(","))
            .filter (record => record[1].trim() === "India")
            .map    (record => ({city:record[0].trim(), phone: record[2].trim()}))
            ;
}