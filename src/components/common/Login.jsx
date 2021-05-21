import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Login extends Component {
	state = {
		data: {},
		errors: {},
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors });
		this.doSubmit();
	};
	validate = () => {
		const result = Joi.validate(this.state.data, this.schema, {
			abortEarly: false,
		});

		if (!result.error) return {};
		const errors = {};
		for (let item of result.error.details) errors[item.path[0]] = item.message;

		return errors;
	};
	validateProp = ({ name, value }) => {
		const errors = {};
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		if (error)
			for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};
	handleChange = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;
		const errors = this.validateProp(input);

		this.setState({ data, errors });
	};
	renderButton(label) {
		return <button className="btn btn-primary"> {label}</button>;
	}
	renderInput(name, label, type = "text") {
		const { data } = this.state;
		const { errors } = this.state;
		return (
			<Input
				name={name}
				type={type}
				value={data[name]}
				onChange={this.handleChange}
				label={label}
				error={errors[name]}
			/>
		);
	}
}

export default Login;
