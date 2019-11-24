function drawSquence (sequence, section, queries = []) {
  // 그릴 영역 정의하기
  const svg = section.svg;
  svg.selectAll('*').remove();
  const padding_x = section.padding_x;
  const padding_y = section.padding_y;
  const W = section.w - padding_x * 2;
  const H = section.h - padding_y * 2;

  // 각 노트의 순서에 따른 X축 간격 정의하기
  const sequenceLen = sequence.length;
  const x_interval = W / sequenceLen;

  // 각 노트의 음 높이에 따른 Y축 간격 정의하기
  const frequencies = _.map(sequence, 'frequency');
  const min = _.min(frequencies) * 0.9;
  const max = _.max(frequencies) * 1.1;
  const distance = max - min;

  const getRelVal = function (frequency) {
    return relVal = (frequency - min) / (distance); // 0 ~ 1
  }

  const getYPos = function (frequency) {
    const relVal = getRelVal(frequency);
    return relVal * H;
  }

  const getColor = function (frequency) {
    const relVal = getRelVal(frequency);
    return colorMap(relVal);
  }

  const queryFroms = _.map(queries, 'from');
  const querytos = _.map(queries, 'to');

  _.forEach(sequence, (note, i) => {
    // 패턴 표시를 위한 스트로크 설정
    let strokeW = 0;
    if (i < sequenceLen - 1) {
      const nextNote = sequence[i + 1];
      if (queryFroms.indexOf(note.id) >= 0 && querytos.indexOf(nextNote.id) >= 0) {
        strokeW = 2;
      } else if (queryFroms.indexOf(nextNote.id) >= 0 && querytos.indexOf(note.id) >= 0) {
        strokeW = 2;
      }
    }
    if (i > 1) {
      const preNote = sequence[i - 1];
      if (queryFroms.indexOf(note.id) >= 0 && querytos.indexOf(preNote.id) >= 0) {
        strokeW = 2;
      } else if (queryFroms.indexOf(preNote.id) >= 0 && querytos.indexOf(note.id) >= 0) {
        strokeW = 2;
      }
    }

    // 시퀀스 노트 그리기
    svg.append('circle').attrs({
      cx: (x_interval * i) + x_interval + padding_x,
      cy: H - getYPos(note.frequency),
      r: note.duration / 2,
      fill: getColor(note.frequency),
      opacity: 0.75,
      'stroke-width': strokeW,
      'stroke': '#000',
    }).classed(note.id, true);
  });
  // const noteIds = _.map(sequence, 'id')
  // for (let patternLen = 25; patternLen < 33; patternLen++) {
  //   const patterns = getPatterns(noteIds, patternLen);
  //   const repeatedPatterns = getRepeatedPattern(noteIds, patterns);
  //   console.log(repeatedPatterns.length, repeatedPatterns);
  // }
}

function getPatterns (noteIds, len) {
  if (len <= 0) return [];
  let patternList = []
  for (let i = 0; i < noteIds.length - len; i++) {
    patternList.push(noteIds.slice(i, i + len));
  }
  return multiDimensionalUnique(patternList);
}

function getRepeatedPattern (noteIds, patterns) {
  const repeatedPatterns = [];
  for (let pattern of patterns) {
    const idxs = getSubArrayIdx(noteIds, pattern);
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
