-- Migration script to create the Token table

CREATE TABLE "Token" (
    "id" SERIAL PRIMARY KEY,
    "tokenId" VARCHAR(255) UNIQUE NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for tokenId to ensure uniqueness
CREATE UNIQUE INDEX "Token_tokenId_key" ON "Token" ("tokenId");
