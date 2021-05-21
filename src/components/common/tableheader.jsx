import React, { Component } from "react";
class Tableheader extends Component {
	Raisesort = (path) => {
		const SortColumn = { ...this.props.SortColumn };
		if (path === SortColumn.path) {
			SortColumn.order = SortColumn.order === "asc" ? "desc" : "asc";
		} else {
			SortColumn.path = path;
			SortColumn.order = "asc";
		}
		this.props.onSort(SortColumn);
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							key={column.path || column.key}
							onClick={() => this.Raisesort(column.path)}
						>
							{column.label}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default Tableheader;
