import Normalizers from "../../src/utils/Normalizers";

describe("Normalizer tests", () => {

    it('Should normalize ipAddress', function () {
        expect(Normalizers.ipAddress("")).toBe("");
        expect(Normalizers.ipAddress("1.1.1.1")).toBe("1.1.1.1");
        expect(Normalizers.ipAddress("abc 1 !  ,.")).toBe("1.");
        expect(Normalizers.ipAddress()).toBe("");
        expect(Normalizers.ipAddress(null)).toBe("");
    });
})