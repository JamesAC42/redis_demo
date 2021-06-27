"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getData = function (endpoint) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:3002' + endpoint, {
            method: 'GET'
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            resolve(data);
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
exports.default = getData;
//# sourceMappingURL=getData.js.map