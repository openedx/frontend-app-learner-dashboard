import { Card } from "@openedx/paragon";
import { useIsCollapsed } from "containers/DashboardCard/hooks";
import { PathwayCardImage } from "./components/PathwayCardImage";
import { PathwayCardTitle } from "./components/PathwayCardTitle";
import { PathwayCardMenu } from "./components/PathwayCardMenu";
import { PathwayCardDetails } from "./components/PathwayCardDetails";
import { PathwayCardActions } from "./components/PathwayCardActions";
import { PathwayCardBanners } from "./components/PathwayCardBanners";

import 'containers/DashboardCard/Card.scss';

export const Pathwaycard = ({
  cardId,
}: { cardId: string }) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 dashboard-card pathway-card" id={cardId} data-testid="PathwayCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <PathwayCardImage cardId={cardId} orientation='horizontal' />
            <Card.Body>
              <Card.Header
                title={<PathwayCardTitle cardId={cardId} />}
                actions={<PathwayCardMenu cardId={cardId} />}
              />
              <Card.Section className="pt-0">
                <PathwayCardDetails cardId={cardId} />
              </Card.Section>
              <Card.Footer orientation={orientation}>
                <PathwayCardActions cardId={cardId} />
              </Card.Footer>
            </Card.Body>
          </div>
          <PathwayCardBanners cardId={cardId} />
        </div>
      </Card>
    </div>
  );
};
