const fs = require('fs');
const path = require('path');
const ora = require('ora');
const lessVariablesToJson = require('less-variables-to-json');

const spinner = ora('Compiling Antd Less overrides to JSON').start();

process.on('unhandledRejection', (err) => {
  spinner.fail('Failed to compile Antd Less overrides to JSON');
  console.log(err);
});

const content = fs.readFileSync(
  path.resolve(__dirname, '../src/less/antd.overrides.less'),
  'utf8',
);

lessVariablesToJson(content).then((result) => {
  fs.writeFileSync(
    path.resolve(__dirname, '../src/less/antd.overrides.build.artifact.json'),
    JSON.stringify(result),
    'utf8',
  );
  spinner.succeed('Compiled Antd Less overrides to JSON');
});
