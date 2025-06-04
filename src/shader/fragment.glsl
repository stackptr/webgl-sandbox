precision mediump float;

uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = uv.x;
  gl_FragColor = vec4(t, 0.0, 1.0 - t, 1.0); // gradient based on X
}