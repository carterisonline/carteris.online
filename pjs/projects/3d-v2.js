
stroke(0, 0, 0);

var BLACK = color(255, 255, 255);
var faceColor = color(80, 80, 250);
var lightVector =[0.5, -0.2, -2];
var backgroundLight = 0.1;

var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x,     y,     z], [x,     y,     z + d],
                 [x,     y + h, z], [x,     y + h, z + d],
                 [x + w, y,     z], [x + w, y,     z + d],
                 [x + w, y + h, z], [x + w, y + h, z + d]];
                 
    var faces= [[0, 1, 3, 2], [1, 0, 4, 5],
                [0, 2, 6, 4], [3, 1, 5, 7],
                [5, 4, 6, 7], [2, 3, 7, 6]];
    return { 'nodes': nodes, 'faces': faces };
};

var box1 = createCuboid(-100, -100, -100, 200, 200, 200);
var box2 = createCuboid(100, -47, -42, 200, 81, 95);
var box3 = createCuboid(-300, -47, -42, 200, 81, 95);
var box4 = createCuboid(300, -77, -42, 50, 140, 95);
var box5 = createCuboid(-350, -77, -42, 50, 140, 95);

var objects = [box1,box2,box3,box4,box5];

var subtractVectors = function(v1, v2){
    return [[v1[0] - v2[0]],
            [v1[1] - v2[1]],
            [v1[2] - v2[2]]];
};

var normaliseVector = function(v) {
    var d = sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    return [v[0]/d, v[1]/d, v[2]/d];
};

var normalOfPlane = function(face, nodes) {
    var n1 = nodes[face[0]];
    var n2 = nodes[face[1]];
    var n3 = nodes[face[2]];
    
    var v1 = subtractVectors(n1, n2);
    var v2 = subtractVectors(n1, n3);
    
    var v3 = [[v1[1]*v2[2] - v1[2]*v2[1]],
              [v1[2]*v2[0] - v1[0]*v2[2]],
              [v1[0]*v2[1] - v1[1]*v2[0]]];
              
    return v3;
};

var dotProduct = function(v1, v2){
    // Assume everything has 3 dimensions
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
};

var translate3D = function(x, y, z, nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i] = [nodes[i][0] + x, nodes[i][1] + y, nodes[i][2] + z];
    }
};

var rotateY3D = function(theta, nodes) {
    var ct = cos(theta);
    var st = sin(theta);
    var x, y, z;

    for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [ct*x + st*z, y, -st*x + ct*z];
    }
};

var rotateX3D = function(theta, nodes){
    var ct = cos(theta);
    var st = sin(theta);
    var x, y, z;
    
    for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [x, ct*y - st*z, st*y + ct*z];
    }
};

lightVector = normaliseVector(lightVector);

var draw = function() {
    var i;
    pushMatrix();
    translate(300, 300);
    var face, nodes, node1, node2;
    
    background(255, 255, 255);

    for (var o in objects) {
        var obj = objects[o];
        nodes = obj.nodes;
        
        if ('edges' in obj) {
            var edges = obj.edges;
        
            for (i = 0; i < edges.length; i+=1) {
                node1 = nodes[edges[i][0]];
                node2 = nodes[edges[i][1]];
                line(node1[0], node1[1], node2[0], node2[1]);
            }     
        }
        
        if ('faces' in obj) {
            for (var f in obj.faces) {
                face = obj.faces[f];
                var fnorm = normalOfPlane(face, nodes);
                
                if (fnorm[2] < 0) {
                    var l = max(0, dotProduct(lightVector, normaliseVector(fnorm)));
                    l = backgroundLight + (1 - backgroundLight) * l;
                    var c = lerpColor(BLACK, faceColor, l);
                    fill(c);
                      
                    if (face.length === 3) {
                        triangle(nodes[face[0]][0], nodes[face[0]][1],
                                 nodes[face[1]][0], nodes[face[1]][1],
                                 nodes[face[2]][0], nodes[face[2]][1]);
                    } else {
                        quad(nodes[face[0]][0], nodes[face[0]][1],
                             nodes[face[1]][0], nodes[face[1]][1],
                             nodes[face[2]][0], nodes[face[2]][1],
                             nodes[face[3]][0], nodes[face[3]][1]);
                    }
                }
            }
        }
        
    }
    popMatrix();
};

var mouseDragged = function() {
    var dx =  0.5 * (mouseX - pmouseX);
    var dy = -0.5 * (mouseY - pmouseY);
    
    for (var obj = 0; obj < objects.length; obj++) {
        var nodes = objects[obj].nodes;
        rotateY3D(dx, nodes);
        rotateX3D(dy, nodes);
    }
};

var keyPressed = function() {
    var f = 0;
    var d = 0;
    if (keyCode === LEFT) {
        f = rotateY3D;
        d = -2;
    } else if (keyCode === RIGHT) {
        f = rotateY3D;
        d = 2;
    } else if (keyCode === UP) {
        f = rotateX3D;
        d = 2;
    } else if (keyCode === DOWN) {
        f = rotateX3D;
        d = -2;
    }
    
    if (f !== 0) {
        for (var obj in objects) {
            f(d, objects[obj].nodes); 
        }
    }
};