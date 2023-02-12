"use strict";

const {testConfig} = require("../config.js");

let rule = require('../../../lib/rules/no-directly-lodash');

let RuleTester = require('eslint').RuleTester;

let ruleTester = new RuleTester(testConfig);

ruleTester.run('no-directly-lodash', rule, {
    valid: [
        'import a from \"lodash/a\";',
        'import b from \"lodash/b\";',
    ],

    invalid: [
        {
            code: "import { noop } from \"lodash\";",
            errors: [{ messageId: 'directlyImportLodash'}],
            output: "import noop from \"lodash/noop\";"
        },
        {
            code: "import { noop as _noop } from \"lodash\";",
            errors: [{ messageId: 'directlyImportLodash'}],
            output: "import noop from \"lodash/noop\";"
        },
        {
            code: "import {} from \"lodash\";",
            errors: [{ messageId: 'invalidImport'}],
        },
        {
            code: "import { noop, debounce } from \"lodash\";",
            errors: [{ messageId: 'directlyImportLodash'}],
            output: "import noop from \"lodash/noop\";\nimport debounce from \"lodash/debounce\";"
        }
    ]
})