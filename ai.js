
function reactionTimeAI(a, b) {
  var out = false;
  console.log(b);
  var condition = a > b;
  if (condition) out = true;
  
  return out;
}

console.log('!');


var absoluteLimit = 10;

describe('Pong Artifical Intelligence', function (){
  
  describe('Reaction time', function () {
    var limit;
    beforeEach(function () {
      limit = getRandom(0, absoluteLimit);
    });
    
    it('should be triggered if the counter passes limit', function () {
      expect(reactionTimeAI(getRandom(limit, absoluteLimit), limit)).toBe(true)
    });
    
    it('should be not triggered if counter is less than limit', function () {
      var testNum = getRandom(0,limit);
      expect(reactionTimeAI(testNum)).toBe(false);
    });
  });
  
});




function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}