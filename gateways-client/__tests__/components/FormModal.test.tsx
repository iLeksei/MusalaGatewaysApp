import * as React from "react";
// @ts-ignore
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {FormModal} from "../../src/components/FormModal/FormModal";

describe("FormModal tests", () => {

    const defaultProps = {
        title: "test-modal",
        show: true,
        children: <div>test body</div>,
        onClose: jest.fn()
    }

    function setUp(props: any = defaultProps) {
        return render(<FormModal {...props}/>)
    }

    it('Should return modal markup', function () {
        let {getByText} = setUp()
        expect(getByText("test-modal")).toBeInTheDocument();
        expect(getByText("test body")).toBeInTheDocument();
    });

    it('should call onClose callback when close a modal', async function () {
        const onCloseCb = jest.fn();
        let {getByRole} = setUp({...defaultProps, onClose: onCloseCb});

        await userEvent.click(getByRole("button"));
        await expect(onCloseCb).toHaveBeenCalledTimes(1);
    });
})