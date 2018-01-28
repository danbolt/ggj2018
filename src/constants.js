var Directions = {
  EAST : 0,
  SOUTH : 1,
  WEST : 2,
  NORTH : 3,

  COUNT : 4,
};

// Add the .WAV file names in asset/sfx here. They will be loaded in the `load.js` file.
var soundEffectsToLoad = ['death', 'download', 'win', 'cat0', 'cat1', 'cat2', 'select'];
var SoundBank = {};

// json files from asset/maps
var levelsToLoad = [
  'sandbox',
  'slime_world',
  'push_maze',
  'gauntlet',
  'spiral',
  'cake_walk',
];

var fragSrc =
    `precision mediump float;
     varying vec2 vTextureCoord;
     varying vec4 vColor;
     uniform float time;
     uniform sampler2D uSampler;

     void main( void ) {
        vec2 pos = vTextureCoord;
        vec2 center = vec2(0.5, 0.5);

        if (sin(time / 2.0) > 0.8) {
          if (pos.y > (0.85 + (cos(time) * 0.02) + 0.03 * sin(time * 5.0))) {
            pos.x = pos.x + 0.01 + sin(time * 5.0) * 0.01;
          }
          
          pos.y = pos.y + (0.004 * cos(time * 6.7));
        }
        
        float theta = atan(pos.y - center.y, pos.x - center.x) ;
        float d = length(pos - center) - 0.009;

        pos = vec2(d * cos(theta) + center.x, d * sin(theta) + center.y);
        
        gl_FragColor = (mod(gl_FragCoord.y,2.0) * texture2D(uSampler, pos) + (6.0 * texture2D(uSampler, pos))) / 7.0;

      }
    `;