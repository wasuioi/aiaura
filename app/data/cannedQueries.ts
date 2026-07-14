// The four questions the mock can answer. Everything the preview shows comes
// from here — there is no engine behind it, and there shouldn't be: the point
// of the mock is to show the shape of the interaction, not to fake a backend.
//
// Rule when editing: a stat and its chart must tell the same story. An answer
// that says signups fell, over a line that climbs, is exactly the fabricated
// dashboard this project keeps stripping out.

export interface CannedQuery {
  id: string;
  question: string;
  /** The stat is split out so it can carry the highlight treatment. */
  answer: { before: string; stat: string; after: string };
  chartLabel: string;
  /** 12 points, normalized 0..1. */
  chartData: number[];
  chartDirection: "up" | "down";
  sql: string;
}

export const CANNED_QUERIES: CannedQuery[] = [
  {
    id: "signups-drop",
    question: "Why did signups drop last week?",
    answer: {
      before: "Signups fell ",
      stat: "18%",
      after: " after the pricing page redirect broke on Tuesday.",
    },
    chartLabel: "New signups · last 14 days",
    chartData: [0.82, 0.85, 0.8, 0.88, 0.84, 0.86, 0.9, 0.55, 0.48, 0.52, 0.5, 0.54],
    chartDirection: "down",
    sql: "select date_trunc('day', created_at), count(*) from signups where created_at > now() - interval '14 days' group by 1;",
  },
  {
    id: "plan-conversion",
    question: "Which plan converts best?",
    answer: {
      before: "The annual Pro plan converts at ",
      stat: "6.4%",
      after: " — nearly double the monthly plan once the 14-day trial ends.",
    },
    chartLabel: "Trial → paid conversion by plan · last 90 days",
    chartData: [0.3, 0.34, 0.31, 0.38, 0.42, 0.4, 0.47, 0.5, 0.48, 0.55, 0.6, 0.64],
    chartDirection: "up",
    sql: "select plan, count(*) filter (where converted) / count(*)::float from trials group by plan order by 2 desc;",
  },
  {
    id: "churn-reason",
    question: "Top churn reason this month?",
    answer: {
      before: "Most cancellations (",
      stat: "41%",
      after: ') cited "not enough usage" — and 3 in 4 of those never connected a second data source.',
    },
    chartLabel: "Cancellations by stated reason · this month",
    chartData: [0.9, 0.86, 0.8, 0.74, 0.66, 0.6, 0.52, 0.45, 0.4, 0.34, 0.3, 0.26],
    chartDirection: "down",
    sql: "select reason, count(*) from cancellations where created_at >= date_trunc('month', now()) group by reason order by 2 desc;",
  },
  {
    id: "revenue-cohort",
    question: "Revenue per seat, by cohort?",
    answer: {
      before: "Seats from the March cohort now bring in ",
      stat: "$31/mo",
      after: " — up from $19 at signup, mostly from seat expansion.",
    },
    chartLabel: "Avg revenue per seat · March cohort, by month",
    chartData: [0.38, 0.4, 0.44, 0.43, 0.5, 0.56, 0.54, 0.62, 0.68, 0.72, 0.78, 0.84],
    chartDirection: "up",
    sql: "select cohort_month, sum(mrr) / sum(seats) from cohort_revenue group by 1 order by 1;",
  },
];
