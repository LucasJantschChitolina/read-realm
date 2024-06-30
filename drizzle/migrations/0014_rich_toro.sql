ALTER TABLE "person" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "person" ALTER COLUMN "student_enrollment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "person" DROP COLUMN IF EXISTS "type";--> statement-breakpoint
ALTER TABLE "person" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_email_unique" UNIQUE("email");