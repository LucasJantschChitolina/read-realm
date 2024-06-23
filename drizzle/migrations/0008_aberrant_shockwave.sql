ALTER TABLE "bookcopy" RENAME TO "book_copy";--> statement-breakpoint
ALTER TABLE "book_copy" DROP CONSTRAINT "bookcopy_book_id_book_uuid1_fk";
--> statement-breakpoint
ALTER TABLE "loan" DROP CONSTRAINT "loan_bookCopy_id_bookcopy_uuid1_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_copy" ADD CONSTRAINT "book_copy_book_id_book_uuid1_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_bookCopy_id_book_copy_uuid1_fk" FOREIGN KEY ("bookCopy_id") REFERENCES "public"."book_copy"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
