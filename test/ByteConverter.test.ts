import {ByteConverter} from "../src/ByteConverter";

describe("from number to byte - 4 digits", () => {
    it("0", () => {
        const result = ByteConverter.toBitArray(0, 4);
        expect(result).toStrictEqual([0, 0, 0, 0]);
    });
    it("1", () => {
        const result = ByteConverter.toBitArray(1, 4);
        expect(result).toStrictEqual([0, 0, 0, 1]);
    });
    it("2", () => {
        const result = ByteConverter.toBitArray(2, 4);
        expect(result).toStrictEqual([0, 0, 1, 0]);
    });
    it("3", () => {
        const result = ByteConverter.toBitArray(3, 4);
        expect(result).toStrictEqual([0, 0, 1, 1]);
    });
    it("4", () => {
        const result = ByteConverter.toBitArray(4, 4);
        expect(result).toStrictEqual([0, 1, 0, 0]);
    });
    it("5", () => {
        const result = ByteConverter.toBitArray(5, 4);
        expect(result).toStrictEqual([0, 1, 0, 1]);
    });
    it("6", () => {
        const result = ByteConverter.toBitArray(6, 4);
        expect(result).toStrictEqual([0, 1, 1, 0]);
    });
    it("7", () => {
        const result = ByteConverter.toBitArray(7, 4);
        expect(result).toStrictEqual([0, 1, 1, 1]);
    });
    it("8", () => {
        const result = ByteConverter.toBitArray(8, 4);
        expect(result).toStrictEqual([1, 0, 0, 0]);
    });
    it("9", () => {
        const result = ByteConverter.toBitArray(9, 4);
        expect(result).toStrictEqual([1, 0, 0, 1]);
    });
    it("11", () => {
        const result = ByteConverter.toBitArray(11, 4);
        expect(result).toStrictEqual([1, 0, 1, 1]);
    });
    it("15", () => {
        const result = ByteConverter.toBitArray(15, 4);
        expect(result).toStrictEqual([1, 1, 1, 1]);
    });
});

describe("from number to byte - default 8 digits", () => {
    it("0", () => {
        const result = ByteConverter.toBitArray(0);
        expect(result).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it("3", () => {
        const result = ByteConverter.toBitArray(3);
        expect(result).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 1]);
    });
    it("11", () => {
        const result = ByteConverter.toBitArray(11);
        expect(result).toStrictEqual([0, 0, 0, 0, 1, 0, 1, 1]);
    });
    it("17", () => {
        const result = ByteConverter.toBitArray(17);
        expect(result).toStrictEqual([0, 0, 0, 1, 0, 0, 0, 1]);
    });
    it("85", () => {
        const result = ByteConverter.toBitArray(85);
        expect(result).toStrictEqual([0, 1, 0, 1, 0, 1, 0, 1]);
    });
    it("127", () => {
        const result = ByteConverter.toBitArray(127);
        expect(result).toStrictEqual([0, 1, 1, 1, 1, 1, 1, 1]);
    });
    it("255", () => {
        const result = ByteConverter.toBitArray(255);
        expect(result).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1]);
    });
});

describe("from number to byte - invalid args", () => {
    it("number too large", () => {
        const result = () => ByteConverter.toBitArray(256);
        expect(result).toThrow();
    });
    it("number too small", () => {
        const result = () => ByteConverter.toBitArray(-1);
        expect(result).toThrow();
    });
});

describe("from byte to num - 4 digits", () => {
    it("0", () => {
        const result = ByteConverter.toNumber([0, 0, 0, 0]);
        expect(result).toStrictEqual(0);
    });
    it("1", () => {
        const result = ByteConverter.toNumber([0, 0, 0, 1]);
        expect(result).toStrictEqual(1);
    });
    it("2", () => {
        const result = ByteConverter.toNumber([0, 0, 1, 0]);
        expect(result).toStrictEqual(2);
    });
    it("3", () => {
        const result = ByteConverter.toNumber([0, 0, 1, 1]);
        expect(result).toStrictEqual(3);
    });
    it("4", () => {
        const result = ByteConverter.toNumber([0, 1, 0, 0]);
        expect(result).toStrictEqual(4);
    });
    it("5", () => {
        const result = ByteConverter.toNumber([0, 1, 0, 1]);
        expect(result).toStrictEqual(5);
    });
    it("6", () => {
        const result = ByteConverter.toNumber([0, 1, 1, 0]);
        expect(result).toStrictEqual(6);
    });
    it("7", () => {
        const result = ByteConverter.toNumber([0, 1, 1, 1]);
        expect(result).toStrictEqual(7);
    });
    it("8", () => {
        const result = ByteConverter.toNumber([1, 0, 0, 0]);
        expect(result).toStrictEqual(8);
    });
    it("9", () => {
        const result = ByteConverter.toNumber([1, 0, 0, 1]);
        expect(result).toStrictEqual(9);
    });
    it("10", () => {
        const result = ByteConverter.toNumber([1, 0, 1, 0]);
        expect(result).toStrictEqual(10);
    });
    it("11", () => {
        const result = ByteConverter.toNumber([1, 0, 1, 1]);
        expect(result).toStrictEqual(11);
    });
    it("15", () => {
        const result = ByteConverter.toNumber([1, 1, 1, 1]);
        expect(result).toStrictEqual(15);
    });
});

describe("from byte to num - default 8 digit", () => {
    it("0", () => {
        const result = ByteConverter.toNumber([0, 0, 0, 0, 0, 0, 0, 0]);
        expect(result).toStrictEqual(0);
    });
    it("3", () => {
        const result = ByteConverter.toNumber([0, 0, 0, 0, 0, 0, 1, 1]);
        expect(result).toStrictEqual(3);
    });
    it("11", () => {
        const result = ByteConverter.toNumber([0, 0, 0, 0, 1, 0, 1, 1]);
        expect(result).toStrictEqual(11);
    });
    it("127", () => {
        const result = ByteConverter.toNumber([0, 1, 1, 1, 1, 1, 1, 1]);
        expect(result).toStrictEqual(127);
    });
    it("255", () => {
        const result = ByteConverter.toNumber([1, 1, 1, 1, 1, 1, 1, 1]);
        expect(result).toStrictEqual(255);
    });
});

