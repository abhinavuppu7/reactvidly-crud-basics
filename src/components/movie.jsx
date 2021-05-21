import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import MovieTable from "./common/movieTable";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "./utils/paginate";
import SearchBox from "./Searchbox";
import ListGroup from "./common/listgroup";

import _ from "lodash";
class Movies extends Component {
	state = {
		movies: getMovies(),

		genres: [{ name: "All" }, ...getGenres()],
		pageSize: 4,
		currentpage: 1,
		currentgenre: "All",
		SearchQuery: "",
		SortColumn: { path: "title", order: "asc" },
	};
	handleChange = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};
	handleLike = (movie) => {
		const movies = this.state.movies;
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};
	handlegenre = (genree) => {
		this.setState({
			currentgenre: genree.name,
			SearchQuery: "",
			currentpage: 1,
		});
	};
	handlePageChange = (page) => {
		this.setState({ currentpage: page });
	};
	handleSort = (SortColumn) => {
		this.setState({ SortColumn });
	};
	handleSearch = (query) => {
		this.setState({ SearchQuery: query, currentgenre: "All", currentpage: 1 });
	};
	render() {
		const {
			movies: Allmovies,
			pageSize,
			currentpage,
			genres,
			currentgenre,
			SortColumn,
			SearchQuery,
		} = this.state;
		let filtered = Allmovies;
		if (SearchQuery)
			filtered = Allmovies.filter((m) =>
				m.title.toLowerCase().startsWith(SearchQuery.toLowerCase())
			);
		else
			filtered =
				currentgenre === "All"
					? Allmovies
					: Allmovies.filter((m) => m.genre.name === currentgenre);
		const sorted = _.orderBy(filtered, [SortColumn.path], [SortColumn.order]);

		const movies = paginate(
			sorted,
			this.state.currentpage,
			this.state.pageSize
		);

		return (
			<div>
				<div className="row">
					<div className="col-2">
						<ListGroup
							genreitems={genres}
							cgenre={this.state.currentgenre}
							gchange={this.handlegenre}
						/>
					</div>

					<div className="col">
						<Link
							className="btn btn-primary"
							to="/movies/new"
							style={{ marginBottom: 20 }}
						>
							Add Movie
						</Link>
						<div>
							{" "}
							<SearchBox
								value={SearchQuery}
								onChange={this.handleSearch}
							/>{" "}
						</div>

						<MovieTable
							onDelete={this.handleChange}
							onLike={this.handleLike}
							movies={movies}
							SortColumn={SortColumn}
							onSort={this.handleSort}
						/>
						<Pagination
							totalcount={filtered.length}
							pagesize={pageSize}
							onPagechange={this.handlePageChange}
							currentpage={currentpage}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Movies;
