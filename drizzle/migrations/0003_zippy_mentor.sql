ALTER TABLE "category" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN IF EXISTS "description";