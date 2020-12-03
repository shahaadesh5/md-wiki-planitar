package main

import (
	"fmt"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"io/ioutil"
)

//Article Struct (Model)
type Article struct {
	Name string `json:"name"`
	Content string `json:"content"`
}

// Init articles var as a slice
var articles []Article

// Get all articles
func getArticles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(articles)

}
// Get single article 
func getArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)

	for _, item := range articles {
		if item.Name == params["name"] {
			//json.NewEncoder(w).Encode(item)
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			fmt.Fprint(w, item.Content)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
	// json.NewEncoder(w).Encode(&Article{})
}

func upsertArticle(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Upsert hit")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	bodyContent, err := ioutil.ReadAll(r.Body)
	// fmt.Printf("%s",bodyContent)
	if err != nil {
		fmt.Println(err)
	}
	params := mux.Vars(r)
	content := string(bodyContent)

	for i := range articles {
		if articles[i].Name == params["name"] {
			// fmt.Printf("Updated content::: %s",articles[i].Name)
			articles[i].Content = content
			w.WriteHeader(http.StatusOK)
			return
		}
	}
	var article Article
	article.Name = params["name"]
	article.Content = content
	articles = append (articles, article)
	w.WriteHeader(http.StatusCreated)
}

func main() {

	fmt.Println("Wiki app")
	

	articles = append(articles, Article{Name: "Article 1", Content: "# Hello, *world*!"})
	
	articles = append(articles, Article{Name: "Article 2", Content: "Article random content2"})
	
	r := mux.NewRouter()
	headersOK := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOK := handlers.AllowedOrigins([]string{"*"})
	methodsOK := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "DELETE", "PUT"})



	r.HandleFunc("/api/articles", getArticles).Methods("GET")

	r.HandleFunc("/api/article/{name}", getArticle).Methods("GET")

	r.HandleFunc("/api/article/{name}", upsertArticle).Methods("PUT")
	
	buildHandler := http.FileServer(http.Dir("wiki-markdown/build"))
    r.PathPrefix("/").Handler(buildHandler)

	log.Fatal(http.ListenAndServe(":9090",handlers.CORS(headersOK, originsOK, methodsOK)(r)))
}