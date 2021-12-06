
type Byte = 0 | 1

export class ByteConverter{

    static toBitArray(num: number, numDigits: number = 8): Byte[]{

        if (num < 0) throw Error("Invalid arg: " + num);
        if (num >= Math.pow(2, numDigits)) throw Error("Invalid arg: " + num);

        const byteArray: Byte[] = [];
        for (let i = 0; i < numDigits; i++) {
            byteArray.push(0);
        }

        for (let i = 0; i < byteArray.length; i++) {
            const exponent = byteArray.length - i - 1;
            const bitValue = Math.pow(2, exponent);
            if (num >= bitValue) {
                byteArray[i] = 1;
                num -= bitValue;
            }
        }

        return byteArray;
    }

    static toNumber(byteArray: Byte[]){

        let num = 0;
        for (let i = 0; i < byteArray.length; i++) {
            if (byteArray[i]){
                const exponent = byteArray.length - i - 1;
                const bitValue = Math.pow(2, exponent);
                num += bitValue;
            }
        }
        return num;
    }
}

