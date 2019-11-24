const data = getData();

function colorMap (val) {
  // https://github.com/d3/d3-scale-chromatic
  return d3.interpolateWarm(val);
}

const squenceSection = {
  svg: d3.select('#vis_squence'),
  w: 1200,
  h: 150,
  padding_x: 10,
  padding_y: 5,
}

const networkSection = {
  container: document.getElementById('vis_network'),
  w: 1200,
  h: 300,
  padding_x: 10,
  padding_y: 10,
}

drawSquence(data.sequence, squenceSection);
drqwNetwork(data.matrix, data.notes, data.sequence, networkSection);