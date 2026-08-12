import { MessageDescriptor } from 'react-intl';
import { useIntl } from '@edx/frontend-platform/i18n';
// @ts-expect-error TS2307: no module declaration for image assets in this repo
import verifiedRibbon from 'assets/verified-ribbon.png';

import { baseAppUrl } from 'data/services/lms/urls';
import { Badge } from '@openedx/paragon';

export interface CardImageProps {
  bannerImgSrc?: string;
  isVerified?: boolean;
  messages: {
    bannerAlt: MessageDescriptor;
    verifiedHoverDescription: MessageDescriptor;
    verifiedBanner: MessageDescriptor;
    verifiedBannerRibbonAlt: MessageDescriptor;
  };
}

export const CardImage = ({
  bannerImgSrc,
  isVerified = false,
  messages,
}: CardImageProps) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <img
        // w-100 is necessary for images on Safari, otherwise stretches full height of the image
        // https://stackoverflow.com/a/44250830
        className="pgn__card-image-cap w-100 show"
        src={bannerImgSrc && baseAppUrl(bannerImgSrc)}
        alt={formatMessage(messages.bannerAlt)}
      />
      {
        isVerified && (
          <span
            className="card-verify-ribbon-container"
            title={formatMessage(messages.verifiedHoverDescription)}
          >
            <Badge as="div" variant="success" className="w-100">
              {formatMessage(messages.verifiedBanner)}
            </Badge>
            <img src={verifiedRibbon} alt={formatMessage(messages.verifiedBannerRibbonAlt)} />
          </span>
        )
      }
    </>
  );
};
