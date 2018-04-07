var warning = 'LostGrid is dropping support for Node version v4 after version 9.\n If you need to retain your use of Node v4 it\'s recommended you don\'t\n update without testing it first. Submit an issue if you have questions. \n\n lostgrid.org';

module.exports = function checkNodeVersion(nodeVersion) {
  var returnOutput = {
    warn: false,
    warning: warning
  };

  if (nodeVersion) {
    nodeVersion = nodeVersion.split('.')[0];
    if (nodeVersion < 5) {
      returnOutput.warn = true;
    }

  }
  return returnOutput;
};
