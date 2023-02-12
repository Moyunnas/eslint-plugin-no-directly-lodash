"use strict";

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: "no-directly-lodash",
            recommended: true,
        },
        messages: {
            directlyImportLodash: "Cannot directly import function from lodash",
            invalidImport: "This import is invald",
        },
        fixable: "code",
    },

    create: function(context) {

        // 判断是否有依赖直接引用lodash
        function hasDirectlyImportLodash(node) {
            return node.source.value === 'lodash';
        }

        // 获取lodash中导入的函数名称，并返回
        function getImportSpecifierArray(specifiers) {
            return specifiers.filter((item) => item.type === 'ImportSpecifier')
                             .map((item) => item.imported.name);
        }

        // 生成修复文本
        function generateFixedImportText(importedList) {
            let fixedText = "";
            importedList.forEach((importName, index) => {
                fixedText += `import ${importName} from \"lodash/${importName}\";`;
                if(index != importedList.length - 1) fixedText += "\n";
            });
            return fixedText;
        }

        return {
            ImportDeclaration(node) {
                if (hasDirectlyImportLodash(node)) {
                    const importedList = getImportSpecifierArray(node.specifiers || []);

                    // 如果没有任何函数的引用，则提示
                    if(importedList?.length === 0) {
                        return context.report({
                            node,
                            messageId: "invalidImport",
                        });
                    } else {
                        return context.report({
                            node,
                            messageId: "directlyImportLodash",
                            fix(fixer) {
                                return fixer.replaceTextRange([node.range[0],node.range[1]], generateFixedImportText(importedList));
                            }
                        });
                    }
                }
            }
        }
    }
}