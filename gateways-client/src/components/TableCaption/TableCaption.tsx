import React from "react";
import {Button, ButtonGroup} from "react-bootstrap";

import "./styles.scss";

interface IProps {
    caption: string,
    onAddClick: () => void,
    onDeleteClick: () => void,
    isAddDisabled?: boolean,
    isDeleteDisabled: boolean,
}

export const TableCaption = (props: IProps) => {
    return (
        <div className="table-caption__container">
            <span className="table-caption__caption-text">{props.caption}</span>
            <ButtonGroup>
                <Button
                    variant="primary"
                    disabled={props.isAddDisabled}
                    onClick={props.onAddClick}
                >
                    Add
                </Button>
                <Button
                    variant="danger"
                    disabled={props.isDeleteDisabled}
                    onClick={props.onDeleteClick}
                >
                    Delete
                </Button>
            </ButtonGroup>
        </div>
    );
}