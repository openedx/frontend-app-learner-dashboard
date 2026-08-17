import { ReactElement } from "react";

export interface CardDetailsProps {
  providerName: string;
  details: string;
  showAccessMessage: boolean;
  accessMessage?: string;
  actions?: ReactElement;
  dataTestId?: string;
};

export const CardDetails = ({
  providerName,
  details,
  showAccessMessage,
  accessMessage,
  actions,
  dataTestId,
}: CardDetailsProps) => (
  <span className="small" data-testid={dataTestId}>
    {providerName} • {details}
    {showAccessMessage && accessMessage && (
      ` • ${accessMessage}`
    )}
    {actions}
  </span>
);
