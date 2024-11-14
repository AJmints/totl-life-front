import { CapacityMinMax } from "@/lib/types/form-helpers/formHelperTypes"

export const capacityOptions = (nums: CapacityMinMax) => {
    let capacity = []
    for (let i = nums.min; i <= nums.max; i++) {
        capacity.push(<option key={i} value={i}>{i}</option>)
    }
    return capacity
}
