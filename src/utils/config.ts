import { Configuration, ConfigurationParameters } from '../api';
import { ImmutableXConfiguration, L1Configuration } from '../types';
import { version } from '../../package.json';

const defaultHeaders = { 'x-sdk-version': `imx-core-sdk-ts-${version}` };

interface Environment extends L1Configuration {
  basePath: string;
  headers?: Record<string, string>;
}

export const getConfig = ({
  coreContractAddress,
  registrationContractAddress,
  chainID,
  basePath,
  headers,
}: Environment): ImmutableXConfiguration => {
  if (!basePath.trim()) {
    throw Error('basePath can not be empty');
  }

  headers = { ...(headers || {}), ...defaultHeaders };
  const apiConfigOptions: ConfigurationParameters = {
    basePath,
    baseOptions: { headers },
  };

  return {
    apiConfiguration: new Configuration(apiConfigOptions),
    l1Configuration: {
      coreContractAddress,
      registrationContractAddress,
      chainID,
    },
  };
};

export const Config = {
  get production() {
    return getConfig({
      basePath: 'https://api.ropsten.x.immutable.com',
      chainID: 3,
      coreContractAddress: '0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef',
      registrationContractAddress: '0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864',
    });
  },

  get sandbox() {
    return getConfig({
      basePath: 'https://api.ropsten.x.immutable.com',
      chainID: 3,
      coreContractAddress: '0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef',
      registrationContractAddress: '0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864',
    });
  },

  creatConfig: getConfig,
};
