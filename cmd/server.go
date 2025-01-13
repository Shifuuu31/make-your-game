package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

func main() {
	fmt.Println("started server")

	http.HandleFunc("/src/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/") {
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte("page not found"))
			return
		}
		http.FileServer(http.Dir("../")).ServeHTTP(w, r)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte("page not found"))
			return
		}
		html, err := os.ReadFile("../src/index.html")
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Internal Server Error"))
			return
		}
		w.Write(html)
	})
	http.ListenAndServe(":8080", nil)
}
