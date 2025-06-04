precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = 0.5 + 0.5 * sin(u_time + uv.x * 6.28); // oscillate between 0 and 1
  gl_FragColor = vec4(t, 0.0, 1.0 - t, 1.0); // gradient based on X
}