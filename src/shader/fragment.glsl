precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  const float freq = 1.5;

  vec2 uv = gl_FragCoord.xy / u_resolution;

  float t = 0.5 + 0.5 * sin((uv.x + u_time) * freq); // oscillate between 0 and 1
  
  vec3 color_1 = vec3(0.7, 0.1, 0.4); // mulberry
  vec3 color_2 = vec3(0.9, 0.6, 0.1); // marigold
  vec3 color = mix(color_1, color_2, t);

  gl_FragColor = vec4(color, 1.0); // gradient based on X
}