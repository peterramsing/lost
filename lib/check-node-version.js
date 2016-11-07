module.exports = function checkNodeVersion() {
  var nodeVersion = process.env.npm_config_node_version;

  if (nodeVersion) {
    nodeVersion = nodeVersion.split('.')[0];
    if (nodeVersion < 1) {
      console.warn('\033[31m', 'LostGrid is dropping support for Node versions 0.10 and 0.12 after version 8.\n If you need to retain your use of Node v0.10 v0.12 it\'s recommended you don\'t\n update without testing it first. Submit an issue if you have questions. \n\n lostgrid.org' ,'\x1b[0m');
    }
  }
};
