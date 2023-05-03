import React from 'react';

import { ConnectionProviders, WidgetTheme } from '../definitions/constants';

export interface SwapWidgetReactProps {
  providerPreference: ConnectionProviders;
  fromContractAddress?: string;
  amount?: string;
  toContractAddress?: string;
}

export function SwapWidgetReact(props: SwapWidgetReactProps) {
  const { providerPreference, fromContractAddress, amount, toContractAddress } =
    props;

  const config = window.ImtblCheckoutWidgetConfig;

  return (
    <imtbl-swap
      providerPreference={providerPreference ?? ConnectionProviders.METAMASK}
      theme={config.theme ?? WidgetTheme.DARK}
      fromContractAddress={fromContractAddress ?? ''}
      toContractAddress={toContractAddress ?? ''}
      amount={amount ?? ''}
    ></imtbl-swap>
  );
}
