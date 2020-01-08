"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValueError = /** @class */ (function (_super) {
    __extends(ValueError, _super);
    function ValueError(message) {
        var _this = _super.call(this, message) || this;
        Error.captureStackTrace(_this, ValueError);
        _this._message = message;
        return _this;
    }
    Object.defineProperty(ValueError.prototype, "message", {
        get: function () {
            if (!this.values)
                return this._message;
            return this._message + 'Input values must be: ' + this.values.slice(0, -1).join(',') + " or " + this.values[-1];
        },
        enumerable: true,
        configurable: true
    });
    ValueError.prototype.setValues = function (values) {
        this.values = values;
        return this;
    };
    return ValueError;
}(Error));
exports.ValueError = ValueError;
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E(key) {
        var _this = _super.call(this, key) || this;
        switch (key) {
            case ('boolean'):
                return new TypeError('Options value must be a boolean');
            case ('value'):
                return new ValueError('Invalid input values used.');
        }
        return _this;
    }
    return E;
}(Error));
exports.default = E;
