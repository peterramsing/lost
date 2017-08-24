var assign = require('object-assign');

var replace = require('./replace.js');

var lgLogic = require('./_lg-logic');

function lostCenter(flex, maxWidth, padding) {
  var result = {};
  
  if (flex) {
    assign(result, {
      display: 'flex',
      flexFlow: 'row wrap',
    });
  } else {
    assign(result, {
      ':after': {
        content: '\'\'',
        display: 'table',
        clear: 'both'
      }
    });
    
    assign(result, {
      ':before': {
        content: '\'\'',
        display: 'table'
      }
    });
  }
  
  assign(result, {
    maxWidth: maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto'
  });
  
  if (padding !== undefined) {
    assign(result, {
      paddingLeft: padding,
      paddingRight: padding
    });
  }
  
  return result;
}

module.exports = function lostCenterDecl(css, settings, result) {
  css.walkDecls('lost-center', function lostCenterFunction(decl) {
    var declArr = [];
    var lostCenterPadding;
    var lostCenterMaxWidth;
    var lostCenterFlexbox = settings.flexbox;
    var lostUnit = settings.gridUnit;
    var lostColumnRounder = settings.rounder;
    var lostColumnGutter = 0;
    var validUnits = ['%', 'vw'];

    var isFractionValue = (value) => {
      var lostFractionPattern = /^\d+\/\d+$/;
      return lostFractionPattern.test(value);
    };

    declArr = decl.value.split(' ');

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      lostCenterPadding = declArr[1];
    }

    if (declArr.indexOf('flex') !== -1) {
      lostCenterFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      lostCenterFlexbox = 'no-flex';
    }

    lostCenterPadding = lgLogic.parseLostProperty(decl.parent.nodes, 'lost-center-padding', lostCenterPadding);
    lostColumnRounder = lgLogic.parseLostProperty(decl.parent.nodes, 'lost-column-rounder', lostColumnRounder);

    lostUnit = lgLogic.parseLostProperty(decl.parent.nodes, 'lost-unit', lostUnit);

    if (!lgLogic.validateUnit(lostUnit, validUnits)) {
      decl.warn(result, `${lostUnit} is not a valid unit for lost-center`);
      lostUnit = settings.gridUnit;
    }

    lostCenterFlexbox = lgLogic.parseLostProperty(decl.parent.nodes, 'lost-center-flexbox', lostCenterFlexbox);

    if(lostCenterFlexbox !== 'flex') {
      lostCenterFlexbox = settings.flexbox;
    }

    if(declArr[0] !== undefined && isFractionValue(declArr[0])) {
      lostCenterMaxWidth = lgLogic.calcValue(declArr[0], lostColumnGutter, lostColumnRounder, lostUnit);
    } else {
      lostCenterMaxWidth = declArr[0];
    }

    replace(decl, lostCenter(lostCenterFlexbox === 'flex', lostCenterMaxWidth, lostCenterPadding));
  });
};
