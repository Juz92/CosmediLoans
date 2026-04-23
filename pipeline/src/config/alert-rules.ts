export type AlertSeverity = "CRITICAL" | "WARNING" | "OPPORTUNITY";

export interface AlertRule {
  id: string;
  name: string;
  severity: AlertSeverity;
  description: string;
}

export const alertRules = {
  siteDown: {
    id: "site-down",
    name: "Site Down",
    severity: "CRITICAL" as AlertSeverity,
    description: "Site returned non-200 for 2+ consecutive checks",
    consecutiveFailures: 2,
  },
  sslExpiring: {
    id: "ssl-expiring",
    name: "SSL Expiring",
    severity: "CRITICAL" as AlertSeverity,
    description: "SSL certificate expires within 7 days",
    daysThreshold: 7,
  },
  trafficDrop: {
    id: "traffic-drop",
    name: "Traffic Drop",
    severity: "WARNING" as AlertSeverity,
    description: "Traffic dropped >20% week-over-week",
    dropPercent: 20,
  },
  pageSpeedLow: {
    id: "pagespeed-low",
    name: "PageSpeed Low",
    severity: "WARNING" as AlertSeverity,
    description: "PageSpeed score dropped below 50",
    scoreThreshold: 50,
  },
  positionDrop: {
    id: "position-drop",
    name: "Position Drop",
    severity: "WARNING" as AlertSeverity,
    description: "Average position dropped >5 spots for tracked keyword",
    positionChange: 5,
  },
  snippetOpportunity: {
    id: "snippet-opportunity",
    name: "Snippet Opportunity",
    severity: "OPPORTUNITY" as AlertSeverity,
    description: "Query position 1-5 with CTR below 5%",
    maxPosition: 5,
    ctrThreshold: 5,
    minImpressions: 50,
  },
  keywordGap: {
    id: "keyword-gap",
    name: "Keyword Gap",
    severity: "OPPORTUNITY" as AlertSeverity,
    description: "High impressions, low clicks",
    minImpressions: 100,
    maxCtr: 2,
  },
} as const;
