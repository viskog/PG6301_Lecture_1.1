
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

const movies = [
    {
        title: "The Matrix",
        plot: "asdf ujhaWEPPFUI HAPERIFUH APWIEURH APWEIUURH ",
        year: 1999
    },
    {
        title: "The color purple",
        plot: "asdaSpdfiuha aiuhedfp iaushdfp iouahspdf ",
        year: 1985
    }
];

function FrontPage() {
    return <div>
        <h1>Kristiania Movie Database</h1>;
        <ul>
            <li><Link to="/movies">List movies</Link></li>
            <li><Link to="/movies/new">New movies</Link></li>
        </ul>
    </div>
}

function ListMovies({moviesAPI}) {
    const [movies, setMovies] = useState();
    useEffect(async () => {
        setMovies(undefined);
        setMovies(await moviesAPI.listMovies());
    }, []);

    if (!movies) {
        return <div>Loading...</div>
    }


    return <div>
        <h1>List Movies</h1>
            {movies.map(m =>
               <div key={m.title}>
                   <h2>{m.title} ({m.year})</h2>
                   <div>{m.plot}</div>
               </div>
            )}
        </div>;
}

function NewMovie({moviesAPI}) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        await moviesAPI.onAddMovie({title, year, plot});
        navigate("/");
    }

    return <form onSubmit={handleSubmit}>
        <h1>New Movie</h1>
        <div>
            <label>Title: <input value={title} onChange={e => setTitle(e.target.value)} /></label>
        </div>
        <div>
            <label>Year: <input value={year} onChange={e => setYear(e.target.value)} /></label>
        </div>
        <div>
            <label>Plot: <textarea value={plot} onChange={e => setPlot(e.target.value)} /></label>
        </div>
        <button>Submit</button>
    </form>;
}

function Application() {
    const moviesAPI = {
        onAddMovie: async (m) => movies.push(m),
        listMovies: async () => {
            const res = await fetch("/api/movies");
            return res.json();
        }
    }
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage />}/>
            <Route path="/movies/new" element={<NewMovie moviesAPI={moviesAPI}/>}/>
            <Route path="/movies" element={<ListMovies moviesAPI={moviesAPI}/>}/>
        </Routes>
    </BrowserRouter>;

}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);