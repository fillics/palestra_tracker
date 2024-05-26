/*
  Warnings:

  - Added the required column `category` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "sets" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Exercise" ("createdAt", "date", "id", "name", "repetitions", "sets", "weight") SELECT "createdAt", "date", "id", "name", "repetitions", "sets", "weight" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_key_check("Exercise");
PRAGMA foreign_keys=ON;
