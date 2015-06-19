'use strict';

var check = require('./check');

describe('lost-align', function() {
  it('resets the alignment', function() {
    check(
      'a { lost-align: reset; }',
      'a { position: static; }\n' +
      'a > * { position: static; top: auto; right: auto; bottom: auto;' +
      ' left: auto; transform: translate(0, 0); }'
    );
  });

  it('aligns horizontally', function() {
    check(
      'a { lost-align: horizontal; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: auto; right: auto; bottom: auto;' +
      ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns vertically', function() {
    check(
      'a { lost-align: vertical; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
      ' left: auto; transform: translate(0, -50%); }'
    );
  });

  it('aligns top left', function() {
    check(
      'a { lost-align: top-left; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 0; right: auto; bottom: auto;' +
      ' left: 0; transform: translate(0, 0); }'
    );
  });

  it('aligns top center', function() {
    check(
      'a { lost-align: top-center; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 0; right: auto; bottom: auto;' +
      ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns top', function() {
    check(
      'a { lost-align: top; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 0; right: auto; bottom: auto;' +
      ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns top right', function() {
    check(
      'a { lost-align: top-right; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 0; right: 0; bottom: auto;' +
      ' left: auto; transform: translate(0, 0); }'
    );
  });

  it('aligns middle left', function() {
    check(
      'a { lost-align: middle-left; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
      ' left: 0; transform: translate(0, -50%); }'
    );
  });

  it('aligns left', function() {
    check(
      'a { lost-align: left; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
      ' left: 0; transform: translate(0, -50%); }'
    );
  });

  it('aligns middle center', function() {
    check(
      'a { lost-align: middle-center; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
      ' left: 50%; transform: translate(-50%, -50%); }'
    );
  });

  it('aligns center', function() {
    check(
      'a { lost-align: center; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: auto; bottom: auto;' +
      ' left: 50%; transform: translate(-50%, -50%); }'
    );
  });

  it('aligns middle right', function() {
    check(
      'a { lost-align: middle-right; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: 0; bottom: auto;' +
      ' left: auto; transform: translate(0, -50%); }'
    );
  });

  it('aligns right', function() {
    check(
      'a { lost-align: right; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: 50%; right: 0; bottom: auto;' +
      ' left: auto; transform: translate(0, -50%); }'
    );
  });

  it('aligns bottom left', function() {
    check(
      'a { lost-align: bottom-left; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: auto; right: auto; bottom: 0;' +
      ' left: 0; transform: translate(0, 0); }'
    );
  });

  it('aligns bottom center', function() {
    check(
      'a { lost-align: bottom-center; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: auto; right: auto; bottom: 0;' +
      ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns bottom', function() {
    check(
      'a { lost-align: bottom; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: auto; right: auto; bottom: 0;' +
      ' left: 50%; transform: translate(-50%, 0); }'
    );
  });

  it('aligns bottom right', function() {
    check(
      'a { lost-align: bottom-right; }',
      'a { position: relative; }\n' +
      'a > * { position: absolute; top: auto; right: 0; bottom: 0;' +
      ' left: auto; transform: translate(0, 0); }'
    );
  });

  describe('flexbox', function() {
    it('resets the alignment', function() {
      check(
        'a { lost-align: reset flex; }',
        'a { display: initial; }\n' +
        'a > * { justify-content: inherit; align-items: inherit; }'
      );
    });

    it('aligns horizontally', function() {
      check(
        'a { lost-align: horizontal flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: inherit; }'
      );
    });

    it('aligns vertically', function() {
      check(
        'a { lost-align: vertical flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: inherit; align-items: center; }'
      );
    });

    it('aligns top left', function() {
      check(
        'a { lost-align: top-left flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-start; align-items: flex-start; }'
      );
    });

    it('aligns top center', function() {
      check(
        'a { lost-align: top-center flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: flex-start; }'
      );
    });

    it('aligns top', function() {
      check(
        'a { lost-align: top flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: flex-start; }'
      );
    });

    it('aligns top right', function() {
      check(
        'a { lost-align: top-right flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-end; align-items: flex-start; }'
      );
    });

    it('aligns middle left', function() {
      check(
        'a { lost-align: middle-left flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-start; align-items: center; }'
      );
    });

    it('aligns left', function() {
      check(
        'a { lost-align: left flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-start; align-items: center; }'
      );
    });

    it('aligns middle center', function() {
      check(
        'a { lost-align: middle-center flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: center; }'
      );
    });

    it('aligns center', function() {
      check(
        'a { lost-align: center flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: center; }'
      );
    });

    it('aligns middle right', function() {
      check(
        'a { lost-align: middle-right flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-end; align-items: center; }'
      );
    });

    it('aligns right', function() {
      check(
        'a { lost-align: right flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-end; align-items: center; }'
      );
    });

    it('aligns bottom left', function() {
      check(
        'a { lost-align: bottom-left flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-start; align-items: flex-end; }'
      );
    });

    it('aligns bottom center', function() {
      check(
        'a { lost-align: bottom-center flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: flex-end; }'
      );
    });

    it('aligns bottom', function() {
      check(
        'a { lost-align: bottom flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: center; align-items: flex-end; }'
      );
    });

    it('aligns bottom right', function() {
      check(
        'a { lost-align: bottom-right flex; }',
        'a { display: flex; }\n' +
        'a > * { justify-content: flex-end; align-items: flex-end; }'
      );
    });
  });
});
