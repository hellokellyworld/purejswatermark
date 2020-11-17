import { mergeDeep } from 'timm';

// import blit from '@jimp/plugin-blit';
// import blur from '@jimp/plugin-blur';
// import circle from '@jimp/plugin-circle';
// import color from '@jimp/plugin-color';
// import contain from '@jimp/plugin-contain';
// import cover from '@jimp/plugin-cover';
// import crop from '@jimp/plugin-crop';
// import displace from '@jimp/plugin-displace';
// import dither from '@jimp/plugin-dither';
// import fisheye from '@jimp/plugin-fisheye';
// import flip from '@jimp/plugin-flip';
// import gaussian from '@jimp/plugin-gaussian';
// import invert from '@jimp/plugin-invert';
// import mask from '@jimp/plugin-mask';
// import normalize from '@jimp/plugin-normalize';

// import rotate from '@jimp/plugin-rotate';
// import scale from '@jimp/plugin-scale';
// import shadow from '@jimp/plugin-shadow';
// import threshold from '@jimp/plugin-threshold';


import print from "../../plugin-print/src/index.js"//'@jimp/plugin-print';
import resize from "../../plugin-resize/src/index.js"//'@jimp/plugin-resize';
import color from "../../plugin-color/src/index.js"//'@jimp/plugin-color';
import blit from "../../plugin-blit/src/index.js"//'@jimp/plugin-blit';

const plugins = [
  blit,
  color,
  print,
  resize,

  // blur,
  // circle,
 
  // contain,
  // cover,
  // crop,
  // displace,
  // dither,
  // fisheye,
  // flip,
  // gaussian,
  // invert,
  // mask,
  // normalize,
  
  // rotate,
  // scale,
  // shadow,
  // threshold
];

export default jimpEvChange => {
  const initializedPlugins = plugins.map(pluginModule => {
    let plugin = pluginModule(jimpEvChange) || {};

    if (!plugin.class && !plugin.constants) {
      // Default to class function
      plugin = { class: plugin };
    }

    return plugin;
  });

  return mergeDeep(...initializedPlugins);
};
