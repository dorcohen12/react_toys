import { useState } from "react";

export function useToggle(initialVal) {

    const [isOn, setIsOn] = useState(initialVal)

    function toggle(_isOn) {
        if (typeof _isOn === 'boolean') {
            setIsOn(_isOn)
        } else {
            setIsOn(isOn => !isOn)
        }
    }

    return [isOn, toggle]
}