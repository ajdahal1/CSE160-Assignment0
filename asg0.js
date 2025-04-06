let canvas, ctx;

function main() {
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');

  // Initial black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Optional: draw a default vector
  let v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(ctx, v1, "red");
}

function drawVector(ctx, v, color) {
  ctx.beginPath();
  ctx.moveTo(200, 200); // Canvas center

  let x = v.elements[0] * 20;
  let y = v.elements[1] * 20;

  ctx.lineTo(200 + x, 200 - y); // Flip y axis
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function handleDrawEvent() {
  // 1. Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Read values
  const x = parseFloat(document.getElementById('xVal').value);
  const y = parseFloat(document.getElementById('yVal').value);
  const v1 = new Vector3([x, y, 0]);

  // 3. Draw vector
  drawVector(ctx, v1, "red");

  const x2 = parseFloat(document.getElementById('x2Val').value);
  const y2 = parseFloat(document.getElementById('y2Val').value);
  const v2 = new Vector3([x2, y2, 0]);

  drawVector(ctx, v2, "blue");

}
function handleDrawOperationEvent() {
  // Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get vectors
  const x1 = parseFloat(document.getElementById('xVal').value);
  const y1 = parseFloat(document.getElementById('yVal').value);
  const v1 = new Vector3([x1, y1, 0]);

  const x2 = parseFloat(document.getElementById('x2Val').value);
  const y2 = parseFloat(document.getElementById('y2Val').value);
  const v2 = new Vector3([x2, y2, 0]);

  // Draw original v1 and v2
  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");

  const operation = document.getElementById('operationSelect').value;
  const scalar = parseFloat(document.getElementById('scalarVal').value);

  if (operation === "add") {
    let v3 = new Vector3(v1.elements).add(v2);
    drawVector(ctx, v3, "green");
  } else if (operation === "sub") {
    let v3 = new Vector3(v1.elements).sub(v2);
    drawVector(ctx, v3, "green");
  } else if (operation === "mul") {
    let v3 = new Vector3(v1.elements).mul(scalar);
    let v4 = new Vector3(v2.elements).mul(scalar);
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");
  } else if (operation === "div") {
    let v3 = new Vector3(v1.elements).div(scalar);
    let v4 = new Vector3(v2.elements).div(scalar);
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");
  } else if (operation === "magnitude") {
    console.log("v1 magnitude:", v1.magnitude());
    console.log("v2 magnitude:", v2.magnitude());
  } else if (operation === "normalize") {
    let v3 = new Vector3(v1.elements).normalize();
    let v4 = new Vector3(v2.elements).normalize();
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");
  } else if (operation === "angle") {
    angleBetween(v1, v2);
  } else if (operation === "area") {
    areaTriangle(v1, v2);
  }
}

function angleBetween(v1, v2) {
  const dotProduct = Vector3.dot(v1, v2);
  const mag1 = v1.magnitude();
  const mag2 = v2.magnitude();

  if (mag1 === 0 || mag2 === 0) {
    console.log("One of the vectors has magnitude 0 — angle is undefined.");
    return;
  }

  const cosTheta = dotProduct / (mag1 * mag2);
  const clampedCos = Math.min(1, Math.max(-1, cosTheta)); // Clamp to avoid NaN due to floating point errors
  const angleRad = Math.acos(clampedCos);
  const angleDeg = angleRad * (180 / Math.PI); // Convert to degrees

  console.log(`Angle: ${Math.round(angleDeg)}`);

}
function areaTriangle(v1, v2) {
  const crossVec = Vector3.cross(v1, v2);
  const areaParallelogram = crossVec.magnitude();
  const areaTriangle = areaParallelogram / 2;
  console.log(`Area: ${areaTriangle}`);
}



