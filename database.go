package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDb() {
	db, err := sql.Open("sqlite3", "./db.db")
	if err != nil {
		log.Fatal("erreur db")
	}
	defer db.Close()

	sqlStmt := `
		PRAGMA foreign_keys = ON;

-- Crée la table training seulement si elle n'existe pas
CREATE TABLE IF NOT EXISTS training (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Crée la table training_evolution seulement si elle n'existe pas
CREATE TABLE IF NOT EXISTS training_evolution (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    training_id   INTEGER NOT NULL,
    value         INTEGER NOT NULL,
    training_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (training_id) REFERENCES training (id) 
        ON DELETE CASCADE
);
	`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}
}
