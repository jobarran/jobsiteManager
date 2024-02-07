-- CreateTable
CREATE TABLE "_CompanyUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyUsers_AB_unique" ON "_CompanyUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyUsers_B_index" ON "_CompanyUsers"("B");

-- AddForeignKey
ALTER TABLE "_CompanyUsers" ADD CONSTRAINT "_CompanyUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyUsers" ADD CONSTRAINT "_CompanyUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
