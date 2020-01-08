export declare class ValueError extends Error {
    values?: string[];
    private _message;
    constructor(message: string);
    get message(): string;
    setValues(values: string[]): this;
}
export default class E extends Error {
    constructor(key: string);
}
