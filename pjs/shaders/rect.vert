#version 300 es

in vec3 aPosition;

void main(){
  gl_Position = vec4(aPosition.xy*2.-1.,1,1);
}