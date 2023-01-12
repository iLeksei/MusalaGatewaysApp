
const IPv4_REGEXP: RegExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const MIN_IPv4_LENGTH: number = 7;

const Validator: { [key: string]: any } = {
    validateForm: (values: { [key: string]: any } = {}) => {
        let errors: { [key: string]: any } = {};
        for (let fieldName in values) {
            if (Validator[fieldName]) {
                let validatorCb = Validator[fieldName];
                errors[fieldName] = validatorCb(values[fieldName]);
            }
        }
        return errors;
    },
    ipAddress: (value: string = ""): string | null => IPv4_REGEXP.test(value) && value.length >= MIN_IPv4_LENGTH ?
        null : "Invalid IPv4 Address format!",
    name: (value: string = ""): string | null => {
        if (!value) return "Invalid Name";
        return value.trim().length ? null : "Invalid Name"
    },
    vendor: (value: string = ""): string | null => {
        if (!value) return "Invalid Vendor";
        return value.trim().length ? null : "Invalid Vendor"
    },
}


export default Validator;