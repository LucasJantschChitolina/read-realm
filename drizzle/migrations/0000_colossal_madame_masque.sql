CREATE TABLE IF NOT EXISTS "books" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"author" varchar(256)
);

CREATE TABLE IF NOT EXISTS `author` (
    `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()) NOT NULL,
    `name` VARCHAR(256) NOT NULL
);
