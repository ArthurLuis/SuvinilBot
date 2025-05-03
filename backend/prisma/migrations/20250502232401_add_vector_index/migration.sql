CREATE INDEX IF NOT EXISTS embedding_vector_index ON "Embedding" USING ivfflat("vector");
