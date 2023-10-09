import { BiomePortalIdContext, Box, MountedOverlaysAndProvider } from '@biom3/react';
import React, { useContext } from 'react';
import {
  simpleLayoutStyle,
  headerStyle,
  footerStyle,
  bodyStyle,
  contentStyle,
  heroContentStyle,
  responsiveStyles,
} from './SimpleLayoutStyles';

export interface SimpleLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  heroContent?: React.ReactNode;
  testId?: string;
  floatHeader?: boolean;
  footerBackgroundColor?: string;
}

export function SimpleLayout({
  header,
  footer,
  children,
  heroContent,
  testId,
  floatHeader = false,
  footerBackgroundColor,
}: SimpleLayoutProps) {
  const portalId = useContext(BiomePortalIdContext);
  return (
    <MountedOverlaysAndProvider bottomSheetContainerId={`layout-container-${portalId}`}>
      <Box sx={responsiveStyles} id={`layout-container-${portalId}`}>
        <Box testId={testId} sx={simpleLayoutStyle}>
          {header && (
            <Box id="header" sx={headerStyle(floatHeader)}>
              {header}
            </Box>
          )}
          <Box id="content" sx={contentStyle}>
            {heroContent && (
              <Box id="hero-content" sx={heroContentStyle}>
                {heroContent}
              </Box>
            )}
            {children && (
              <Box id="body" sx={bodyStyle}>
                {children}
              </Box>
            )}
          </Box>
          {footer && (
            <Box id="footer" sx={footerStyle(footerBackgroundColor)}>
              {footer}
            </Box>
          )}
        </Box>
      </Box>
    </MountedOverlaysAndProvider>
  );
}
