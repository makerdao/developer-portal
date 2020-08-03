import Maker from '@makerdao/dai';
import governancePlugin from '@makerdao/dai-plugin-governance';
// import customPlugin from './plugin/index';

let maker;

export async function instantiateMaker(network) {
  const config = {
    log: true,
    autoAuthenticate: false,
    plugins: [[governancePlugin, { network }]],
    // [customPlugin, { customOption: 'test' }]], // config options can be passed to your plugin like this
  };

  maker = await Maker.create('browser', config);

  window.maker = maker; // for debugging
  return maker;
}
