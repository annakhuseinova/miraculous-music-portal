DROP TABLE IF EXISTS images;

CREATE TABLE images (

    id bigserial NOT NULL,
    image_url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT images_primary_key PRIMARY KEY (id)
);

DROP TABLE IF EXISTS site_visitors;

CREATE TABLE IF NOT EXISTS site_visitors (

     dtype character varying(31) COLLATE pg_catalog."default" NOT NULL DEFAULT 'Artist',
     id bigserial NOT NULL,
     date_of_registration timestamp DEFAULT current_timestamp,
     email character varying(255) COLLATE pg_catalog."default" default 'coolband@gmail.com',
     is_activated boolean default true,
     login character varying(255) COLLATE pg_catalog."default",
     password character varying(255) COLLATE pg_catalog."default" default '$2y$12$ZeOurawzljNTHb6JTHGwDuooICNwEgquvWhyfWjg.fGcURcuR5wJy',
     comments_allowed boolean default true,
     description character varying(255) COLLATE pg_catalog."default" default 'Yet another cool band',
     is_featured boolean default false,
     location character varying(255) COLLATE pg_catalog."default",
     picture_id bigint,
     activation_code character varying(255) COLLATE pg_catalog."default" default null,
     cart_id bigint NOT NULL,
     player_queue_id bigint NOT NULL,

    CONSTRAINT site_visitors_primary_key PRIMARY KEY (id)


);

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (

        id bigserial NOT NULL,
        date_of_release character varying(255),
        description character varying(255) default 'Another cool album',
        length double precision,
        is_featured boolean,
        is_free boolean,
        price double precision default 10.00,
        size double precision,
        title character varying(255) COLLATE pg_catalog."default",
        artist_id bigint,
        image_id bigint,

        CONSTRAINT albums_primary_key PRIMARY KEY (id)

);

DROP TABLE IF EXISTS carts;

CREATE TABLE carts (

        id bigserial NOT NULL,
        CONSTRAINT carts_primary_key PRIMARY KEY (id)

);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (

        id bigserial NOT NULL,
        date_of_comment timestamp,
        text character varying(255) COLLATE pg_catalog."default",
        author_id bigint NOT NULL,

         CONSTRAINT comments_primary_key PRIMARY KEY (id)

);

DROP TABLE IF EXISTS genres;

CREATE TABLE genres (

          id bigserial NOT NULL,
          title character varying(255) COLLATE pg_catalog."default",
          image_id bigint NOT NULL,
          description character varying(2048),

          CONSTRAINT genres_primary_key PRIMARY KEY (id)

);

DROP TABLE IF EXISTS playlists;

CREATE TABLE IF NOT EXISTS playlists (

         id bigserial NOT NULL,
         playlist_owner_id bigint,

        CONSTRAINT playlist_primary_key PRIMARY KEY (id)
);

DROP TABLE IF EXISTS roles;

CREATE TABLE IF NOT EXISTS roles (

        id bigserial NOT NULL,
        title character varying(255) COLLATE pg_catalog."default",
        CONSTRAINT roles_primary_key PRIMARY KEY (id)

);

DROP TABLE IF EXISTS tracks;

CREATE TABLE IF NOT EXISTS tracks (

        id bigserial NOT NULL,
        date_of_release character varying(244),
        description character varying(255) default 'Another cool track',
        length double precision,
        is_free boolean default false,
        price double precision default 5.00,
        size double precision,
        title character varying(255) COLLATE pg_catalog."default",
        url_to_track_full_version character varying(255) COLLATE pg_catalog."default",
        url_to_track_preview_version character varying(255) COLLATE pg_catalog."default",
        album_id bigint null,
        artist_id bigint NOT NULL,
        image_id bigint,

        CONSTRAINT tracks_primary_key PRIMARY KEY (id)

);

DROP TABLE IF EXISTS album_comment;

CREATE TABLE IF NOT EXISTS album_comment(

        album_id bigint NOT NULL,
        comment_id bigint NOT NULL

);

DROP TABLE IF EXISTS album_genre;

CREATE TABLE album_genre (

    album_id bigint NOT NULL,
    genre_id bigint NOT NULL
);



DROP TABLE IF EXISTS artist_comment;

CREATE TABLE artist_comment (

    artist_id bigint NOT NULL,
    comment_id bigint NOT NULL
);

DROP TABLE IF EXISTS cart_album;

CREATE TABLE cart_album (

    cart_id bigint NOT NULL,
    album_id bigint NOT NULL
);

DROP TABLE IF EXISTS cart_track;

CREATE TABLE cart_track (

    cart_id bigint NOT NULL,
    track_id bigint NOT NULL
);


DROP TABLE IF EXISTS playlist_track;

CREATE TABLE playlist_track (

    playlist_id serial NOT NULL,
    track_id bigint NOT NULL
);

DROP TABLE IF EXISTS site_visitor_genre;

CREATE TABLE site_visitor_genre (

    site_visitor_id bigint NOT NULL,
    genre_id bigint NOT NULL
);

DROP TABLE IF EXISTS site_visitor_purchased_track;

CREATE TABLE IF NOT EXISTS site_visitor_purchased_track (

    site_visitor_id bigint NOT NULL,
    track_id bigint NOT NULL
);

DROP TABLE IF EXISTS site_visitor_purchased_album;

CREATE TABLE IF NOT EXISTS site_visitor_purchased_album (

    site_visitor_id bigint NOT NULL,
    album_id bigint NOT NULL
);

DROP TABLE IF EXISTS site_visitor_role;

CREATE TABLE IF NOT EXISTS site_visitor_role (

    site_visitor_id bigint NOT NULL,
    role_id bigint NOT NULL
);

DROP TABLE IF EXISTS track_comment;

CREATE TABLE IF NOT EXISTS track_comment (

    track_id bigint NOT NULL,
    comment_id bigint NOT NULL
);

DROP TABLE IF EXISTS track_genre;

CREATE TABLE IF NOT EXISTS track_genre (

    track_id bigint NOT NULL,
    genre_id bigint NOT NULL
);

DROP TABLE IF EXISTS track_site_visitor;

CREATE TABLE IF NOT EXISTS track_site_visitor(

  track_id bigint NOT NULL,
  site_visitor_id bigint NOT NULL

);

DROP TABLE IF EXISTS album_site_visitor;

CREATE TABLE IF NOT EXISTS album_site_visitor(

    album_id bigint NOT NULL,
    site_visitor_id bigint NOT NULL

);

CREATE TABLE IF NOT EXISTS events (

     id bigserial NOT NULL,
     artist_id bigint NOT NULL,
     event_time character varying(255),
     event_title character varying(255),
     event_location character varying(255),
     event_text character varying(255),
     image_id bigint,

     CONSTRAINT event_primary_key PRIMARY KEY (id)
);



ALTER TABLE track_site_visitor ADD CONSTRAINT track_id_foreign_key FOREIGN KEY (track_id) REFERENCES tracks (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE track_site_visitor ADD CONSTRAINT site_visitor_id_foreign_key FOREIGN KEY (site_visitor_id) REFERENCES site_visitors (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE album_site_visitor ADD CONSTRAINT album_id_foreign_key FOREIGN KEY (album_id) REFERENCES albums (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE album_site_visitor ADD CONSTRAINT site_visitor_id_foreign_id FOREIGN KEY (site_visitor_id) REFERENCES
    site_visitors(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE events ADD CONSTRAINT artist_id_foreign_key FOREIGN KEY(artist_id) REFERENCES site_visitors (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE site_visitors ADD CONSTRAINT picture_id_foreign_key FOREIGN KEY (picture_id) REFERENCES images (id) MATCH SIMPLE
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE albums ADD CONSTRAINT artists_id_foreign_key FOREIGN KEY (artist_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE albums ADD CONSTRAINT images_id_foreign_key FOREIGN KEY (image_id) REFERENCES images (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE comments ADD CONSTRAINT author_id_foreign_key FOREIGN KEY (author_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE genres ADD CONSTRAINT image_id_foreign_key FOREIGN KEY (image_id) REFERENCES images (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE playlists ADD CONSTRAINT playlist_owner_id_foreign_key FOREIGN KEY (playlist_owner_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE tracks ADD CONSTRAINT image_id_foreign_key FOREIGN KEY (image_id) REFERENCES images (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE tracks ADD CONSTRAINT artist_id_foreign_key FOREIGN KEY (artist_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE tracks ADD CONSTRAINT album_id_foreign_key FOREIGN KEY (album_id) REFERENCES albums (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE album_comment ADD CONSTRAINT album_id_foreign_key FOREIGN KEY (album_id) REFERENCES albums (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE album_comment ADD CONSTRAINT comment_id_foreign_key FOREIGN KEY (comment_id) REFERENCES comments (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE album_genre ADD CONSTRAINT album_id_foreign_key FOREIGN KEY (genre_id) REFERENCES genres (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE album_genre ADD CONSTRAINT comment_id_foreign_key FOREIGN KEY (album_id) REFERENCES albums (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE artist_comment ADD CONSTRAINT artist_id_foreign_key FOREIGN KEY (artist_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE artist_comment ADD CONSTRAINT comment_id_foreign_key FOREIGN KEY (comment_id) REFERENCES comments (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE cart_album ADD CONSTRAINT cart_id_foreign_id FOREIGN KEY (cart_id) REFERENCES carts (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE cart_album ADD CONSTRAINT album_id_foreign_id FOREIGN KEY (album_id) REFERENCES albums (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE cart_track ADD CONSTRAINT track_id_foreign_key FOREIGN KEY (track_id) REFERENCES tracks (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE cart_track ADD CONSTRAINT cart_id_foreign_key FOREIGN KEY (cart_id) REFERENCES carts (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE playlist_track ADD CONSTRAINT track_id_foreign_key FOREIGN KEY (track_id) REFERENCES tracks (id) ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE playlist_track ADD CONSTRAINT playlist_id_foreign_key FOREIGN KEY (playlist_id) REFERENCES playlists (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_genre ADD CONSTRAINT site_visitor_id_foreign_key FOREIGN KEY (site_visitor_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_genre ADD CONSTRAINT genre_id_foreign_key FOREIGN KEY (genre_id) REFERENCES genres (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_purchased_track ADD CONSTRAINT site_visitor_id_foreign_key FOREIGN KEY (site_visitor_id)
REFERENCES site_visitors (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_purchased_track ADD CONSTRAINT track_id_foreign_key FOREIGN KEY (track_id) REFERENCES tracks (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_purchased_album ADD  CONSTRAINT album_id_foreign_key FOREIGN KEY (album_id) REFERENCES albums (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_purchased_album ADD CONSTRAINT site_visitor_id_foreign_key FOREIGN KEY (site_visitor_id)
REFERENCES site_visitors (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_role ADD CONSTRAINT site_visitor_id_foreign_key FOREIGN KEY (site_visitor_id) REFERENCES site_visitors (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE site_visitor_role ADD CONSTRAINT role_id_foreign_key FOREIGN KEY (role_id) REFERENCES roles (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE track_comment ADD CONSTRAINT comment_id_foreign_key FOREIGN KEY (comment_id) REFERENCES comments (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE track_comment ADD CONSTRAINT track_id_foreign_key FOREIGN KEY (track_id) REFERENCES tracks (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE track_genre ADD CONSTRAINT track_id_foreign_key FOREIGN KEY (track_id) REFERENCES tracks (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE track_genre ADD CONSTRAINT genre_id_foreign_key FOREIGN KEY (genre_id) REFERENCES genres (id)
ON UPDATE CASCADE ON DELETE CASCADE;


CREATE SEQUENCE site_visitor_id_seq START 251;
CREATE SEQUENCE comment_id_generator START 1;
CREATE SEQUENCE event_id_seq START 1;
CREATE SEQUENCE image_id_seq START 233;
CREATE SEQUENCE track_id_seq START 250;
CREATE SEQUENCE album_id_seq START 26;
CREATE SEQUENCE cart_id_seq START 251;
CREATE SEQUENCE playlist_id_seq START 201;
