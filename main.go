package main

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"

	webview "github.com/webview/webview_go"
	_ "modernc.org/sqlite"
)

type training struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type training_evolution struct {
	Id            int       `json:"id"`
	Training      string  `json:"training"`
	Value         int       `json:"value"`
	Training_date time.Time `json:"date"`
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
			Id:   id,
			Name: name,
		})
	}
	return t_list
}
func Delete(id int) bool {
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	sqlStmt := fmt.Sprintf("DELETE FROM training WHERE id = %d", id)
	_, err = db.Exec(sqlStmt)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func DeleteEvo(id int) bool {
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	sqlStmt := fmt.Sprintf("DELETE FROM training_evolution WHERE id = %d", id)
	_, err = db.Exec(sqlStmt)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func GetTrainininEvolution(id int) []training_evolution {
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	list := []training_evolution{}
	sqlStmt := fmt.Sprintf("SELECT e.id as id, e.training_date as training_date, e.value as value, t.name as training FROM training_evolution as e INNER JOIN training as t ON e.training_id = t.id WHERE t.id = %d", id)
	rows, err := db.Query(sqlStmt)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		var evo training_evolution
		err := rows.Scan(&evo.Id, &evo.Training_date, &evo.Value, &evo.Training)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(evo)
		list = append(list, evo)
	}
	return list
}

func InsertEvo(id int, value int) []training_evolution {
	db, err := sql.Open("sqlite", "database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	sqlStmt := fmt.Sprintf("INSERT INTO training_evolution (training_id, value) VALUES(%d, %d)", id, value)

	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Fatal(err)
	}

	return GetTrainininEvolution(id)
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
	w.Bind("getTrainingEvolution", func(id string) []training_evolution {
		intValue, _ := strconv.Atoi(id)
		fmt.Println("get training evolution")
		return GetTrainininEvolution(intValue)
	})
	w.Bind("deleteTraining", func(id int) []training {
		fmt.Println("delete")
		Delete(id)
		return GetAll()
	})
	w.Bind("insertEvolution", func (id string, value string) []training_evolution {
		idValue, _ := strconv.Atoi(id)
		intValue, _ := strconv.Atoi(value)
		return InsertEvo(idValue, intValue)
	})
	w.Bind("deleteTrainingEvolution", func(id string, training_id string) []training_evolution {
		fmt.Println("delete evo")
		t_id, _ := strconv.Atoi(training_id)
		e_id, _ := strconv.Atoi(id)
		DeleteEvo(e_id)
		return GetTrainininEvolution(t_id)
	})
	w.Run()
	InitDb()
}
