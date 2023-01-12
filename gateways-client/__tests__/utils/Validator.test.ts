import Validator from "../../src/utils/Validators";

describe("Validators tests", () => {

    it('Should validate ipAddress', function () {
        expect(Validator.ipAddress("1.1.1.1")).toBe(null);
        expect(Validator.ipAddress("255.255.255.255")).toBe(null);
        expect(Validator.ipAddress("255.255.255.256")).toBe("Invalid IPv4 Address format!");
        expect(Validator.ipAddress("")).toBe("Invalid IPv4 Address format!");
        expect(Validator.ipAddress("abc 1 !  ,.")).toBe("Invalid IPv4 Address format!");
        expect(Validator.ipAddress()).toBe("Invalid IPv4 Address format!");
        expect(Validator.ipAddress(null)).toBe("Invalid IPv4 Address format!");
    });

    it('Should validate name', function () {
        expect(Validator.name("test")).toBe(null);
        expect(Validator.name(null)).toBe("Invalid Name");
        expect(Validator.name()).toBe("Invalid Name");
        expect(Validator.name("")).toBe("Invalid Name");
        expect(Validator.name(" ")).toBe("Invalid Name");
    });

    it('Should validate vendor', function () {
        expect(Validator.vendor("test")).toBe(null);
        expect(Validator.vendor(null)).toBe("Invalid Vendor");
        expect(Validator.vendor()).toBe("Invalid Vendor");
        expect(Validator.vendor("")).toBe("Invalid Vendor");
        expect(Validator.vendor(" ")).toBe("Invalid Vendor");
    });

    it('Should return errors object', function () {
        const result = Validator.validateForm({ name: "", vendor: "", ipAddress: "1.1.1.1"});
        expect(result).toEqual({ name: "Invalid Name", vendor: "Invalid Vendor", ipAddress: null })
    });
})