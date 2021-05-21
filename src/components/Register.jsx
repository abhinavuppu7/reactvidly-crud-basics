import React, { Component } from "react";
import Login from "./common/Login";
import Joi from "joi-browser";
class Register extends Login {
	state = {
		data: {
			username: "",
			password: "",
			name: "",
		},
		errors: {},
	};
	doSubmit = () => {
		console.log("submitted");
	};
	schema = {
		username: Joi.string().required().email().label("Username"),
		password: Joi.string().required().min(5).label("Password"),
		name: Joi.string().required().label("Name"),
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default Register;
