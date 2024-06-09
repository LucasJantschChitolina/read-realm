CREATE TABLE IF NOT EXISTS "books" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"author" varchar(256)
);
