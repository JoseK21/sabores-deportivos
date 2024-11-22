-- CreateTable
CREATE TABLE "BusinessEvent" (
    "id" TEXT NOT NULL,
    "idBusiness" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessEvent" ADD CONSTRAINT "BusinessEvent_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
