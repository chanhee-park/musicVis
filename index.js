const data = getData();
const arcSect = {
  svg: d3.select('#vis_arc'),
  w: 1200,
  h: 400,
  padding_x: 10,
  padding_y: 10,
}


drawArc(data.sequence, arcSect);