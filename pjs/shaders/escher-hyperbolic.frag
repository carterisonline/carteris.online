#version 300 es
#define u gl_FragCoord.xy

precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;

// golfing 1287 chars https://shadertoy.com/view/Wt2cWm
        
int[] T = int[](6,0,9,2,12,5,6,10,0,20,  6,26,  12,20,11,17,14,17,17,18,15,22,11,26,16,26,22,18,22,27,25,28,28,30,30,26
            ,26,24,28,21,29,18,38,18,30,12,30,7,34,11,38,13,39,10,39,7,36,8,  30,2,    24,8,14,2,9,-4,6,-1,4,2, 6,0 ); // 72

out vec4 O;
  
void main() {
    vec2 R = iResolution.xy, D = vec2(6,2),
         m = 2.* iMouse.xy / R,  a,b,p,
         U = (u - .5*R) / R.y , z = U + vec2(1,0), 
         g = vec2(30,26);   
    float w, s,c,d=1e3,e=d;  int n = 0, k = 0;
    
    U *= mat2(z,-z.y,z) / dot(U,U);                      // Moebius spiral
    U += .5;
    w = atan(U.y, U.x) / 6.283;
	U =  m + log(length(U)) *vec2(.5,-1) + iTime/20.  + w*D;
    
    a = dFdx(U) - ( abs(s= dFdx(w)) > .5 ? D*sign(s) : R-R ), // eliminate atan discont, see  https://www.shadertoy.com/view/WlScRW
    b = dFdy(U) - ( abs(c= dFdy(w)) > .5 ? D*sign(c) : R-R );         
  //w = 48.* 2.*sqrt(abs(determinant(mat2(dFx,dFy)))); 
  //w = 72.* (abs(dFx)+abs(dFy)).x; 
    w = 72.* length(vec4(a,b)); 
    
    U = 48.*fract( U ) - g;                              // tiles
    
    for (int r=0; r < 4; r++)
    {   
        m = mod(U+g+8.,48.)-8.;
        U = vec2(-U.y,U.x); 
        for (int i=0; i <  70; i+=2 )  // T.length()-2   // draw tiles
            a = vec2(T[i  ],T[i+1]),
            b = vec2(T[i+2],T[i+3]) - a,
            p = m - a, 
            c = clamp( s = dot(p,b)/dot(b,b), 0.,1.),
            d = min( d, length( p - b*c )),              // border
            c = clamp ( s = p.y/b.y, 0.,1.),             // shape filing
            c == s && s * b.x > p.x ? n++ : 0;
        
        e = min(e, min(length(m-vec2(7.8,20)),length(m-vec2(4.5,20)))-.8); // eye
        
        if (n%2>0) k=r, n=0;                             // checkered fill flag
    }

    e = max(0.,1. - abs(e)/w);
    O = .5 + vec4( k%2 > 0 ? 1. - e : e ) - max(0.,1.-abs(d)/w); 
}

