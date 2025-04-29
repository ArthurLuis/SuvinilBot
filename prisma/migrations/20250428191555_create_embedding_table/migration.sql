-- CreateTable
CREATE TABLE "Embedding" (
    "id" SERIAL NOT NULL,
    "tintaId" INTEGER NOT NULL,
    "vector" vector(1536) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Embedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Embedding_tintaId_key" ON "Embedding"("tintaId");

-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_tintaId_fkey" FOREIGN KEY ("tintaId") REFERENCES "Tinta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
