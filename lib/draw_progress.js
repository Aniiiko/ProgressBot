const Canvas = require('canvas');

async function draw_progress(progress) {
  const canvas = Canvas.createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  // const background = await Canvas.loadImage('images/bg.png');
  // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  let start = 4.72;
  let cw = canvas.width/2;
  let ch = canvas.height/2;

  let diff = (progress/100)*Math.PI*2;
  ctx.beginPath();
  ctx.arc(cw, ch, 90, 0, 2*Math.PI, false);
  ctx.fillStyle = "rgba(203, 194, 209, 0.2)";
  ctx.fill();
  ctx.strokeStyle = '#e7f2ba';
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#b3cf3c';
  ctx.textAlign = 'center';
  ctx.lineWidth = 16;
  ctx.font = '32pt Verdana';
  ctx.beginPath();
  ctx.arc(cw, ch, 90, start, diff+start, false);
  ctx.stroke();
  ctx.fillText(progress+'%', cw+2, ch+15);

  return canvas.toBuffer();
}

module.exports = {
  draw_progress
}