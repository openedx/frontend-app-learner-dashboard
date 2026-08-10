import { useIntl } from "react-intl";

import { CardDetails } from "containers/DashboardCard/CardDetails";
import { usePathwayData } from "hooks/usePathwayData";
import messages from "../messages";

export const PathwayCardDetails = ({ cardId }: { cardId: string }) => {
  const { formatMessage } = useIntl();
  const pathwayData = usePathwayData(cardId);
  const providerName = pathwayData?.provider?.name || formatMessage(messages.unknownProviderName);
  const coursesCount = formatMessage(messages.coursesCount, {
    count: pathwayData.pathway.courseCount,
  });

  // TODO: Waiting for the backend to implement this
  const showAccessMessage = false;

  return (
    <CardDetails
      providerName={providerName}
      details={coursesCount}
      showAccessMessage={showAccessMessage}
    />
  );
};
