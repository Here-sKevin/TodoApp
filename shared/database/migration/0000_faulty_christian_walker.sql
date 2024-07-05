CREATE TABLE `Todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`userId` integer NOT NULL,
	`completed` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Users_username_unique` ON `Users` (`username`);