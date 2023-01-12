
const NUMS_DOTS_REGEXP = /[^0-9.]+/g;

const Normalizer: {[key: string]: any} = {
    ipAddress: (value: string = "") => value ? value.replace(NUMS_DOTS_REGEXP, "") : "",
}

export default Normalizer;