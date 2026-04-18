package main

import (
	"database/sql"
	"log"
	"time"

	webview "github.com/webview/webview_go"
	_ "modernc.org/sqlite"
)

type training struct {
	id int
	name string
}

type training_evolution struct {
	id int
	training_id string
	value int
	training_date time.Time
}

func InitDb() {
	db, err := sql.Open("sqlite", "database.db")
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
func main() {
	debug := true
	w := webview.New(debug)
	w.SetTitle("Training Tool")
	w.SetSize(800, 600, webview.HintNone)
	w.Navigate("http://localhost:5173")
	w.Bind("initDb", func ()  {
		InitDb()
	})
	w.Run()
	InitDb()
}
