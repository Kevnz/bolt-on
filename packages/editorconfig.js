const writeFile = require('../utils/write-file');

const config = `# editorconfig.org

# Top-most EditorConfig file
root = true

[*]

# Set default charset
charset = utf-8

# Unix-style newlines with a newline ending every file
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true

# 2 space indentation
indent_style = space
indent_size = 2
`;

module.exports = (path) => writeFile('.editorconfig', config);
