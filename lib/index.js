"use strict";

module.exports = {
    rules: {
        'no-directly-lodash': require('./rules/no-directly-lodash'),
    },
    configs: {
        recommended: {
            rules: {
                '114514/no-directly-lodash': 2, // 可以省略 eslint-plugin 前缀
            },
        },
    },
};