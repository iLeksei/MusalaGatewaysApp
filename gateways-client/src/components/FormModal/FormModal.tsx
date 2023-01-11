import React from "react";
import {Modal} from "react-bootstrap";

interface IProps {
    title: string,
    show: boolean,
    children: JSX.Element | JSX.Element[],
    onClose?: () => any,
}

export const FormModal = (props: IProps): JSX.Element => {
    return (
        <Modal
            centered
            show={props.show}
        >
            <Modal.Header closeButton onHide={props.onClose}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.children
                }
            </Modal.Body>
        </Modal>
    );
}