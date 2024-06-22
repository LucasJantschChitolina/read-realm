ALTER TABLE "person" ALTER COLUMN "type" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "person" ALTER COLUMN "student_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "person" ALTER COLUMN "admin_id" DROP NOT NULL;