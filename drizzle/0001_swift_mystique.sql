CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `cefr_levels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(2) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`order` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cefr_levels_id` PRIMARY KEY(`id`),
	CONSTRAINT `cefr_levels_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`type` enum('multiple_choice','fill_blank','translation','listening','speaking','matching') NOT NULL,
	`question` text NOT NULL,
	`options` json,
	`correctAnswer` text NOT NULL,
	`explanation` text,
	`points` int DEFAULT 10,
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`cefrLevelId` int NOT NULL,
	`categoryId` int,
	`description` text,
	`content` text,
	`contentArabic` text,
	`contentFrench` text,
	`contentItalian` text,
	`contentGerman` text,
	`contentChinese` text,
	`grammarNotes` text,
	`culturalNotes` text,
	`order` int DEFAULT 0,
	`estimatedMinutes` int DEFAULT 15,
	`isPublished` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`),
	CONSTRAINT `lessons_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `user_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`completed` boolean DEFAULT false,
	`score` int DEFAULT 0,
	`timeSpentMinutes` int DEFAULT 0,
	`lastAccessedAt` timestamp DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_vocabulary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`vocabularyId` int NOT NULL,
	`mastery` int DEFAULT 0,
	`timesReviewed` int DEFAULT 0,
	`lastReviewedAt` timestamp,
	`nextReviewAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_vocabulary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vocabulary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`spanish` varchar(255) NOT NULL,
	`pronunciation` varchar(255),
	`arabic` varchar(255),
	`french` varchar(255),
	`italian` varchar(255),
	`german` varchar(255),
	`chinese` varchar(255),
	`exampleSentence` text,
	`audioUrl` varchar(500),
	`imageUrl` varchar(500),
	`partOfSpeech` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vocabulary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `preferredLanguage` varchar(10) DEFAULT 'en';