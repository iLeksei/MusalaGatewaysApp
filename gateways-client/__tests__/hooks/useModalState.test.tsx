import * as React from "react";
import {renderHook, act} from '@testing-library/react-hooks'

import {useModalState} from "../../src/hooks/useModalState";

describe("useModalState tests", () => {

    it('Should toggle state', function () {
            const {result} = renderHook(() => useModalState(false));
            let toggle = result.current[1];
            expect(result.current[0]).toBeFalsy();

            act(() => toggle())
            expect(result.current[0]).toBeTruthy();

            act(() => toggle())
            expect(result.current[0]).toBeFalsy();
    });
})