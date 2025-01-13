package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"text/template"
)

func main() {
	fmt.Println("Starting server at http://localhost:8080")

	http.HandleFunc("/src/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/") {
			RespondWithError(w, "Page Not Found", http.StatusNotFound)
			return
		}
		http.FileServer(http.Dir(".")).ServeHTTP(w, r)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			RespondWithError(w, "Page Not Found", http.StatusNotFound)
			return
		}
		html, err := os.ReadFile("./src/html/index.html")
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			RespondWithError(w, "Internal Server Error", http.StatusNotFound)
			return
		}
		w.Write(html)
	})
	log.Fatalln(http.ListenAndServe(":8080", nil))
}

func RespondWithError(w http.ResponseWriter, data string, status int) {
	tmpl, err := template.ParseFiles("./src/html/error.html")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Inernal Server Error"))
		return
	}
	w.WriteHeader(status)
	tmpl.Execute(w, data)
}
