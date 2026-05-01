// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Fake Users
  // We don't delete existing users so we don't wipe out your actual GitHub login account!
  const dummyUsers = [
    {
      name: "Sarah Connor",
      email: "sarah@cyberdyne.com",
      role: "ADMIN" as const,
    },
    {
      name: "Bruce Wayne",
      email: "bruce@wayneenterprises.com",
      role: "USER" as const,
    },
    {
      name: "Clark Kent",
      email: "clark@dailyplanet.com",
      role: "USER" as const,
    },
    {
      name: "Diana Prince",
      email: "diana@themyscira.gov",
      role: "USER" as const,
    },
    {
      name: "Tony Stark",
      email: "tony@starkindustries.com",
      role: "ADMIN" as const,
    },
  ];

  for (const user of dummyUsers) {
    // upsert ensures we don't create duplicates if you run the seed script twice
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // 2. Seed Monthly Revenue
  await prisma.monthlyRevenue.deleteMany();
  const revenueData = [
    { month: "Jan 24", sales: 2890, profit: 2400, order: 1 },
    { month: "Feb 24", sales: 3190, profit: 2600, order: 2 },
    { month: "Mar 24", sales: 2500, profit: 1900, order: 3 },
    { month: "Apr 24", sales: 4200, profit: 3100, order: 4 },
    { month: "May 24", sales: 5100, profit: 4200, order: 5 },
  ];
  await prisma.monthlyRevenue.createMany({ data: revenueData });

  // 3. Seed Page Visits
  await prisma.pageVisit.deleteMany();
  const visitData = [
    { category: "Storefront", path: "/red-sneaker-pro", visits: 1245 },
    { category: "Storefront", path: "/sport-watch-x", visits: 854 },
    { category: "Storefront", path: "/blue-hills", visits: 643 },
    { category: "General", path: "/home", visits: 3200 },
    { category: "General", path: "/contact", visits: 450 },
  ];
  await prisma.pageVisit.createMany({ data: visitData });

  console.log(
    "Database seeded successfully with Users, Revenue, and Analytics data!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
