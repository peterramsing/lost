var newBlock = require('./new-block.js');

var lgLogic = require('./_lg-logic');

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

    if (lostCenterFlexbox === 'no-flex') {
      newBlock(
        decl,
        ':after',
        ['content', 'display', 'clear'],
        ['\'\'', 'table', 'both']
      );

      newBlock(
        decl,
        ':before',
        ['content', 'display'],
        ['\'\'', 'table']
      );
    } else {
      decl.cloneBefore({
        prop: 'display',
        value: 'flex'
      });

      decl.cloneBefore({
        prop: 'flex-flow',
        value: 'row wrap'
      });
    }

    decl.cloneBefore({
      prop: 'max-width',
      value: lostCenterMaxWidth
    });

    decl.cloneBefore({
      prop: 'margin-left',
      value: 'auto'
    });

    decl.cloneBefore({
      prop: 'margin-right',
      value: 'auto'
    });

    if (lostCenterPadding !== undefined) {
      decl.cloneBefore({
        prop: 'padding-left',
        value: lostCenterPadding
      });

      decl.cloneBefore({
        prop: 'padding-right',
        value: lostCenterPadding
      });
    }

    decl.remove();
  });
};
