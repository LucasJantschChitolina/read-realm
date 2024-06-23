CREATE TABLE IF NOT EXISTS "bookcopy" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_id" uuid
);
--> statement-breakpoint
ALTER TABLE "loan" DROP CONSTRAINT "loan_book_id_book_uuid1_fk";
--> statement-breakpoint
ALTER TABLE "loan" ADD COLUMN "bookCopy_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "status" varchar(10) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookcopy" ADD CONSTRAINT "bookcopy_book_id_book_uuid1_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_bookCopy_id_bookcopy_uuid1_fk" FOREIGN KEY ("bookCopy_id") REFERENCES "public"."bookcopy"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "loan" DROP COLUMN IF EXISTS "book_id";