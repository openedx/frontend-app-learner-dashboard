import { Badge, Stack } from "@openedx/paragon";
import { getConfig } from "@edx/frontend-platform";

import CourseCardMenu from "./CourseCardMenu";
import messages from "../messages";
import { FormattedMessage } from "react-intl";

export const CourseHaderActions = ({ cardId }: { cardId: string}) => (
  <Stack direction="horizontal" gap={2}>
    {getConfig().ENABLE_PATHWAY_PILOT_UI && (
      <Badge
        className="course-card-badge"
      >
        <FormattedMessage {...messages.courseBadge} />
      </Badge>
    )}
    <CourseCardMenu cardId={cardId} />
  </Stack>
);
