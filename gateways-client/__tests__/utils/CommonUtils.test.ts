import {getBaseUrl} from "../../src/utils/CommonUtils";

describe("CommonUtils tests", () => {
    const processEnv = process.env;

    afterAll(() => {
        process.env = processEnv;
    })

    it('Should return base url', function () {
        process.env.NODE_ENV = 'production';
        expect(getBaseUrl()).toEqual("/api")

        process.env.NODE_ENV = 'develop';
        expect(getBaseUrl()).toEqual("http://localhost:8080/api")
    });
})