ALTER TABLE "book_copy" ADD COLUMN "borrowed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN IF EXISTS "borrowed";