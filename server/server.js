import express from "express";
import path from "path";

const app = express();

const movies = [
    {
        title: "The Matrix - from servera",
        plot: "asdf ujhaWEPPFUI HAPERIFUH APWIEURH APWEIUURH ",
        year: 1999
    },
    {
        title: "The color purple",
        plot: "asdaSpdfiuha aiuhedfp iaushdfp iouahspdf ",
        year: 1985
    }
];

app. get("/api/movies",(req, res) => {
    res. json(movies)
});
app.use(express.static(path.resolve("../dist")));
app.use((req, res) => {
    res.sendFile(path.resolve("..", "dist", "index.html"));
})


const server = app.listen(3000, () => {
    console.log("listening on http://localhost:" + server.address().port);
})