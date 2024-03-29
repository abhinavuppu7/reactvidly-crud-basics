import { values } from "lodash";
import React, { Component } from "react";
class SearchBox extends Component {
	render() {
		const { value, onChange } = this.props;
		return (
			<input
				type="text"
				name="query"
				className="formcontrol my-3"
				placeholder="search...."
				value={value}
				onChange={(e) => onChange(e.currentTarget.value)}
			/>
		);
	}
}

export default SearchBox;
