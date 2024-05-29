import { x, config } from '@imtbl/sdk';
import { Wallet } from '@ethersproject/wallet';
import { EtherscanProvider } from '@ethersproject/providers';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ProviderConfiguration,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GenericIMXProvider,
  createStarkSigner,
} = x;

const ethNetwork = 'mainnet'; // Or 'mainnet'
const etherscanAPIKey = process.env.ETHERSCAN_API_KEY || '';
const ethPrivateKey = process.env.PRIVATE_KEY || '';

(async () => {
  try {
    // Create Ethereum signer
    const provider = new EtherscanProvider(ethNetwork, etherscanAPIKey);
    const ethSigner = new Wallet(ethPrivateKey).connect(provider);

    // Create STARK signer
    const starkPrivateKey = await x.imxClientGenerateLegacyStarkPrivateKey(ethSigner);
    const starkSigner = createStarkSigner(starkPrivateKey);
    console.log('stark pub key', await starkSigner.getAddress());

    // Initialize provider
    const providerConfig = new ProviderConfiguration({
      baseConfig: new config.ImmutableConfiguration({ environment: config.Environment.PRODUCTION }),
    });

    const imxProvider = new GenericIMXProvider(
      providerConfig,
      ethSigner,
      starkSigner,
    );

    const resp = await imxProvider.completeWithdrawal(
      await starkSigner.getAddress(),
      {
        type: 'ERC20',
        tokenAddress: '0xf57e7e7c23978c3caec3c3548e3d615c346e79ff', // IMX
      },
    );
    console.log('complete withdrawal response', resp);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
