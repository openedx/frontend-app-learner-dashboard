import { ActionRow } from "@openedx/paragon";
import { usePathwayData } from "hooks/usePathwayData";
import { ViewPathwayButton } from "./ViewPathwayButton";
import { ResumeButton } from "./ResumeButton";
import { BeginPathwayButton } from "./BeginPathwayButton";

export const PathwayCardActions = ({ cardId }: { cardId: string }) => {
  const pathwayData = usePathwayData(cardId);
  const hasStarted = pathwayData.pathwayRun.hasStarted || false;
  const isArchived = pathwayData.pathwayRun.isArchived || false;
  
  return (
    <ActionRow>
      {isArchived &&  (
        <ViewPathwayButton cardId={cardId} />
      )}
      {!isArchived && (hasStarted
        ? <ResumeButton />
        : <BeginPathwayButton />
      )}
    </ActionRow>
  );
};
