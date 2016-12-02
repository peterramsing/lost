var warning = 'LostGrid is dropping support for Node versions 0.10 and 0.12 after version 8.\n If you need to retain your use of Node v0.10 v0.12 it\'s recommended you don\'t\n update without testing it first. Submit an issue if you have questions. \n\n lostgrid.org';

module.exports = function checkNodeVersion(nodeVersion) {
  var returnOutput = {
    warn: false,
    warning: warning
  };
  if (nodeVersion) {
    nodeVersion = nodeVersion.split('.')[0];
    if (nodeVersion < 1) {
      returnOutput.warn = true;
    }
  }
  return returnOutput;
};
