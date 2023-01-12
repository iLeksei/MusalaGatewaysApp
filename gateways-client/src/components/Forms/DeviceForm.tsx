import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";

import {Gateway} from "../../entities/Gateway";
import Validators from "../../utils/Validators";
import {getBaseUrl} from "../../utils/CommonUtils";

interface IProps {
    onSaveCb: () => void,
    selectedGateway: Gateway | null,
}

export const DeviceForm = (props: IProps): JSX.Element => {
    const [values, setValues] = useState({vendor: "", status: "ONLINE"})
    const [errors, setErrors] = useState<any>({vendor: null, status: null})

    const onSave = async () => {
        try {
            const violations = Validators.validateForm(values);
            if (Object.values(violations).filter(Boolean).length > 0) {
                setErrors(violations);
                return;
            }

            const requestInit: RequestInit = {
                method: "POST",
                body: JSON.stringify(values),
                headers: {"Content-Type": "application/json",}
            }
            const url: string = `${getBaseUrl()}/device/${props.selectedGateway?.serialNumber}`;
            const response = await fetch(url, requestInit);
            if (!response.ok) {
                let result = await response.json();
                if (typeof result === "object" && result["Device"]) {
                    setErrors(result);
                }
                return;
            }
            props.onSaveCb();
        } catch (err) {
            setErrors({Device: "Something goes wrong :( Please connect with administrator!"});
        }
    }

    const onChange = (e: any) => {
        if (!e.target?.name) return;
        let inputName = e.target.name;
        let value = e.target.value || "";
        if (errors[inputName] !== null) {
            setErrors((prev: any) => ({...prev, [inputName]: null}));
        }
        setValues(prev => ({...prev, [inputName]: value}))
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Vendor:</Form.Label>
                <Form.Control
                    name="vendor"
                    type="text"
                    placeholder="Vendor..."
                    required
                    isInvalid={!!errors.vendor}
                    onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                    Invalid Vendor name!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Status:</Form.Label>
                <Form.Select onChange={onChange} name="status">
                    <option value="ONLINE">ONLINE</option>
                    <option value="OFFLINE">OFFLINE</option>
                </Form.Select>
            </Form.Group>
            <br/>
            {
                errors["Device"] &&
                <Alert variant="danger">{errors["Device"]}</Alert>
            }
            <Button onClick={onSave}>Save</Button>
        </Form>
    )
}