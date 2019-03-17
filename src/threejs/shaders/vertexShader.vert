// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;
uniform float time;
// attribute vec3 position;
// attribute vec3 normal;
varying vec3 vNormal;

void main() {
    vNormal = normalMatrix * position;
    
    vec3 offs = normal * (cos(time)*.5+.6) *.1;

    // mat4 rotMatrix;
    // rotMatrix[0] = vec4(cos(time*0.1), sin(time*0.1), 0.0, 0.0);
    // rotMatrix[1] = vec4(-sin(time*0.1), cos(time*0.1), 0.0, 0.0);
    // rotMatrix[2] = vec4(0.0, 0.0, 1.0, 0.0);
    // rotMatrix[3] = vec4(0.0, 0.0, 0.0, 1.0);
    // gl_Position = projectionMatrix * rotMatrix * modelViewMatrix * vec4(newPos, 1);


    gl_Position =  projectionMatrix *
                modelViewMatrix *
                vec4(position + offs,1.0);
}