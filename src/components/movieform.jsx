import React, { Component } from "react";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/Form";

class Movieform extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
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
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
		dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
	};
	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres });
		// console.log(genres);
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
			genreId: movie.genre._id,
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
					{this.renderSelect("genreId", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default Movieform;
