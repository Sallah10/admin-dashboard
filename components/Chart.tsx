// components/Chart.tsx
"use client";

import { Card, AreaChart, Title, Text } from "@tremor/react";

type ChartProps = {
  data: {
    month: string;
    sales: number;
    profit: number;
  }[];
};

export default function Chart({ data }: ChartProps) {
  return (
    <Card className="mt-8">
      <Title>Revenue Performance</Title>
      <Text>Comparison between Gross Sales and Net Profit</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={["sales", "profit"]}
        index="month"
        colors={["indigo", "fuchsia"]}
        valueFormatter={(number: number) =>
          `$${Intl.NumberFormat("us").format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}