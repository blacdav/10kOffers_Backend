-- CreateTable
CREATE TABLE "user" (
    "id" CHAR(36) NOT NULL,
    "fullname" TEXT NOT NULL,
    "avatar" TEXT,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "two_step_login" BOOLEAN,
    "instagram" TEXT,
    "tiktok" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_whatsapp_key" ON "user"("whatsapp");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
