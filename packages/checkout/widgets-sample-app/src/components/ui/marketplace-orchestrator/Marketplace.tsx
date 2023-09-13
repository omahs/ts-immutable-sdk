import {
  CheckoutWidgets,
  WidgetTheme,
  UpdateConfig,
  CheckoutWidgetsConfig,
} from '@imtbl/checkout-widgets';
import { Environment } from '@imtbl/config';
import { MainPage } from './MainPage';
import { useEffect } from 'react';
import { WidgetProvider } from './WidgetProvider';

export const Marketplace = () => {
  useEffect(() => {
    

    const widgetsConfig: CheckoutWidgetsConfig = {
      theme: WidgetTheme.DARK,
      environment: Environment.SANDBOX,
      isOnRampEnabled: true,
      isBridgeEnabled: true,
      isSwapEnabled: true
    };

    CheckoutWidgets(widgetsConfig);
  
    UpdateConfig(widgetsConfig);
  },[]);

  return (
    <WidgetProvider>
      <MainPage />
    </WidgetProvider>
  );
};
