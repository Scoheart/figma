import devConfig from './rollup.config.dev.js';
import prodConfig from './rollup.config.prod.js';

const rolupConfig = ({ ENV }) => {
  switch (ENV) {
    case 'dev':
      return devConfig;
    case 'prod':
      return prodConfig;
  }
};

export default rolupConfig;
