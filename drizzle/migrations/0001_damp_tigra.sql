CREATE TABLE IF NOT EXISTS "admin" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "author" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "book" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"year" integer,
	"pages" integer,
	"edition" integer,
	"summary" varchar(255),
	"borrowed" boolean,
	"copies" integer,
	"category_id" uuid,
	"publisher_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "book_author" (
	"book_id" uuid,
	"author_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loan" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"loan_date" date,
	"due_date" date,
	"return_date" date,
	"book_id" uuid,
	"person_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "person" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"type" integer,
	"email" varchar(255),
	"password" varchar(255),
	"phone" varchar(255),
	"student_id" uuid,
	"admin_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "publisher" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
DROP TABLE "books";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_category_id_category_uuid1_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_publisher_id_publisher_uuid1_fk" FOREIGN KEY ("publisher_id") REFERENCES "public"."publisher"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_author" ADD CONSTRAINT "book_author_book_id_book_uuid1_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_author" ADD CONSTRAINT "book_author_author_id_author_uuid1_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_book_id_book_uuid1_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_person_id_person_uuid1_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "person" ADD CONSTRAINT "person_student_id_student_uuid1_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "person" ADD CONSTRAINT "person_admin_id_admin_uuid1_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("uuid1") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
