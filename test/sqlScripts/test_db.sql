/*
Navicat PGSQL Data Transfer

Source Server         : Heroku Scrapyard Server
Source Server Version : 90401
Source Host           : ec2-54-243-187-196.compute-1.amazonaws.com:5432
Source Database       : dfdn5uu82vahtb
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90401
File Encoding         : 65001

Date: 2015-07-24 18:17:58
*/


-- ----------------------------
-- Sequence structure for artist_id_artist_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."artist_id_artist_seq";
CREATE SEQUENCE "public"."artist_id_artist_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 3
 CACHE 1;
SELECT setval('"public"."artist_id_artist_seq"', 3, true);

-- ----------------------------
-- Sequence structure for genre_id_genre_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."genre_id_genre_seq";
CREATE SEQUENCE "public"."genre_id_genre_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 8
 CACHE 1;
SELECT setval('"public"."genre_id_genre_seq"', 8, true);

-- ----------------------------
-- Sequence structure for item_class_id_item_class_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."item_class_id_item_class_seq";
CREATE SEQUENCE "public"."item_class_id_item_class_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 3
 CACHE 1;
SELECT setval('"public"."item_class_id_item_class_seq"', 3, true);

-- ----------------------------
-- Sequence structure for item_id_item_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."item_id_item_seq";
CREATE SEQUENCE "public"."item_id_item_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 9
 CACHE 1;
SELECT setval('"public"."item_id_item_seq"', 9, true);

-- ----------------------------
-- Sequence structure for item_type_id_item_type_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."item_type_id_item_type_seq";
CREATE SEQUENCE "public"."item_type_id_item_type_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 3
 CACHE 1;
SELECT setval('"public"."item_type_id_item_type_seq"', 3, true);

-- ----------------------------
-- Sequence structure for person_id_person_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."person_id_person_seq";
CREATE SEQUENCE "public"."person_id_person_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 3
 CACHE 1;
SELECT setval('"public"."person_id_person_seq"', 3, true);

-- ----------------------------
-- Sequence structure for song_id_song_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."song_id_song_seq";
CREATE SEQUENCE "public"."song_id_song_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 10
 CACHE 1;
SELECT setval('"public"."song_id_song_seq"', 10, true);

-- ----------------------------
-- Sequence structure for type_genre_id_type_genre_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."type_genre_id_type_genre_seq";
CREATE SEQUENCE "public"."type_genre_id_type_genre_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 48
 CACHE 1;
SELECT setval('"public"."type_genre_id_type_genre_seq"', 48, true);

-- ----------------------------
-- Table structure for artist
-- ----------------------------
DROP TABLE IF EXISTS "public"."artist";
CREATE TABLE "public"."artist" (
"id_artist" int8 DEFAULT nextval('artist_id_artist_seq'::regclass) NOT NULL,
"name" text COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of artist
-- ----------------------------
INSERT INTO "public"."artist" VALUES ('1', 'artist_1');
INSERT INTO "public"."artist" VALUES ('2', 'artist_2');
INSERT INTO "public"."artist" VALUES ('3', 'artist_3');

-- ----------------------------
-- Table structure for artist_song
-- ----------------------------
DROP TABLE IF EXISTS "public"."artist_song";
CREATE TABLE "public"."artist_song" (
"id_artist" int8 NOT NULL,
"id_song" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of artist_song
-- ----------------------------
INSERT INTO "public"."artist_song" VALUES ('1', '1');
INSERT INTO "public"."artist_song" VALUES ('1', '2');
INSERT INTO "public"."artist_song" VALUES ('1', '3');
INSERT INTO "public"."artist_song" VALUES ('2', '4');
INSERT INTO "public"."artist_song" VALUES ('2', '5');
INSERT INTO "public"."artist_song" VALUES ('2', '6');
INSERT INTO "public"."artist_song" VALUES ('3', '7');
INSERT INTO "public"."artist_song" VALUES ('3', '8');
INSERT INTO "public"."artist_song" VALUES ('3', '9');
INSERT INTO "public"."artist_song" VALUES ('3', '10');

-- ----------------------------
-- Table structure for genre
-- ----------------------------
DROP TABLE IF EXISTS "public"."genre";
CREATE TABLE "public"."genre" (
"id_genre" int8 DEFAULT nextval('genre_id_genre_seq'::regclass) NOT NULL,
"name" text COLLATE "default" NOT NULL,
"id_genre_type" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of genre
-- ----------------------------
INSERT INTO "public"."genre" VALUES ('2', 'music_genre_1', '1');
INSERT INTO "public"."genre" VALUES ('3', 'music_genre_2', '1');
INSERT INTO "public"."genre" VALUES ('4', 'music_genre_3', '1');
INSERT INTO "public"."genre" VALUES ('6', 'game_genre_1', '2');
INSERT INTO "public"."genre" VALUES ('7', 'game_genre_2', '2');
INSERT INTO "public"."genre" VALUES ('8', 'game_genre_3', '2');

-- ----------------------------
-- Table structure for genre_item
-- ----------------------------
DROP TABLE IF EXISTS "public"."genre_item";
CREATE TABLE "public"."genre_item" (
"id_genre" int8 NOT NULL,
"id_item" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of genre_item
-- ----------------------------
INSERT INTO "public"."genre_item" VALUES ('2', '1');
INSERT INTO "public"."genre_item" VALUES ('3', '3');
INSERT INTO "public"."genre_item" VALUES ('4', '4');
INSERT INTO "public"."genre_item" VALUES ('7', '3');
INSERT INTO "public"."genre_item" VALUES ('7', '4');
INSERT INTO "public"."genre_item" VALUES ('8', '6');
INSERT INTO "public"."genre_item" VALUES ('8', '7');

-- ----------------------------
-- Table structure for genre_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."genre_type";
CREATE TABLE "public"."genre_type" (
"id_genre_type" int8 DEFAULT nextval('type_genre_id_type_genre_seq'::regclass) NOT NULL,
"name" text COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of genre_type
-- ----------------------------
INSERT INTO "public"."genre_type" VALUES ('1', 'genre_type_1');
INSERT INTO "public"."genre_type" VALUES ('2', 'genre_type_2');

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS "public"."item";
CREATE TABLE "public"."item" (
"id_item" int8 DEFAULT nextval('item_id_item_seq'::regclass) NOT NULL,
"title" text COLLATE "default",
"year" int4,
"additionalInfo" json,
"id_item_type" int8,
"id_item_class" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO "public"."item" VALUES ('1', 'item_1', '2000', '{"info1":"info1", "info2":"info2"}', '1', '1');
INSERT INTO "public"."item" VALUES ('3', 'item_2', '2000', '{"info1":"info1", "info2":"info2"}', null, '2');
INSERT INTO "public"."item" VALUES ('4', 'item_3', '2000', '{"info1":"info1", "info2":"info2"}', null, '3');
INSERT INTO "public"."item" VALUES ('5', 'item_4', '2000', '{"info1":"info1", "info2":"info2"}', '2', '1');
INSERT INTO "public"."item" VALUES ('6', 'item_5', '2000', '{"info1":"info1", "info2":"info2"}', '3', '1');
INSERT INTO "public"."item" VALUES ('7', 'item_6', '2000', '{"info1":"info1", "info2":"info2"}', null, '2');
INSERT INTO "public"."item" VALUES ('8', 'item_7', '2000', '{"info1":"info1", "info2":"info2"}', '1', '1');
INSERT INTO "public"."item" VALUES ('9', 'item_8', '2000', '{"info1":"info1", "info2":"info2"}', '1', '1');

-- ----------------------------
-- Table structure for item_class
-- ----------------------------
DROP TABLE IF EXISTS "public"."item_class";
CREATE TABLE "public"."item_class" (
"id_item_class" int8 DEFAULT nextval('item_class_id_item_class_seq'::regclass) NOT NULL,
"name" text COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of item_class
-- ----------------------------
INSERT INTO "public"."item_class" VALUES ('1', 'item_class_1');
INSERT INTO "public"."item_class" VALUES ('2', 'item_class_2');
INSERT INTO "public"."item_class" VALUES ('3', 'item_class_3');

-- ----------------------------
-- Table structure for item_person
-- ----------------------------
DROP TABLE IF EXISTS "public"."item_person";
CREATE TABLE "public"."item_person" (
"id_item" int8 NOT NULL,
"id_person" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of item_person
-- ----------------------------
INSERT INTO "public"."item_person" VALUES ('1', '1');
INSERT INTO "public"."item_person" VALUES ('1', '2');
INSERT INTO "public"."item_person" VALUES ('3', '3');
INSERT INTO "public"."item_person" VALUES ('5', '3');
INSERT INTO "public"."item_person" VALUES ('6', '1');
INSERT INTO "public"."item_person" VALUES ('6', '3');
INSERT INTO "public"."item_person" VALUES ('8', '1');
INSERT INTO "public"."item_person" VALUES ('9', '2');

-- ----------------------------
-- Table structure for item_person_song
-- ----------------------------
DROP TABLE IF EXISTS "public"."item_person_song";
CREATE TABLE "public"."item_person_song" (
"id_item" int8 NOT NULL,
"id_song" int8 NOT NULL,
"id_person" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of item_person_song
-- ----------------------------
INSERT INTO "public"."item_person_song" VALUES ('1', '1', '1');
INSERT INTO "public"."item_person_song" VALUES ('1', '2', '1');
INSERT INTO "public"."item_person_song" VALUES ('5', '3', '2');
INSERT INTO "public"."item_person_song" VALUES ('6', '6', '2');
INSERT INTO "public"."item_person_song" VALUES ('9', '6', '3');

-- ----------------------------
-- Table structure for item_song
-- ----------------------------
DROP TABLE IF EXISTS "public"."item_song";
CREATE TABLE "public"."item_song" (
"id_item" int8 NOT NULL,
"id_song" int8 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of item_song
-- ----------------------------
INSERT INTO "public"."item_song" VALUES ('1', '1');
INSERT INTO "public"."item_song" VALUES ('1', '2');
INSERT INTO "public"."item_song" VALUES ('5', '3');
INSERT INTO "public"."item_song" VALUES ('6', '6');
INSERT INTO "public"."item_song" VALUES ('7', '10');
INSERT INTO "public"."item_song" VALUES ('9', '6');

-- ----------------------------
-- Table structure for item_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."item_type";
CREATE TABLE "public"."item_type" (
"id_item_type" int8 DEFAULT nextval('item_type_id_item_type_seq'::regclass) NOT NULL,
"name" text COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of item_type
-- ----------------------------
INSERT INTO "public"."item_type" VALUES ('1', 'item_type_1');
INSERT INTO "public"."item_type" VALUES ('2', 'item_type_2');
INSERT INTO "public"."item_type" VALUES ('3', 'item_type_3');

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS "public"."person";
CREATE TABLE "public"."person" (
"id_person" int8 DEFAULT nextval('person_id_person_seq'::regclass) NOT NULL,
"username" varchar(128) COLLATE "default" NOT NULL,
"password" text COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of person
-- ----------------------------
INSERT INTO "public"."person" VALUES ('1', 'person_1', 'person_1');
INSERT INTO "public"."person" VALUES ('2', 'person_2', 'person_2');
INSERT INTO "public"."person" VALUES ('3', 'person_3', 'person_3');

-- ----------------------------
-- Table structure for song
-- ----------------------------
DROP TABLE IF EXISTS "public"."song";
CREATE TABLE "public"."song" (
"id_song" int8 DEFAULT nextval('song_id_song_seq'::regclass) NOT NULL,
"length" int8,
"title" varchar(256) COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of song
-- ----------------------------
INSERT INTO "public"."song" VALUES ('1', '60', 'song_1');
INSERT INTO "public"."song" VALUES ('2', '60', 'song_2');
INSERT INTO "public"."song" VALUES ('3', '60', 'song_3');
INSERT INTO "public"."song" VALUES ('4', '60', 'song_4');
INSERT INTO "public"."song" VALUES ('5', '60', 'song_5');
INSERT INTO "public"."song" VALUES ('6', '60', 'song_6');
INSERT INTO "public"."song" VALUES ('7', '60', 'song_7');
INSERT INTO "public"."song" VALUES ('8', '60', 'song_8');
INSERT INTO "public"."song" VALUES ('9', '60', 'song_9');
INSERT INTO "public"."song" VALUES ('10', '60', 'song_10');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
ALTER SEQUENCE "public"."artist_id_artist_seq" OWNED BY "artist"."id_artist";
ALTER SEQUENCE "public"."genre_id_genre_seq" OWNED BY "genre"."id_genre";
ALTER SEQUENCE "public"."item_class_id_item_class_seq" OWNED BY "item_class"."id_item_class";
ALTER SEQUENCE "public"."item_id_item_seq" OWNED BY "item"."id_item";
ALTER SEQUENCE "public"."item_type_id_item_type_seq" OWNED BY "item_type"."id_item_type";
ALTER SEQUENCE "public"."person_id_person_seq" OWNED BY "person"."id_person";
ALTER SEQUENCE "public"."song_id_song_seq" OWNED BY "song"."id_song";
ALTER SEQUENCE "public"."type_genre_id_type_genre_seq" OWNED BY "genre_type"."id_genre_type";

-- ----------------------------
-- Primary Key structure for table artist
-- ----------------------------
ALTER TABLE "public"."artist" ADD PRIMARY KEY ("id_artist");

-- ----------------------------
-- Primary Key structure for table artist_song
-- ----------------------------
ALTER TABLE "public"."artist_song" ADD PRIMARY KEY ("id_artist", "id_song");

-- ----------------------------
-- Primary Key structure for table genre
-- ----------------------------
ALTER TABLE "public"."genre" ADD PRIMARY KEY ("id_genre");

-- ----------------------------
-- Primary Key structure for table genre_item
-- ----------------------------
ALTER TABLE "public"."genre_item" ADD PRIMARY KEY ("id_genre", "id_item");

-- ----------------------------
-- Primary Key structure for table genre_type
-- ----------------------------
ALTER TABLE "public"."genre_type" ADD PRIMARY KEY ("id_genre_type");

-- ----------------------------
-- Primary Key structure for table item
-- ----------------------------
ALTER TABLE "public"."item" ADD PRIMARY KEY ("id_item");

-- ----------------------------
-- Primary Key structure for table item_class
-- ----------------------------
ALTER TABLE "public"."item_class" ADD PRIMARY KEY ("id_item_class");

-- ----------------------------
-- Primary Key structure for table item_person
-- ----------------------------
ALTER TABLE "public"."item_person" ADD PRIMARY KEY ("id_item", "id_person");

-- ----------------------------
-- Primary Key structure for table item_person_song
-- ----------------------------
ALTER TABLE "public"."item_person_song" ADD PRIMARY KEY ("id_item", "id_song", "id_person");

-- ----------------------------
-- Primary Key structure for table item_song
-- ----------------------------
ALTER TABLE "public"."item_song" ADD PRIMARY KEY ("id_item", "id_song");

-- ----------------------------
-- Primary Key structure for table item_type
-- ----------------------------
ALTER TABLE "public"."item_type" ADD PRIMARY KEY ("id_item_type");

-- ----------------------------
-- Primary Key structure for table person
-- ----------------------------
ALTER TABLE "public"."person" ADD PRIMARY KEY ("id_person");

-- ----------------------------
-- Primary Key structure for table song
-- ----------------------------
ALTER TABLE "public"."song" ADD PRIMARY KEY ("id_song");

-- ----------------------------
-- Foreign Key structure for table "public"."artist_song"
-- ----------------------------
ALTER TABLE "public"."artist_song" ADD FOREIGN KEY ("id_song") REFERENCES "public"."song" ("id_song") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."artist_song" ADD FOREIGN KEY ("id_artist") REFERENCES "public"."artist" ("id_artist") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."genre"
-- ----------------------------
ALTER TABLE "public"."genre" ADD FOREIGN KEY ("id_genre_type") REFERENCES "public"."genre_type" ("id_genre_type") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."genre_item"
-- ----------------------------
ALTER TABLE "public"."genre_item" ADD FOREIGN KEY ("id_genre") REFERENCES "public"."genre" ("id_genre") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."genre_item" ADD FOREIGN KEY ("id_item") REFERENCES "public"."item" ("id_item") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."item"
-- ----------------------------
ALTER TABLE "public"."item" ADD FOREIGN KEY ("id_item_type") REFERENCES "public"."item_type" ("id_item_type") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."item" ADD FOREIGN KEY ("id_item_class") REFERENCES "public"."item_class" ("id_item_class") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."item_person"
-- ----------------------------
ALTER TABLE "public"."item_person" ADD FOREIGN KEY ("id_item") REFERENCES "public"."item" ("id_item") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."item_person" ADD FOREIGN KEY ("id_person") REFERENCES "public"."person" ("id_person") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."item_person_song"
-- ----------------------------
ALTER TABLE "public"."item_person_song" ADD FOREIGN KEY ("id_item", "id_song") REFERENCES "public"."item_song" ("id_item", "id_song") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."item_person_song" ADD FOREIGN KEY ("id_person") REFERENCES "public"."person" ("id_person") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."item_song"
-- ----------------------------
ALTER TABLE "public"."item_song" ADD FOREIGN KEY ("id_song") REFERENCES "public"."song" ("id_song") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."item_song" ADD FOREIGN KEY ("id_item") REFERENCES "public"."item" ("id_item") ON DELETE CASCADE ON UPDATE CASCADE;
