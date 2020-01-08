export class ValueError extends Error {

	public values?: string[]
	private _message: string

    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this, ValueError);
        this._message = message;
    }
    
    get message () {
        if (!this.values) return this._message;
        return this._message + 'Input values must be: ' + this.values.slice(0, -1).join(',') + " or " + this.values[-1];
    }

    setValues(values: string[]) {
        this.values = values;
        return this;
    }

}

export default class E extends Error {

    constructor(key: string) {
        super(key);
        switch(key) {
            case ('boolean'):
                return new TypeError('Options value must be a boolean');
            case ('value'):
                return new ValueError('Invalid input values used.');
        }
    }

}