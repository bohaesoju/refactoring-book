export function readingsOutsideRange(station, range){
// export function readingsOutsideRange(station, range){
    return station.readings.
        // filter(r => !range.contains(r.temp));
        // filter(r => r.temp < range.min || r.temp > range.max);
        filter(r => !range.contains(r.temp));
}

export class NumberRange {
    constructor(min, max){
        this._data = { min: min, max: max };
    }
    get min(){ return this._data.min }
    get max(){ return this._data.max }

    contains(aNumber) { return (aNumber >= this.min && aNumber <= this.max);}
}