export type GearItem = {
    crand : string,
    category : string,
    extraInfo : string,
    height : number,
    id : number,
    length : number,
    model : string,
    powerSource : string,
    rating : string,
    size : string,
    storage : string,
    type : string,
    userScore : number,
    weight : number,
    width : number
}

export type UserGearItem = {
    additionalDetails : string,
    dateCreated : string,
    forSale : boolean,
    gearItem : GearItem[],
    hidden : boolean,
    id : number,
    itemCondition : string
    lendable : boolean,
    price : number,
    quantity : number
}