console.log("vis.arc.js");

function drawArc (squence, section) {
  const svg = section.svg;
  const padding_x = section.padding_x;
  const padding_y = section.padding_y;
  const W = section.w - padding_x * 2;
  const H = section.h - padding_y * 2;

  // X interval
  const squenceLen = squence.length;
  const x_interval = W / squenceLen;

  // Y interval 
  const min = _.min(squence);
  const max = _.max(squence);
  const distance = max - min;
  const getYInterval = function (y_value) {
    return ((y_value - min) / (distance)) * 200 + 50
  }

  _.forEach(squence, (note, i) => {
    svg.append('circle').attrs({
      cx: (x_interval * i) + x_interval + padding_x,
      cy: H - getYInterval(note),
      r: 3,
      fill: '#955'
    })
  });

  for (let patternLen = 25; patternLen < 33; patternLen++) {
    const patterns = getPatterns(squence, patternLen);
    const repeatedPatterns = getRepeatedPattern(squence, patterns);
    console.log(repeatedPatterns.length);
  }
}

function getPatterns (squence, len) {
  if (len <= 0) return [];
  let patternList = []
  for (let i = 0; i < squence.length - len; i++) {
    patternList.push(squence.slice(i, i + len));
  }
  return multiDimensionalUnique(patternList);
}

function getRepeatedPattern (squence, patterns) {
  const repeatedPatterns = [];
  for (let pattern of patterns) {
    const idxs = getSubArrayIdx(squence, pattern);
    if (idxs.length >= 2) {
      repeatedPatterns.push({ pattern, idxs })
    }
  }
  return repeatedPatterns
}

function getSubArrayIdx (arr, sub) {
  const ret = [];
  for (let i = 0; i < arr.length - sub.length; i++) {
    sub2 = arr.slice(i, i + sub.length);
    if (arraysMatch(sub, sub2)) ret.push(i);
  }
  return ret;
}

function multiDimensionalUnique (arr) {
  var uniques = [];
  var itemsFound = {};
  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) { continue; }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

var arraysMatch = function (arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }
  return true;
};
