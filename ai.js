/*globals describe beforeEach it expect */


function reactionTimeAI(counter, limit, randomThrow, difference) {
  if (randomThrow === 1 || randomThrow === 2) limit = limit + difference;
  if (randomThrow === 6) limit = limit - difference;
  return counter >= limit;
}

function throwDice() {
  return getRandom(1, 6);
}

function positionAi(yPos, randomThrow, difference) {
  if (randomThrow === 1 || randomThrow === 2) yPos = yPos - difference;
  if (randomThrow === 6) yPos = yPos + difference;
  return yPos;
}

function doAI(info) {
  var timeCounter = info.counter;
  var timeLimit = info.timeLimit;
  var yPos = info.yPos;
  var posDifference = info.posDifference;
  var timeDifference = info.timeDifference;
  var newPosition = undefined;

  if (reactionTimeAI(timeCounter, timeLimit, throwDice(), timeDifference)) {
    newPosition = positionAi(yPos, throwDice(), posDifference);
  }

  return newPosition;
}

function predictPosition(paddleX, p, q) {
  var m = (q.y - p.y) / (q.x - p.x);
  var b = q.y - (m * q.x);
  return { x: paddleX, y: m * paddleX + b };
}


// Pong künstliche Intelligenz
describe('Pong Artifical Intelligence', function () {

  // Würfelfunktion
  describe('dice function', function () {
    // soll immer eine Zahl zwischen 1 und 6 zurückgeben
    it('should return a number between 1 and 6', function () {
      var num = throwDice();
      var isGreaterOne = num >= 1;
      var isLessSix = num <= 6;
      expect(isGreaterOne).toBe(true);
      expect(isLessSix).toBe(true);
    });
  });

  // Positionsfunktion
  describe('position function', function () {

    // soll eine Zahl zurückgeben
    it('should return a number', function () {
      expect(typeof positionAi(1, 1)).toBe('number');
    });

    // sollte yPos unverändert zurückgeben, wenn der Würfel 3-5 zeigt
    it('should return yPos unchanged if dice is 3, 4, 5', function () {
      var yPos = getRandom(0, 1000);
      var difference = 5;
      expect(positionAi(yPos, 3, difference)).toBe(yPos);
      expect(positionAi(yPos, 4, difference)).toBe(yPos);
      expect(positionAi(yPos, 5, difference)).toBe(yPos);
    });

    // sollte yPos + difference zurückgeben, wenn der Würfel 6 zeigt
    it('should return yPos + difference if dice is 6', function () {
      var yPos = 25;
      var difference = 5;
      expect(positionAi(yPos, 6, difference)).toBe(yPos + difference);
    });

    // sollte yPos - difference zurückgeben, wenn der Würfel 1 oder 2 zeigt
    it('should return yPos - difference if dice is 1 or 2', function () {
      var yPos = 25;
      var difference = 5;
      expect(positionAi(yPos, 1, difference)).toBe(yPos - difference);
      expect(positionAi(yPos, 2, difference)).toBe(yPos - difference);
    });
  });

  // Reaktionszeitmodifikator
  describe('reaction time modifier', function () {
    var absoluteLimit = 1000000; // Greatest possible random number
    var limit;
    beforeEach(function () {
      limit = getRandom(0, absoluteLimit);
    });

    // sollte true zurückgeben, wenn der counter größer ist als das limit
    it('should return true if the counter passes limit', function () {
      expect(reactionTimeAI(getRandom(limit, absoluteLimit), limit, 3)).toBe(true);
    });

    // sollte false zurückgeben, wenn der counter kleiner ist als das limit
    it('should return false if counter is less than limit', function () {
      var testNum = getRandom(0, limit);
      expect(reactionTimeAI(testNum, absoluteLimit, 3)).toBe(false);
    });

    // mit Würfel
    describe('with with dice', function () {
      var difference = 10;

      // sollte true wieder geben, wenn der counter >= limit und der Würfel 3, 4, oder 5 zeigt
      it('should return true if counter > limit and dice is 3, 4 or 5', function () {
        expect(reactionTimeAI(1, 1, 3, difference)).toBe(true);
        expect(reactionTimeAI(1, 1, 4, difference)).toBe(true);
        expect(reactionTimeAI(1, 1, 5, difference)).toBe(true);

        expect(reactionTimeAI(2, 1, 3, difference)).toBe(true);
        expect(reactionTimeAI(2, 1, 4, difference)).toBe(true);
        expect(reactionTimeAI(2, 1, 5, difference)).toBe(true);
      });

      // sollte false wiedergeben, wenn counter < limit und der Würfel 3 bis 5 zeigt
      it('should return false if counter < limit and dice is 3 to 5', function () {
        expect(reactionTimeAI(0, 1, 3, difference)).toBe(false);
        expect(reactionTimeAI(0, 1, 4, difference)).toBe(false);
        expect(reactionTimeAI(0, 1, 5, difference)).toBe(false);

      });

      // sollte false wieder geben, wenn counter < limit + difference und der Würfel 1 oder 2 zeigt
      it('should return false if counter < limit + difference and dice is 1 or 2', function () {
        expect(reactionTimeAI(1, 1, 1, difference)).toBe(false);
        expect(reactionTimeAI(1, 1, 2, difference)).toBe(false);
      });

      // sollte true wieder geben, wenn counter > limit + difference und der Würfel 1 oder 2 zeigt
      it('should return true if counter > limit + difference and dice is 1 or 2', function () {
        expect(reactionTimeAI(11, 1, 1, difference)).toBe(true);
        expect(reactionTimeAI(11, 1, 2, difference)).toBe(true);
      });

      // sollte true wieder geben, wenn counter > limit + difference und der Würfel 6 zeigt
      it('should return true if counter >= limit - difference and dice is 6', function () {
        expect(reactionTimeAI(10, 20, 6, difference)).toBe(true);
        expect(reactionTimeAI(11, 20, 6, difference)).toBe(true);
      });

      // sollte false wiedergeben, wenn der counter < limit - difference und der Würfel 6 zeigt
      it('should return false if counter < limit - difference and dice is 6', function () {
        expect(reactionTimeAI(9, 20, 6, difference)).toBe(false);
      });
    });
  });

  // Ballkollisionsberechnung
  describe('ball collision calculator', function () {
    var paddleX = 0;
    var p = {};

    // sollte ein Objekt wieder geben
    it('should return an object', function () {
      expect(typeof predictPosition(paddleX, p, p)).toBe('object');
    });

    it('should return an object with an x and a y value which are numbers', function () {
      var result = predictPosition(paddleX, p, p);
      expect(result.hasOwnProperty('x')).toBe(true);
      expect(result.hasOwnProperty('y')).toBe(true);
      expect(typeof result.x).toBe('number');
      expect(typeof result.y).toBe('number');
    });

    // Wenn m = 1 und b = 0 (Schnittpunkt mit der Y-Achse)
    it('should return {x: 10, y: 10} if m = 1 and b = 0', function () {
      // Die Funktion, die hier rauskommt ist y = x und darum muss das Ergebnis auch {x: 10, y: 10} sein.
      var p = { x: 1, y: 1 };
      var q = { x: 2, y: 2 };
      var paddleX = 10;
      expect(predictPosition(paddleX, p, q)).toEqual({ x: 10, y: 10 });
    });

    it('should return {x: 500, y: -350} for m = -0.75 and b = 25', function () {
      // Die zugrundeliegende Funktion hier ist y = -0.75x + 25
      expect(predictPosition(500, { x: -10, y: 32.5 }, { x: 10, y: 17.5 })).toEqual({ x: 500, y: -350 });
    });

  });
});

// xdescribe('ai function', function () {
//   var info = {
//     yPos: 1,
//     timeCounter: 10,
//     acceleration: 3,
//     timeCounter: 50,
//   };

//   beforeEach(function () {
//     spyOn(throwDice).and.returnValue(3);
//   });

//   it('should return an object', function () {
//     expect(typeof doAI(info)).toBe('object');
//   });

//   it('should return an object with the new position and acceleration no matter what you pass to doAi()', function () {
//     var properties = ['acceleration', 'yPos'];

//     var result = Object.keys(doAI({}));
//     expect(result).toContain(properties[0]);
//     expect(result).toContain(properties[1]);

//     result = Object.keys(info);
//     expect(result).toContain(properties[0]);
//     expect(result).toContain(properties[1]);
//   });

//   it('should call the throwDice function once if ', function () {

//   });
// });
// });




function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}