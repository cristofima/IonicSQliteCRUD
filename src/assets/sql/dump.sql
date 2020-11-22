CREATE TABLE IF NOT EXISTS songs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artistName TEXT NOT NULL, 
    songName TEXT NOT NULL, 
    creationDate INTEGER NOT NULL
);

INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (1, 'Justin Bieber', 'Yummy', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (2, 'Jonas Brothers', 'What A Man Gotta Do', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (3, 'Life Is Good', 'Future', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (4, 'Lauv', 'Tattoos Together', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (5, 'Heavy Steppers', 'Whateva', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (6, 'DigDat 2020', 'Ei8ht Mile', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (7, 'Blackbear', 'me & ur ghost', 1606011364);
INSERT or IGNORE INTO songs(id, artistName, songName, creationDate) VALUES (8, 'Hailee Steinfeld', 'Wrong Direction', 1606011364);