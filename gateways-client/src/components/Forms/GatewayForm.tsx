import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";

import Normalizers from "../../utils/Normalizers";
import Validators from "../../utils/Validators";
import {getBaseUrl} from "../../utils/CommonUtils";
import {StringUtils} from "../../utils/StringUtils";

interface IProps {
    onSaveCb: () => any;
}

export const GatewayForm = (props: IProps): JSX.Element => {
    const [values, setValues] = useState({name: "", ipAddress: ""});
    const [errors, setErrors] = useState<any>({name: null, ipAddress: null});

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
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await fetch(`${getBaseUrl()}/gateway`, requestInit);
            if (!response.ok) {
                let result = await response.json();
                if (typeof result === "object" && "Gateway" in result) {
                    setErrors(result);
                }
                return;
            }
            props.onSaveCb();
        } catch (err) {
            setErrors({Gateway: StringUtils.getCommonErrorMessage()});
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.name) return;
        let inputName = e.target.name;
        let value = e.target.value || "";
        if (Normalizers[inputName]) {
            let normalizerCb = Normalizers[inputName];
            value = normalizerCb(value);
        }
        if (errors[inputName] !== null) {
            setErrors((prev: any) => ({...prev, [inputName]: null}));
        }
        setValues(prev => ({...prev, [inputName]: value}))
    }
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder="Gateway name..."
                    required
                    isInvalid={!!errors.name}
                    value={values.name}
                    onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                    Invalid Gateway name!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>IPv4 Address:</Form.Label>
                <Form.Control
                    name="ipAddress"
                    type="text"
                    placeholder="xxx.xxx.xxx.xxx"
                    required
                    maxLength={15}
                    isInvalid={!!errors.ipAddress}
                    value={values.ipAddress}
                    onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                    Invalid IPv4 Address format!
                </Form.Control.Feedback>
            </Form.Group>
            <br/>
            {
                errors["Gateway"] &&
                <Alert variant="danger">{errors["Gateway"]}</Alert>
            }
            <Button onClick={onSave}>Save</Button>
        </Form>
    )
}