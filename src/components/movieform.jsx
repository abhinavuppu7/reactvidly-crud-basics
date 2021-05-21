import React, { Component } from "react";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Login from "./common/Login";

class Movieform extends Login {
	state = {
		data: {
			title: "",
			genre: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		errors: {},
		genres: [],
	};
	doSubmit = () => {
		saveMovie(this.state.data);
		this.props.history.push("/movies");
	};
	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genre: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
		dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
	};
	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres });
		const movieId = this.props.match.params.id;
		if (movieId === "new") return;
		const movie = getMovie(movieId);
		if (!movie) return this.props.history.replace("/notfound");
		this.setState({ data: this.mapToViewModel(movie) });
	}
	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genre: movie.genre.name,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	render() {
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderInput("genre", "Genre")}
					{this.renderInput("numberInStock", "Number in Stock")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default Movieform;
