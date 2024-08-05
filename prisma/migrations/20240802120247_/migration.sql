/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Token` table. All the data in the column will be lost.
  - Made the column `id` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL
);
INSERT INTO "new_Token" ("email", "id", "name", "tokenId") SELECT "email", "id", "name", "tokenId" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_tokenId_key" ON "Token"("tokenId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
