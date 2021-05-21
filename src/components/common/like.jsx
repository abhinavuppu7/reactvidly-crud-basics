import React, { Component } from "react";

class Like extends Component {
	state = {};
	render() {
		let classs = "fa fa-heart";
		if (!this.props.liked) classs += "-o";

		return (
			<i
				onClick={this.props.onClick}
				style={{ cursor: "pointer" }}
				className={classs}
			></i>
		);
	}
}

export default Like;
