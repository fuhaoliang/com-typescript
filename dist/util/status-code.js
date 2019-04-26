"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCode = {
    ERROR_401(msg) {
        return {
            status: {
                code: -1,
                msg
            },
            data: {}
        };
    },
    ERROR_403(msg) {
        return {
            status: {
                code: -1,
                msg
            },
            data: {}
        };
    },
    ERROR_404(msg) {
        return {
            status: {
                code: -1,
                msg
            },
            data: {}
        };
    },
    ERROR_412(msg) {
        return {
            status: {
                code: -1,
                msg
            },
            data: {}
        };
    },
    SUCCESS_200(msg, options) {
        return {
            status: {
                code: 0,
                msg
            },
            data: Object.assign({}, options)
        };
    }
};
//# sourceMappingURL=status-code.js.map