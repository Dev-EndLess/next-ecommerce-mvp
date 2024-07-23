/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product.downloadVerifications";

-- DropIndex
DROP INDEX "Product.orders";

-- DropIndex
DROP INDEX "User.orders";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
