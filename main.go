package main

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	webview "github.com/webview/webview_go"
	_ "modernc.org/sqlite"
)

type training struct {
	Id   int `json:"id"`
	Name string `json:"name"`
}

type training_evolution struct {
	id            int
	training_id   string
	value         int
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

func InsertTraining(data string) error {
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal("erreur db")
	}
	defer db.Close()

	sqlStmt := fmt.Sprintf("INSERT INTO training (name) VALUES('%s')", data)
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return err
	}
	return err
}

func GetAll() []training {
	t_list := []training{}
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal("erreur db")
	}
	defer db.Close()
	sqlStmt := "SELECT * FROM training"
	rows, _ := db.Query(sqlStmt)
	for rows.Next() {
		var id int
		var name string

		err := rows.Scan(&id, &name)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("id : %d name : %s", id, name)
		t_list = append(t_list, training{
			Id: id,
			Name: name,
		})
	}
	return t_list
}
func Delete(id int)bool{
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	sqlStmt := fmt.Sprintf("DELETE FROM training WHERE id = %d", id)
	_,err = db.Exec(sqlStmt)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func main() {
	debug := true
	w := webview.New(debug)
	w.SetTitle("Training Tool")
	w.SetSize(800, 600, webview.HintNone)
	w.Navigate("http://localhost:5173")
	w.Bind("insertTraining", func(data string) []training {
		InsertTraining(data)
		return GetAll()
	})
	w.Bind("getTraining", func() []training {
		return GetAll()
	})
	w.Bind("getTrainingEvolution", func() {
		fmt.Println("get training evolution")
	})
	w.Bind("deleteTraining", func(id int) []training {
		fmt.Println("delete")
		Delete(id)
		return GetAll()
	})
	w.Bind("deleteTrainingEvolution", func() {
		fmt.Println("delete evo")
	})
	w.Run()
	InitDb()
}
