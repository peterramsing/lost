'use strict';

var check = require('./check');
var throws = require('./throws');

describe('lost-align', () => {
  it('resets the alignment', () => {
    check(
      'a { lost-align: reset; }',
      'a { position: static; }\n' +
        'a > * { position: static; top: auto; right: auto; bottom: auto;' +
        ' left: auto; transform: translate(0, 0); }'
    );
  });

  it('aligns horizontally', () => {
    check(
      'a { lost-align: horizontal; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: auto; right: auto; bottom: auto;' +
        ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns vertically', () => {
    check(
      'a { lost-align: vertical; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
        ' left: auto; transform: translate(0, -50%); }'
    );
  });

  it('aligns top left', () => {
    check(
      'a { lost-align: top-left; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 0; right: auto; bottom: auto;' +
        ' left: 0; transform: translate(0, 0); }'
    );
  });

  it('aligns top center', () => {
    check(
      'a { lost-align: top-center; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 0; right: auto; bottom: auto;' +
        ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns top', () => {
    check(
      'a { lost-align: top; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 0; right: auto; bottom: auto;' +
        ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns top right', () => {
    check(
      'a { lost-align: top-right; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 0; right: 0; bottom: auto;' +
        ' left: auto; transform: translate(0, 0); }'
    );
  });

  it('aligns middle left', () => {
    check(
      'a { lost-align: middle-left; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
        ' left: 0; transform: translate(0, -50%); }'
    );
  });

  it('aligns left', () => {
    check(
      'a { lost-align: left; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
        ' left: 0; transform: translate(0, -50%); }'
    );
  });

  it('aligns middle center', () => {
    check(
      'a { lost-align: middle-center; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
        ' left: 50%; transform: translate(-50%, -50%); }'
    );
  });

  it('aligns center', () => {
    check(
      'a { lost-align: center; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
        ' left: 50%; transform: translate(-50%, -50%); }'
    );
  });

  it('aligns middle right', () => {
    check(
      'a { lost-align: middle-right; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: 0; bottom: auto;' +
        ' left: auto; transform: translate(0, -50%); }'
    );
  });

  it('aligns right', () => {
    check(
      'a { lost-align: right; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: 50%; right: 0; bottom: auto;' +
        ' left: auto; transform: translate(0, -50%); }'
    );
  });

  it('aligns bottom left', () => {
    check(
      'a { lost-align: bottom-left; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: auto; right: auto; bottom: 0;' +
        ' left: 0; transform: translate(0, 0); }'
    );
  });

  it('aligns bottom center', () => {
    check(
      'a { lost-align: bottom-center; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: auto; right: auto; bottom: 0;' +
        ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns bottom', () => {
    check(
      'a { lost-align: bottom; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: auto; right: auto; bottom: 0;' +
        ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns bottom right', () => {
    check(
      'a { lost-align: bottom-right; }',
      'a { position: relative; }\n' +
        'a > * { position: absolute; top: auto; right: 0; bottom: 0;' +
        ' left: auto; transform: translate(0, 0); }'
    );
  });

  it('throws error if it does not understand the direction', () => {
    throws(
      'a { lost-align: bottom-rigth; }',
      "lost-align: direction 'bottom-rigth' is unknown."
    );
  });

  describe('flexbox', () => {
    it('resets the alignment', () => {
      check(
        'a { lost-align: reset flex; }',
        'a { display: initial; }\n' +
          'a { justify-content: inherit; align-items: inherit; }'
      );
    });

    it('aligns horizontally', () => {
      check(
        'a { lost-align: horizontal flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: inherit; }'
      );
    });

    it('aligns vertically', () => {
      check(
        'a { lost-align: vertical flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: inherit; align-items: center; }'
      );
    });

    it('aligns top left', () => {
      check(
        'a { lost-align: top-left flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-start; align-items: flex-start; }'
      );
    });

    it('aligns top center', () => {
      check(
        'a { lost-align: top-center flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: flex-start; }'
      );
    });

    it('aligns top', () => {
      check(
        'a { lost-align: top flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: flex-start; }'
      );
    });

    it('aligns top right', () => {
      check(
        'a { lost-align: top-right flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-end; align-items: flex-start; }'
      );
    });

    it('aligns middle left', () => {
      check(
        'a { lost-align: middle-left flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-start; align-items: center; }'
      );
    });

    it('aligns left', () => {
      check(
        'a { lost-align: left flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-start; align-items: center; }'
      );
    });

    it('aligns middle center', () => {
      check(
        'a { lost-align: middle-center flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: center; }'
      );
    });

    it('aligns center', () => {
      check(
        'a { lost-align: center flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: center; }'
      );
    });

    it('aligns middle right', () => {
      check(
        'a { lost-align: middle-right flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-end; align-items: center; }'
      );
    });

    it('aligns right', () => {
      check(
        'a { lost-align: right flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-end; align-items: center; }'
      );
    });

    it('aligns bottom left', () => {
      check(
        'a { lost-align: bottom-left flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-start; align-items: flex-end; }'
      );
    });

    it('aligns bottom center', () => {
      check(
        'a { lost-align: bottom-center flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: flex-end; }'
      );
    });

    it('aligns bottom', () => {
      check(
        'a { lost-align: bottom flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: center; align-items: flex-end; }'
      );
    });

    it('aligns bottom right', () => {
      check(
        'a { lost-align: bottom-right flex; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-end; align-items: flex-end; }'
      );
    });

    it('throws error if it does not understand the direction', () => {
      throws(
        'a { lost-align: bottom-rigth flex; }',
        "lost-align: direction 'bottom-rigth' is unknown."
      );
    });

    it('Flexbox is set globally', () => {
      check(
        '@lost flexbox flex; \n' + 'a { lost-align: bottom-right; }',
        'a { display: flex; }\n' +
          'a { justify-content: flex-end; align-items: flex-end; }'
      );
    });
  });
});
