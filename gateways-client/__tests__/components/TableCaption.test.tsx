import * as React from "react";
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {TableCaption} from "../../src/components/TableCaption/TableCaption";

describe("TableCaption tests", () => {

    const defaultProps = {
        caption: "test-caption",
        onAddClick: jest.fn(),
        onDeleteClick: jest.fn(),
        isAddDisabled: false,
        isDeleteDisabled: false,
    }

    function setUp(props = defaultProps) {
        return render(<TableCaption {...props}/>)
    }

    it('Should return appropriate markup', function () {
        const {getByText} = setUp()
        expect(getByText("test-caption")).toBeInTheDocument();
        expect(getByText("Add")).toBeInTheDocument();
        expect(getByText("Delete")).toBeInTheDocument();
    });

    it('Buttons should be disabled', function () {
        const {getByText} = setUp({...defaultProps, isAddDisabled: true, isDeleteDisabled: true})
        expect(getByText("Add")).toBeDisabled();
        expect(getByText("Delete")).toBeDisabled();
    });

    it('Should call callbacks when click on buttons', async function () {
        const addClickCb = jest.fn();
        const deleteClickCb = jest.fn();
        const {getByText} = setUp({...defaultProps, onAddClick: addClickCb, onDeleteClick: deleteClickCb})

        await userEvent.click(getByText("Add"));
        await expect(addClickCb).toHaveBeenCalledTimes(1);

        await userEvent.click(getByText("Delete"))
        await expect(deleteClickCb).toHaveBeenCalledTimes(1)
    });

})