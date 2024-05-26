-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "sets" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Exercise" ("createdAt", "id", "name", "repetitions", "sets", "weight") SELECT "createdAt", "id", "name", "repetitions", "sets", "weight" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_key_check("Exercise");
PRAGMA foreign_keys=ON;
