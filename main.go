package main

import (
	webview "github.com/webview/webview_go"
)

func main() {
	InitDb()
	debug := true
	w := webview.New(debug)
	w.SetTitle("Training Tool")
	w.SetSize(800, 600, webview.HintNone)
	w.Navigate("http://localhost:5173")
	w.Run()
}
