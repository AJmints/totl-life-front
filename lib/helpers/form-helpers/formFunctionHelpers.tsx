import { CapacityMinMax } from "@/lib/types/form-helpers/formHelperTypes"
import { stateCodes } from "@/lib/data/general-data/stateCodes"

export const capacityOptions = (nums: CapacityMinMax) => {
    let capacity = []
    for (let i = nums.min; i <= nums.max; i++) {
        capacity.push(<option key={i} value={i}>{i}</option>)
    }
    return capacity
}

export const stateCodeList = () => {
    let list = []
    for (let i = 0; i <= stateCodes.length; i++) {
        list.push(<option key={i} value={stateCodes[i]}>{stateCodes[i]}</option>)
    }
    return list
}