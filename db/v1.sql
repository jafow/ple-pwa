CREATE TABLE IF NOT EXISTS
    measures
    (
        id           VARCHAR     PRIMARY KEY NOT NULL,
        date         INTEGER     default (datetime('now')),
        weight       REAL        default 0,
        arm          REAL        default 0,
        abdomen      REAL        default 0,
        foot         REAL        default 0
    );

       
CREATE TABLE IF NOT EXISTS
    options
    (
        options_id      VARCHAR
        rutin           INTEGER     default 0,
        rapamune        INTEGER     default 0,
        siledenafil     INTEGER     default 0,
        vomit           INTEGER     default 0,
        grumpy          INTEGER     default 0,
        swelling:face   INTEGER     default 0,
        sick:cold       INTEGER     default 0,
        sick:stomach    INTEGER     default 0,
        wrapping        INTEGER     default 0
    );

CREATE TABLE if NOT EXISTS
    notes
    (
        notes_id        VARCHAR,
        notes           TEXT
    );

