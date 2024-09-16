/* eslint-disable no-console */
import { AddFundsWidgetParams, Checkout, ChainId } from '@imtbl/checkout-sdk';
import { Web3Provider } from '@ethersproject/providers';
import {
  useContext, useEffect, useMemo, useReducer,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  sendAddFundsCloseEvent,
  sendAddFundsGoBackEvent,
} from './AddFundsWidgetEvents';
import { EventTargetContext } from '../../context/event-target-context/EventTargetContext';

import {
  AddFundsActions,
  AddFundsContext,
  addFundsReducer,
  initialAddFundsState,
} from './context/AddFundsContext';
import { AddFundsWidgetViews } from '../../context/view-context/AddFundsViewContextTypes';
import {
  initialViewState,
  SharedViews,
  ViewContext,
  viewReducer,
} from '../../context/view-context/ViewContext';
import { AddFunds } from './views/AddFunds';
import { ErrorView } from '../../views/error/ErrorView';
import { useSquid } from './hooks/useSquid';
import {
  useAnalytics,
  UserJourney,
} from '../../context/analytics-provider/SegmentAnalyticsProvider';
import { fetchChains } from './functions/fetchChains';

export type AddFundsWidgetInputs = AddFundsWidgetParams & {
  checkout: Checkout;
  web3Provider?: Web3Provider;
};

export default function AddFundsWidget({
  checkout,
  web3Provider,
  showOnrampOption = true,
  showSwapOption = true,
  showBridgeOption = true,
  toTokenAddress,
  toAmount,
}: AddFundsWidgetInputs) {
  const [viewState, viewDispatch] = useReducer(viewReducer, {
    ...initialViewState,
    view: { type: AddFundsWidgetViews.ADD_FUNDS },
    history: [{ type: AddFundsWidgetViews.ADD_FUNDS }],
  });
  const { t } = useTranslation();
  const { page } = useAnalytics();

  const viewReducerValues = useMemo(
    () => ({
      viewState,
      viewDispatch,
    }),
    [viewState, viewReducer],
  );

  const [addFundsState, addFundsDispatch] = useReducer(
    addFundsReducer,
    initialAddFundsState,
  );

  const addFundsReducerValues = useMemo(
    () => ({
      addFundsState,
      addFundsDispatch,
    }),
    [addFundsState, addFundsDispatch],
  );

  const squid = useSquid(checkout);

  useEffect(() => {
    (async () => {
      const chains = await fetchChains();
      console.log('!!!!chains', chains);

      addFundsDispatch({
        payload: {
          type: AddFundsActions.SET_CHAINS,
          chains,
        },
      });
    })();
  }, []);

  useEffect(() => {
    if (
      !addFundsState.squid
      || !addFundsState.chains
      || !addFundsState.provider
    ) return;

    (async () => {
      const chainIds = addFundsState.chains.map((chain) => chain.id);
      const fromAddress = await addFundsState.provider
        ?.getSigner()
        .getAddress();

      const balances = await addFundsState.squid?.getAllBalances({
        chainIds,
        evmAddress: fromAddress,
      });
      const positiveBalances = balances?.evmBalances?.filter(
        (balance) => balance.balance !== '0',
      );

      console.log('!!!!balance', positiveBalances);
      addFundsDispatch({
        payload: {
          type: AddFundsActions.SET_BALANCES,
          balances: positiveBalances ?? [],
        },
      });
    })();
  }, [addFundsState.squid, addFundsState.chains, addFundsState.provider]);

  useEffect(() => {
    if (!squid || addFundsState.squid) return;

    addFundsDispatch({
      payload: {
        type: AddFundsActions.SET_SQUID,
        squid,
      },
    });
  }, [squid]);

  useEffect(() => {
    if (!web3Provider) return;
    addFundsDispatch({
      payload: {
        type: AddFundsActions.SET_PROVIDER,
        provider: web3Provider,
      },
    });
  }, [web3Provider]);

  useEffect(() => {
    if (!checkout) return;
    addFundsDispatch({
      payload: {
        type: AddFundsActions.SET_CHECKOUT,
        checkout,
      },
    });
  }, [checkout]);

  const {
    eventTargetState: { eventTarget },
  } = useContext(EventTargetContext);

  return (
    <ViewContext.Provider value={viewReducerValues}>
      <AddFundsContext.Provider value={addFundsReducerValues}>
        {viewState.view.type === AddFundsWidgetViews.ADD_FUNDS && (
          <AddFunds
            checkout={checkout}
            provider={web3Provider}
            toTokenAddress={toTokenAddress}
            toAmount={toAmount}
            toChainId={
              checkout.config.isProduction
                ? ChainId.IMTBL_ZKEVM_MAINNET.toString()
                : ChainId.IMTBL_ZKEVM_TESTNET.toString()
            }
            showOnrampOption={showOnrampOption}
            showSwapOption={showSwapOption}
            showBridgeOption={showBridgeOption}
            onCloseButtonClick={() => sendAddFundsCloseEvent(eventTarget)}
            onBackButtonClick={() => sendAddFundsGoBackEvent(eventTarget)}
          />
        )}
        {viewState.view.type === SharedViews.ERROR_VIEW && (
          <ErrorView
            actionText={t('views.ERROR_VIEW.actionText')}
            onActionClick={() => undefined}
            onCloseClick={() => sendAddFundsCloseEvent(eventTarget)}
            errorEventAction={() => {
              page({
                userJourney: UserJourney.ADD_FUNDS,
                screen: 'Error',
              });
            }}
          />
        )}
      </AddFundsContext.Provider>
    </ViewContext.Provider>
  );
}
