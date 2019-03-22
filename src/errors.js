class ValueError extends Error {

    constructor(message) {
        super(...arguments);
        Error.captureStackTrace(this, ValueError);
        this._message = message;
    }
    
    get message () {
        if (!this.values) return this._message;
        return this._message + 'Input values must be: ' + this.values.slice(0, -1).join(',') + " or " + this.values[-1];
    }

    setValues(values) {
        this.values = values;
        return this;
    }

}

class E extends Error {

    constructor(key) {
        super(key);
        switch(key) {
            case ('boolean'):
                return new TypeError('Options value must be a boolean');
            case ('value'):
                return new ValueError('Invalid input values used.');
        }
    }

}

module.exports = E;