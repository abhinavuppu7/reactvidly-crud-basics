import React, { Component } from "react";

class ListGroup extends Component {
	render() {
		const { genreitems, cgenre, gchange } = this.props;

		return (
			<ul className="list-group">
				{genreitems.map((genre) => (
					<li
						onClick={() => gchange(genre)}
						key={genre._id}
						className={
							cgenre === genre.name
								? "list-group-item active"
								: "list-group-item"
						}
					>
						{genre.name}
					</li>
				))}
			</ul>
		);
	}
}

export default ListGroup;
