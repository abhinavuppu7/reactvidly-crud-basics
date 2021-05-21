import React, { Component } from "react";
import Like from "./like";
import Tableheader from "./tableheader";
import TableBody from "./tableBody";
import { Link } from "react-router-dom";

class MovieTable extends Component {
	columns = [
		{
			path: "title",
			label: "Title",
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
			),
		},
		{
			key: "update",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>
					<button
						className="btn btn-warning btn-sm"
						onClick={() => (
							<Link to={`/movies/${movie._id}`}> {movie.title}</Link>
						)}
					>
						Delete
					</button>
				</Link>
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<button
					className="btn btn-danger btn-sm"
					onClick={() => this.props.onDelete(movie)}
				>
					Delete
				</button>
			),
		},
	];

	render() {
		const { movies, SortColumn, onSort } = this.props;
		return (
			<table className="table">
				<Tableheader
					columns={this.columns}
					onSort={onSort}
					SortColumn={SortColumn}
				/>

				<TableBody data={movies} columns={this.columns} />
			</table>
		);
	}
}

export default MovieTable;
