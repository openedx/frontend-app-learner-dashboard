import { Stack } from "@openedx/paragon";
import { FormattedMessage } from "@openedx/frontend-base";

import { useCoursePathways } from "@src/hooks/usePathwayData";

import messages from "./messages";

export const CourseCardPathways = ({ cardId }: { cardId: string }) => {
  const pathways = useCoursePathways(cardId);

  return (
    <div className='w-100 bg-dark-100 p-1.5'>
      <Stack>
        <span className='text-gray-500'>
          <FormattedMessage {...messages.includedIn} />
        </span>
      </Stack>
    </div>
  );
};
