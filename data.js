function getData () {
  // 1. note list
  const noteListStr = "349.06262.18233.05262.01233.06311.12262.06208.12233.10208.02208.06311.06233.12262.02233.04262.04233.02208.18262.10311.18466.12415.10349.02415.06415.04466.06262.12349.10311.02466.04415.02466.18349.12311.04311.30262.30349.04415.12349.16";
  const splitedNoteListStr = noteListStr.match(/(.{1,6})/g);
  const noteList = strArr2numArr(splitedNoteListStr);

  // 2. note sequence
  const noteSquenceStr = "349.06, 262.18, 233.05, 262.01, 233.06, 349.06, 311.12, 349.06, 262.06, 233.06, 262.06, 208.12, 233.1, 208.02, 233.06, 208.06, 233.06, 311.06, 233.06, 208.06, 233.06, 311.06, 233.12, 311.12, 262.02, 233.04, 311.06, 233.06, 262.06, 349.06, 311.06, 262.02, 233.04, 311.06, 262.02, 233.04, 311.06, 262.04, 233.02, 311.12, 233.06, 311.06, 233.02, 262.04, 349.06, 262.06, 233.06, 262.06, 208.12, 233.1, 208.02, 233.06, 208.06, 233.06, 311.06, 233.06, 208.06, 233.06, 349.06, 262.06, 311.06, 262.06, 349.06, 262.04, 233.02, 349.06, 311.12, 349.06, 262.06, 233.06, 262.06, 208.18, 262.06, 233.05, 262.01, 311.06, 233.06, 208.06, 233.06, 349.06, 311.06, 311.06, 233.06, 208.06, 233.06, 262.1, 233.02, 262.06, 208.18, 262.06, 233.05, 262.01, 311.18, 262.04, 233.02, 208.12, 233.06, 311.06, 262.04, 233.02, 311.06, 349.06, 311.06, 349.06, 262.06, 311.06, 262.06, 311.06, 262.06, 349.06, 466.12, 415.1, 349.02, 311.06, 415.1, 349.02, 311.12, 415.1, 349.02, 415.06, 311.06, 415.06, 311.06, 415.04, 349.02, 311.06, 349.06, 311.06, 262.02, 233.04, 311.06, 349.06, 415.06, 415.06, 349.06, 466.06, 415.06, 349.06, 311.06, 349.06, 262.18, 233.05, 262.01, 233.06, 349.06, 311.12, 349.06, 262.06, 233.06, 262.06, 208.12, 233.1, 208.02, 233.06, 208.06, 233.06, 311.06, 233.06, 208.06, 233.06, 311.06, 233.06, 311.06, 262.12, 233.06, 262.12, 208.06, 233.06, 262.1, 233.02, 262.06, 208.06, 262.1, 233.02, 262.06, 208.06, 233.06, 311.06, 233.06, 208.06, 233.06, 262.06, 349.02, 415.04, 349.1, 311.02, 349.1, 311.02, 349.06, 415.1, 349.02, 415.06, 466.06, 415.06, 466.04, 415.02, 349.02, 415.04, 349.1, 311.02, 349.1, 311.02, 349.06, 415.1, 349.02, 415.06, 466.18, 415.1, 349.02, 311.12, 415.1, 349.02, 415.06, 311.06, 349.06, 466.06, 415.06, 349.06, 415.1, 349.02, 415.04, 349.02, 311.06, 262.06, 233.06, 349.06, 311.06, 262.02, 233.04, 311.06, 349.06, 415.06, 415.06, 349.06, 466.06, 415.06, 349.12, 233.06, 262.1, 233.02, 311.06, 262.06, 233.06, 262.1, 233.02, 208.06, 233.06, 262.06, 233.06, 349.06, 415.1, 349.02, 466.06, 415.06, 349.02, 311.04, 415.04, 349.02, 311.3, 415.04, 349.02, 311.12, 415.06, 349.06, 311.06, 208.06, 262.3, 311.06, 262.06, 311.06, 262.06, 311.06, 262.06, 349.02, 415.04, 349.1, 311.02, 349.06, 415.06, 349.02, 311.04, 311.06, 233.06, 208.06, 233.06, 349.06, 311.06, 311.06, 233.06, 311.06, 233.06, 311.06, 349.04, 311.02, 233.06, 311.06, 233.02, 262.04, 349.06, 262.06, 233.06, 262.06, 208.18, 262.06, 233.06, 262.06, 208.18, 262.06, 233.06, 208.06, 262.06, 233.06, 208.06, 262.1, 233.02, 311.06, 349.1, 311.02, 262.12, 233.06, 415.1, 349.02, 415.04, 349.02, 311.06, 262.06, 233.06, 349.06, 311.06, 262.02, 233.04, 311.06, 349.06, 415.06, 415.06, 349.06, 466.06, 415.06, 349.12, 233.06, 262.1, 233.02, 311.06, 262.06, 233.06, 262.1, 233.02, 208.06, 233.06, 262.06, 233.06, 262.06, 208.06, 262.1, 233.02, 262.06, 208.06, 262.06, 208.12, 262.06, 233.05, 262.01, 233.04, 208.02, 349.06, 466.06, 415.06, 349.1, 311.02, 349.06, 415.12, 349.02, 311.04, 415.12, 466.04, 415.02, 311.06, 233.06, 311.06, 262.18, 311.06, 233.06, 311.06, 262.06, 311.06, 262.06, 349.06, 262.1, 233.02, 208.06, 233.06, 208.06, 349.16, 311.02, 415.1, 349.02, 311.06, 415.1, 349.02, 311.12, 415.1, 349.02, 415.06, 311.06, 349.06, 466.06, 415.06, 349.06, 415.1, 349.02, 415.04, 349.02, 311.06, 262.06, 233.06";
  const splitednoteSquenceStr = noteSquenceStr.split(', ');
  const noteSquence = strArr2numArr(splitednoteSquenceStr);

  // 3. note distance matrix
  // todo: distanc matrix 데이터 처리하기 편하게 만들기
  const noteMatrix = [];

  return {
    notes: noteList,
    sequence: noteSquence,
    matrix: noteMatrix
  }
}

function strArr2numArr (strArr) {
  const numArr = [];
  _.forEach(strArr, s => numArr.push(s * 1))
  return numArr;
}