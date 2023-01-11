import React, {useState} from "react";

export const useModalState = (defaultState: boolean = false): [boolean, () => void] => {
    const [state, setState] = useState<boolean>(defaultState);
    const toggle = () => {
        setState(prevState => !prevState);
    }
    return [state, toggle];
}