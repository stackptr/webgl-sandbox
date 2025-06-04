import vertexShaderSrc from './shader/vertex.glsl';
import fragmentShaderSrc from './shader/fragment.glsl';

const canvas = document.getElementById("glcanvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl");
if (!gl) throw new Error("WebGL not supported");

// Full-screen triangle (NDC coordinates)
const vertices = new Float32Array([
  -1, -1,
   3, -1,
  -1,  3,
]);

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	throw new Error("Shader compile error: " + gl.getShaderInfoLog(shader));
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vSrc: string, fSrc: string): WebGLProgram {
  const v = compileShader(gl, gl.VERTEX_SHADER, vSrc);
  const f = compileShader(gl, gl.FRAGMENT_SHADER, fSrc);
  const program = gl.createProgram()!;
  gl.attachShader(program, v);
  gl.attachShader(program, f);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	throw new Error("Program link error: " + gl.getProgramInfoLog(program));
  }
  return program;
}

// Setup program
const program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
gl.useProgram(program);

const uResolution = gl.getUniformLocation(program, "u_resolution");
const uTime = gl.getUniformLocation(program, "u_time");

function init() {
  // Set resolution once
  gl.uniform2f(uResolution, canvas.width, canvas.height);
  
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
  const aPosition = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  
  // Draw
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function render(time: number) {
  const seconds = time * 0.001; // convert milliseconds to seconds
  
  // Set the time uniform each frame
  gl.uniform1f(uTime, seconds);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  requestAnimationFrame(render);
}

init();

// Start the animation
requestAnimationFrame(render);