import React, { Component } from "react";
import Login from "./common/Login";
import Joi from "joi-browser";

class LoginForm extends Login {
	state = {
		data: {
			username: "",
			password: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = () => {
		console.log("submitted");
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}

					{this.renderInput("password", "Password", "password")}

					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
