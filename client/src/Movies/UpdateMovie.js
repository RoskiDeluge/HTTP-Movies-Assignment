import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = props => {
    const [ movie, setMovie ] = useState(initialMovie);

    useEffect(() => {
        const selectedMovie = props.list.find(item => {
            return `${item.id}` === props.match.params.id;
        });
        console.log(selectedMovie);
    }, [])

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Movie Title"
                    value={movie.name}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Movie Director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="Movie Metascore"
                    value={movie.metascore}
                />
                <input
                    type="string"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Movie Stars"
                    value={movie.stars}
                />
            </form>
        </div>
    )
}

export default UpdateMovie