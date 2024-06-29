DROP TABLE "admin";--> statement-breakpoint
DROP TABLE "student";--> statement-breakpoint
ALTER TABLE "loan" RENAME COLUMN "bookCopy_id" TO "book_copy_id";--> statement-breakpoint
ALTER TABLE "person" RENAME COLUMN "student_id" TO "student_enrollment";--> statement-breakpoint
ALTER TABLE "loan" DROP CONSTRAINT "loan_bookCopy_id_book_copy_uuid1_fk";
--> statement-breakpoint
ALTER TABLE "person" DROP CONSTRAINT "person_student_id_student_uuid1_fk";
--> statement-breakpoint
ALTER TABLE "person" DROP CONSTRAINT "person_admin_id_admin_uuid1_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_book_copy_id_book_copy_uuid1_fk" FOREIGN KEY ("book_copy_id") REFERENCES "public"."book_copy"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "person" DROP COLUMN IF EXISTS "admin_id";--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_student_enrollment_unique" UNIQUE("student_enrollment");