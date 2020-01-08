"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var regexes = __importStar(require("./regexes"));
var CharType;
(function (CharType) {
})(CharType || (CharType = {}));
exports.isChar = function (str) { return regexes.char.test(str); };
function char(c) {
    if (!exports.isChar(c))
        throw new Error('not a char');
    return c;
}
exports.char = char;
