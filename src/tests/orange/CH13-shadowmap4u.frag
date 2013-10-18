//
// Fragment shader for shadow mapping using four uniform samples
//
// Author: Philip Rideout
//
// Copyright (c) 2003-2006: 3Dlabs, Inc.
//
// See 3Dlabs-License.txt for license information
//

uniform sampler2DShadow ShadowMap;
uniform float Epsilon;
uniform bool  SelfShadowed;
uniform float SelfShadowedVal;
uniform float NonSelfShadowedVal;

varying vec3 ShadowCoord;

float Illumination;

float lookup(float x, float y)
{
    float depth = shadow2D(ShadowMap, 
                       ShadowCoord + vec3(x, y, 0) * Epsilon).x;
    return depth != 1.0 ? Illumination : 1.0;
}

 
void main()
{
    // lighten up the self-shadows
    Illumination = SelfShadowed ? SelfShadowedVal : NonSelfShadowedVal;

    float sum = 0.0;

    sum += lookup(-0.5, -0.5);
    sum += lookup( 0.5, -0.5);
    sum += lookup(-0.5,  0.5);
    sum += lookup( 0.5,  0.5);

    gl_FragColor = vec4(sum * 0.25 * gl_Color.rgb, gl_Color.a);
}