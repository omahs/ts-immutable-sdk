/* eslint-disable no-console */
import { Web3Provider } from '@ethersproject/providers';
import {
  Checkout,
  IMTBLWidgetEvents,
  TokenFilterTypes,
  TokenInfo,
} from '@imtbl/checkout-sdk';
import {
  Body, Box, MenuItem, OverflowPopoverMenu,
} from '@biom3/react';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { RouteResponse } from '@0xsquid/squid-types';
import { SimpleLayout } from '../../../components/SimpleLayout/SimpleLayout';
import { HeaderNavigation } from '../../../components/Header/HeaderNavigation';
import { amountInputValidation } from '../../../lib/validations/amountInputValidations';
import { TextInputForm } from '../../../components/FormComponents/TextInputForm/TextInputForm';
import { OptionsDrawer } from '../components/OptionsDrawer';
import { EventTargetContext } from '../../../context/event-target-context/EventTargetContext';
import { orchestrationEvents } from '../../../lib/orchestrationEvents';
import { OptionTypes } from '../components/Option';
import { AddFundsActions, AddFundsContext } from '../context/AddFundsContext';
import { getL2ChainId } from '../../../lib';
import { SharedViews, ViewActions, ViewContext } from '../../../context/view-context/ViewContext';

interface AddFundsProps {
  checkout?: Checkout;
  provider?: Web3Provider;
  showOnrampOption?: boolean;
  showSwapOption?: boolean;
  showBridgeOption?: boolean;
  tokenAddress?: string;
  amount?: string;
  onCloseButtonClick?: () => void;
  onBackButtonClick?: () => void;
}

export function AddFunds({
  checkout,
  provider,
  amount,
  tokenAddress,
  showOnrampOption = true,
  showSwapOption = true,
  showBridgeOption = true,
  onBackButtonClick,
  onCloseButtonClick,
}: AddFundsProps) {
  const { addFundsDispatch, addFundsState } = useContext(AddFundsContext);

  const { viewDispatch } = useContext(ViewContext);

  const {
    eventTargetState: { eventTarget },
  } = useContext(EventTargetContext);

  const [showOptionsDrawer, setShowOptionsDrawer] = useState(false);
  const [onRampAllowedTokens, setOnRampAllowedTokens] = useState<TokenInfo[]>([]);
  const [allowedTokens, setAllowedTokens] = useState<TokenInfo[]>([]);
  const [toAmount, setToAmount] = useState<string>(amount || '0');
  const [toTokenAddress, setToTokenAddress] = useState<TokenInfo | undefined>();

  const showErrorView = useCallback(
    (error: Error) => {
      viewDispatch({
        payload: {
          type: ViewActions.UPDATE_VIEW,
          view: {
            type: SharedViews.ERROR_VIEW,
            error,
          },
        },
      });
    },
    [viewDispatch],
  );

  useEffect(() => {
    const { squid } = addFundsState;

    if (!squid || !provider) return;

    const startTime = Date.now();
    const getBalances = async () => {
      const address = await provider.getSigner().getAddress();
      const balances = await squid.getAllBalances({
        chainIds: [1, 10],
        evmAddress: address,
      });
      const positiveBalances = balances?.evmBalances?.filter((balance) => balance.balance !== '0');
      console.log('positiveBalances:', positiveBalances);
      console.log('@@@ balance time', (Date.now() - startTime) / 1000);

      const startTokenDataTime = Date.now();
      const tokenData = await squid.getTokenData('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '1');
      console.log('tokenData:', tokenData);
      console.log('@@@ tokenData time', (Date.now() - startTokenDataTime) / 1000);

      const startTokenPricesDataTime = Date.now();
      const tokenPrices = await squid.getMultipleTokensPrice({ chainId: '1' });
      console.log('tokenPrices:', tokenPrices);
      console.log('@@@ tokenPrices time', (Date.now() - startTokenPricesDataTime) / 1000);

      // const params = {
      //   fromAddress: address,
      //   fromChain: '1',
      //   fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      //   fromAmount: '1000000000000000',
      //   toChain: '10',
      //   toToken: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
      //   toAddress: address,
      //   enableBoost: true,
      // };

      // const paramsList = [
      //   {
      //     fromAddress: address,
      //     fromChain: '1',
      //     fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      //     fromAmount: '1000000000000000000',
      //     toChain: '10',
      //     toToken: '0x0b2c639c533813f4aa9d7837caf62653d097ff85', // USDC
      //     toAddress: address,
      //     enableBoost: true,
      //   },
      //   {
      //     fromAddress: address,
      //     fromChain: '1',
      //     fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      //     fromAmount: '1000000000000000000',
      //     toChain: '10',
      //     toToken: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58', // USDT
      //     toAddress: address,
      //     enableBoost: true,
      //   },
      //   {
      //     fromAddress: address,
      //     fromChain: '1',
      //     fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      //     fromAmount: '1000000000000000000',
      //     toChain: '13371',
      //     toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // IMX
      //     toAddress: address,
      //     enableBoost: true,
      //   },
      //   {
      //     fromAddress: address,
      //     fromChain: '1',
      //     fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      //     fromAmount: '1000000000000000000',
      //     toChain: '13371',
      //     toToken: '0x6de8aCC0D406837030CE4dd28e7c08C5a96a30d2', // USDC
      //     toAddress: address,
      //     enableBoost: true,
      //   },
      //   {
      //     fromAddress: address,
      //     fromChain: '1',
      //     fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      //     fromAmount: '1000000000000000000',
      //     toChain: '13371',
      //     toToken: '0xb00ed913aAFf8280C17BfF33CcE82fE6D79e85e8', // GOG
      //     toAddress: address,
      //     enableBoost: true,
      //   },
      // ];

      const paramsList = [
        {
          fromAddress: address,
          fromChain: '10',
          fromToken: '0x0b2c639c533813f4aa9d7837caf62653d097ff85', // USDC
          fromAmount: '1000000000000000',
          toChain: '1',
          toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // USDC
          toAddress: address,
          enableBoost: true,
        },
        {
          fromAddress: address,
          fromChain: '10',
          fromToken: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58', // USDT
          toChain: '1',
          toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          fromAmount: '1000000000000000',
          toAddress: address,
          enableBoost: true,
        },
        {
          fromAddress: address,
          fromChain: '13371',
          fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // IMX
          toChain: '1',
          toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          fromAmount: '1000000000000000',
          toAddress: address,
          enableBoost: true,
        },
        {
          fromAddress: address,
          fromChain: '13371',
          fromToken: '0x6de8aCC0D406837030CE4dd28e7c08C5a96a30d2', // USDC
          toChain: '1',
          toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          fromAmount: '1000000000000000',
          toAddress: address,
          enableBoost: true,
        },
        {
          fromAddress: address,
          fromChain: '13371',
          fromToken: '0xb00ed913aAFf8280C17BfF33CcE82fE6D79e85e8', // GOG
          toChain: '1',
          toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          fromAmount: '1000000000000000',
          toAddress: address,
          enableBoost: true,
        },
      ];

      const startRouteDataTime = Date.now();
      const quoteRequests: Promise<RouteResponse>[] = [];
      paramsList.map((param) => quoteRequests.push(squid.getRoute(param)));

      const responses = await Promise.allSettled(
        quoteRequests,
      );

      // const { route, requestId } = await squid.getRoute(params);
      console.log('Calculated route:', responses);
      console.log('@@@ Route time', (Date.now() - startRouteDataTime) / 1000);
    };

    getBalances();
  }, [provider, addFundsState.squid]);

  useEffect(() => {
    if (!checkout) {
      showErrorView(new Error('Checkout object is missing'));
      return;
    }

    const fetchTokens = async () => {
      try {
        const tokenResponse = await checkout.getTokenAllowList({
          type: TokenFilterTypes.SWAP,
          chainId: getL2ChainId(checkout.config),
        });

        if (tokenResponse?.tokens.length > 0) {
          setAllowedTokens(tokenResponse.tokens);

          const token = tokenResponse.tokens.find((t) => t.address === tokenAddress) || tokenResponse.tokens[0];
          setToTokenAddress(token);

          addFundsDispatch({
            payload: {
              type: AddFundsActions.SET_ALLOWED_TOKENS,
              allowedTokens: tokenResponse.tokens,
            },
          });
        }
      } catch (error) {
        showErrorView(new Error('Failed to fetch tokens'));
      }
    };

    fetchTokens();
  }, [checkout, tokenAddress]);

  useEffect(() => {
    if (!checkout) {
      showErrorView(new Error('Checkout object is missing'));
      return;
    }

    const fetchOnRampTokens = async () => {
      try {
        const tokenResponse = await checkout.getTokenAllowList({
          type: TokenFilterTypes.ONRAMP,
          chainId: getL2ChainId(checkout.config),
        });

        if (tokenResponse?.tokens.length > 0) {
          setOnRampAllowedTokens(tokenResponse.tokens);
        }
      } catch (error) {
        showErrorView(new Error('Failed to fetch onramp tokens'));
      }
    };
    fetchOnRampTokens();
  }, [checkout]);

  const openDrawer = () => {
    setShowOptionsDrawer(true);
  };

  const updateAmount = (value: string) => {
    setToAmount(value);
  };

  const isSelected = (token: TokenInfo) => token.address === toTokenAddress;

  const isDisabled = !toTokenAddress || !toAmount || parseFloat(toAmount) <= 0;

  const handleTokenChange = (token: TokenInfo) => {
    setToTokenAddress(token);
  };

  // const handleReviewClick = () => {
  //   console.log('handle review click');
  // };

  const onPayWithCard = (paymentType: OptionTypes) => {
    console.log('paymentType', paymentType);
    console.log('=== toTokenAddress', toTokenAddress);
    console.log('=== toAmount', toAmount);

    if (paymentType === OptionTypes.SWAP) {
      orchestrationEvents.sendRequestSwapEvent(
        eventTarget,
        IMTBLWidgetEvents.IMTBL_ADD_FUNDS_WIDGET_EVENT,
        {
          toTokenAddress: toTokenAddress?.address ?? '',
          amount: toAmount ?? '',
          fromTokenAddress: '',
        },
      );
    } else {
      const data = {
        tokenAddress: toTokenAddress?.address ?? '',
        amount: toAmount ?? '',
      };
      orchestrationEvents.sendRequestOnrampEvent(
        eventTarget,
        IMTBLWidgetEvents.IMTBL_ADD_FUNDS_WIDGET_EVENT,
        data,
      );
    }
  };

  const checkShowOnRampOption = () => {
    if (showOnrampOption && toTokenAddress) {
      const token = onRampAllowedTokens.find((t) => t.address?.toLowerCase() === toTokenAddress.address?.toLowerCase());
      return !!token;
    }
    return false;
  };

  return (
    <SimpleLayout
      header={(
        <HeaderNavigation
          title="Add"
          onBackButtonClick={onBackButtonClick}
          onCloseButtonClick={onCloseButtonClick}
          showBack={!!onBackButtonClick}
        />
            )}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'base.spacing.x10',
          }}
        >
          <Box sx={{ width: 'base.spacing.x40' }}>
            <Box sx={{ marginBottom: 'base.spacing.x3' }}>
              <TextInputForm
                testId="add-funds-amount"
                type="number"
                value={toAmount}
                validator={amountInputValidation}
                onTextInputChange={(value) => updateAmount(value)}
                textAlign="right"
                inputMode="decimal"
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                borderRadius: 'base.borderRadius.x20',
                alignItems: 'center',
                gap: 'base.spacing.x5',
                justifyContent: 'center',
                border: '1px solid grey',

              }}
            >
              <Body size="large" weight="bold">
                {toTokenAddress?.name ?? ''}
              </Body>
              <OverflowPopoverMenu testId="add-funds-tokens-menu">
                {allowedTokens.map((token: any) => (
                  <MenuItem
                    key={token.address}
                    onClick={() => handleTokenChange(token)}
                    selected={isSelected(token)}
                  >
                    <MenuItem.Label>{token.name}</MenuItem.Label>
                  </MenuItem>
                ))}
              </OverflowPopoverMenu>
            </Box>
          </Box>
        </Box>

        <MenuItem
          size="small"
          emphasized
          disabled={isDisabled}
          sx={{
            opacity: isDisabled ? 0.5 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
          }}
          onClick={() => {
            openDrawer();
          }}
        >
          <MenuItem.IntentIcon icon="ChevronExpand" />
          <MenuItem.Label size="medium">Choose payment option</MenuItem.Label>
        </MenuItem>
        <Box
          sx={{
            marginBottom: 'base.spacing.x10',
          }}
        >
          <OptionsDrawer
            showOnrampOption={checkShowOnRampOption()}
            showSwapOption={showSwapOption}
            showBridgeOption={showBridgeOption}
            visible={showOptionsDrawer}
            onClose={() => setShowOptionsDrawer(false)}
            onPayWithCard={onPayWithCard}
          />
        </Box>
        {/* <Button
          testId="add-funds-button"
          variant="primary"
          onClick={handleReviewClick}
          size="large"
          sx={{
            marginBottom: 'base.spacing.x10',
            mx: 'base.spacing.x3',
          }}
        >
          Review
        </Button> */}
      </Box>
    </SimpleLayout>
  );
}
