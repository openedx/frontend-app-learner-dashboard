import classNames from 'classnames';
import { FormattedMessage } from '@openedx/frontend-base';
import { Icon, Stack } from '@openedx/paragon';

import { PathwayData, useCoursePathways } from '@src/hooks/usePathwayData';
import { CardsStackIcon } from '@src/utils/icons/CardsStackIcon';

import { MorePathwaysPopover } from './MorePathwaysPopover';
import { useVisiblePathways } from './hooks';
import { getPathwayTextColor } from './utils';
import messages from './messages';
import './index.scss';

const PathwayLabel = ({
  pathway,
  isFirst,
  isTruncated = false,
}: {
  pathway: PathwayData;
  isFirst: boolean;
  isTruncated?: boolean;
}) => {
  // The label uses the same text color as its category badge
  const textColor = getPathwayTextColor(pathway);
  return (
    <span
      className={classNames('course-card-pathways-label', {
        'text-info-800': !textColor,
        'is-truncated': isTruncated,
      })}
      style={textColor ? { color: textColor } : undefined}
    >
      {!isFirst && <span className="mx-2">•</span>}
      {pathway.pathway.content.displayName}
    </span>
  );
};

export const CourseCardPathways = ({ cardId }: { cardId: string }) => {
  const pathways = useCoursePathways(cardId);
  const {
    containerRef,
    measureRef,
    visiblePathways,
    hiddenPathways,
  } = useVisiblePathways(pathways);

  if (!pathways.length) {
    return null;
  }

  return (
    <div className="course-card-pathways d-flex align-items-center w-100 bg-dark-100 p-1.5">
      <Stack direction='horizontal' gap={1} className='mr-1'>
        <span className="text-gray-500 flex-shrink-0">
          <FormattedMessage {...messages.includedIn} />
        </span>
        <Icon className='text-info-900' src={CardsStackIcon} />
      </Stack>
      <div ref={containerRef} className="course-card-pathways-container d-flex align-items-center">
        {visiblePathways.map((pathway, index) => (
          <PathwayLabel
            key={pathway.pathway.id}
            pathway={pathway}
            isFirst={index === 0}
            isTruncated={hiddenPathways.length > 0 && index === visiblePathways.length - 1}
          />
        ))}
        {hiddenPathways.length > 0 && <MorePathwaysPopover pathways={hiddenPathways} />}
        <div ref={measureRef} className="course-card-pathways-measure d-flex align-items-center" aria-hidden>
          {pathways.map((pathway, index) => (
            <PathwayLabel key={pathway.pathway.id} pathway={pathway} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};
