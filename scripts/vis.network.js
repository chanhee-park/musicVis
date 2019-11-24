function drqwNetwork (matrix, notes, sequence, section) {
  const container = section.container;
  const networkData = getNetworkData(matrix, notes, sequence);
  const myEdge = getMyEdge(sequence);
  // Matrix 데이터 생성 방법 확인 후 -> 아래 Edge 교체가 필요함
  networkData.edges = myEdge;
  const options = {
    nodes: {
      shape: 'dot',
      scaling: {
        customScalingFunction: function (min, max, total, value) {
          return value / total;
        },
        min: 5,
        max: 150
      }
    }
  };

  const network = new vis.Network(container, networkData, options);
  network.on("click", function (params) {
    const queries = [];
    if (params.edges.length > 0) {
      _.forEach(params.edges, e => {
        const e1 = e.split('-')[0];
        const e2 = e.split('-')[1];
        const from = e1 < e2 ? e1 : e2;
        const to = e1 < e2 ? e2 : e1;
        queries.push({ from, to })
      })
    }
    drawSquence(data.sequence, squenceSection, queries);
  });

  console.log(networkData);
}

function getNetworkData (matrix, notes, sequence) {
  const noteIds = _.map(notes, 'id');
  const sequenceIds = _.map(sequence, 'id');
  const countSet = getCountSet(sequenceIds);

  // 노드 정의
  const nodes = [];

  // 각 노트의 음 높이에 따른 Y축 간격 정의하기
  const frequencies = _.map(sequence, 'frequency');
  const min = _.min(frequencies) * 0.9;
  const max = _.max(frequencies) * 1.1;
  const distance = max - min;

  const getRelVal = function (frequency) {
    return relVal = (frequency - min) / (distance); // 0 ~ 1
  }

  const getColor = function (frequency) {
    const relVal = getRelVal(frequency);
    return colorMap(relVal);
  }

  _.forEach(notes, note => {
    // 등장 횟수로 사이즈 정하기
    // const value = _.isUndefined(countSet[note.id]) ? 1 : countSet[note.id];
    nodes.push({
      id: note.id,
      color: getColor(note.frequency),
      value: note.duration,
      // value: value,
      label: `${note.frequency} / ${note.duration}`
    })
  });

  // 엣지 정의
  const edges = [];
  for (let fromIdx = 0; fromIdx < 38; fromIdx++) {
    for (let toIdx = fromIdx; toIdx < 39; toIdx++) {
      const from = noteIds[fromIdx];
      const to = noteIds[toIdx];
      edges.push({
        id: `${from}-${to}`,
        from: from,
        to: to,
        value: matrix[fromIdx][toIdx],
      });
    }
  }
  // 값 조정 필요. 나이브하게 지정함 (nodes 39개 / edges 41개)
  const cuttedEdges = _.filter(edges, e => e.value >= 2.6);

  return { nodes: nodes, edges: cuttedEdges };
}

function getCountSet (arr) {
  var a = [], b = [], prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  const ret = {};
  _.forEach(a, (e, i) => ret[e] = b[i]);

  return ret;
}

function getMyEdge (sequence) {
  const edges = [];
  const occurred = [];

  for (let i = 0; i < sequence.length - 1; i++) {
    const curr = sequence[i].id;
    const next = sequence[i + 1].id;
    const from = curr < next ? curr : next;
    const to = curr < next ? next : curr;

    const id = `${from}-${to}`;
    if (occurred.indexOf(id) >= 0) {
      edges[occurred.indexOf(id)].value++;
    } else {
      occurred.push(id);
      edges.push({
        id, from, to,
        value: 1,
      });
    }
  }

  // Edge 103개
  // Cut Value 3 일 때 Edeg 44개
  // Cut Value 4 일 때 Edeg 32개
  // Cut Value 5 일 때 Edeg 29개
  const cuttedEdges = _.filter(edges, e => e.value >= 5);

  return cuttedEdges;
}