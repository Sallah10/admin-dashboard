// app/analytics/page.tsx
import Chart from "@/components/Chart";
import { BarList, Card, Flex, Grid, Metric, Text, Title } from "@tremor/react";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // 1. Fetch data from the database in parallel for speed
  const [revenueData, pageVisits] = await Promise.all([
    prisma.monthlyRevenue.findMany({
      orderBy: { order: 'asc' } // Ensure months are in order
    }),
    prisma.pageVisit.findMany({
      orderBy: { visits: 'desc' } // Most visited at the top
    })
  ]);

  // 2. Group the page visits by category for the Tremor BarLists
  const storefrontVisits = pageVisits
    .filter((v) => v.category === "Storefront")
    .map((v) => ({ name: v.path, value: v.visits }));

  const generalVisits = pageVisits
    .filter((v) => v.category === "General")
    .map((v) => ({ name: v.path, value: v.visits }));

  const totalStorefrontViews = storefrontVisits.reduce((acc, curr) => acc + curr.value, 0);
  const totalGeneralViews = generalVisits.reduce((acc, curr) => acc + curr.value, 0);

  const barListData = [
    {
      category: "Storefront Products",
      stat: totalStorefrontViews.toLocaleString(),
      data: storefrontVisits,
    },
    {
      category: "General Website",
      stat: totalGeneralViews.toLocaleString(),
      data: generalVisits,
    },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mb-8">
        <Title className="text-2xl font-bold">Store Analytics</Title>
        <Text>Real-time traffic and revenue data for your E-Commerce platform.</Text>
      </div>

      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        {barListData.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>

      {/* Pass the real DB data to the Chart component */}
      <Chart data={revenueData} />
    </main>
  );
}