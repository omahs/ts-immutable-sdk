import { AppHeaderBar, ButtCon } from '@biom3/react';
import { useContext } from 'react';
import { HeaderNavigationStyles, ButtonNavigationStyles } from './HeaderStyles';
import {
  ViewActions,
  ViewContext,
} from '../../context/view-context/ViewContext';

export interface HeaderNavigationProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  transparent?: boolean;
  onSettingsClick?: () => void;
  onBackButtonClick?: () => void;
  onCloseButtonClick?: () => void;
}

export function HeaderNavigation({
  title,
  showBack = false,
  showSettings = false,
  transparent = false,
  onSettingsClick,
  onBackButtonClick,
  onCloseButtonClick,
}: HeaderNavigationProps) {
  const { viewDispatch } = useContext(ViewContext);

  const goBack = async () => {
    viewDispatch({
      payload: {
        type: ViewActions.GO_BACK,
      },
    });
  };

  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    } else {
      goBack();
    }
  };

  return (
    <AppHeaderBar
      testId="header-navigation-container"
      sx={HeaderNavigationStyles(transparent)}
      contentAlign={showBack ? 'center' : 'left'}
      size="small"
    >
      {showBack && (
        <AppHeaderBar.LeftButtCon
          sx={ButtonNavigationStyles(transparent)}
          icon="ArrowBackward"
          iconVariant="bold"
          onClick={handleBackButtonClick}
          testId="back-button"
        />
      )}
      <AppHeaderBar.Title testId="header-title" size="small">
        {title}
      </AppHeaderBar.Title>
      <AppHeaderBar.RightHandButtons>
        {showSettings && onSettingsClick && (
          <ButtCon
            icon="SettingsCog"
            sx={ButtonNavigationStyles(transparent)}
            iconVariant="bold"
            onClick={onSettingsClick}
            testId="settings-button"
          />
        )}
        {onCloseButtonClick && (
          <ButtCon
            iconVariant="bold"
            sx={ButtonNavigationStyles(transparent)}
            icon="Close"
            onClick={onCloseButtonClick}
            testId="close-button"
          />
        )}
      </AppHeaderBar.RightHandButtons>
    </AppHeaderBar>
  );
}