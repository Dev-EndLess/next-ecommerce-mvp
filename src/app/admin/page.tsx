import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatNumber, formatCurrency } from "@/lib/formatters";
import React from "react";

// Get the number of users and average value per user
async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.orders.aggregate({
      _sum: { priceInCents: true },
      _count: true,
    }),
  ]);

  return {
    userCount,
    avarageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.priceInCents || 0) / userCount / 100,
  };
}

// Get the number of sales and total amount of money earned
async function getSalesData() {
  const data = await db.orders.aggregate({
    _sum: { priceInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.priceInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

// Get the number of active and inactive products
async function getProductData() {
  const [activeProducts, inactiveProducts] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ])

  return {
    activeProducts,
    inactiveProducts
  }
}

export default async function AdminDashboard() {
  const [saleData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Products"
        subtitle={`${formatNumber(saleData.numberOfSales)} Orders`}
        body={formatCurrency(saleData.amount)}
      />

      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.avarageValuePerUser
        )} Avarage Value`}
        body={formatNumber(userData.userCount)}
      />

      <DashboardCard
        title="Products"
        subtitle={`${formatNumber(productData.inactiveProducts)} Inactive Products`}
        body={`${formatNumber(productData.activeProducts)} Active Products`}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
