import React, { useState, useEffect } from "react";
import axios from "axios";

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
        if (selectedMovie) {
            setMovie(selectedMovie);
        }
    }, [props.list, props.match.params.id])

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStarsChange = (index, newValue) => {
        const updatedStars = [
            ...movie.stars
        ];
        updatedStars[index] = newValue;
        setMovie({
            ...movie,
            stars: updatedStars
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.addToSavedList(res.data);
                // setMovie(initialMovie);
                console.log(res.data);
                props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

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

                {movie.stars.map((input, index) => 
                    <input type="text" 
                    key={index} 
                    placeholder="Stars here" 
                    onChange={e => handleStarsChange(index, e.target.value)}
                    />
                    )
                }
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie