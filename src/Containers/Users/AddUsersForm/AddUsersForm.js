import React, { Component } from 'react';

/* Import Components */
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";

class AddUsersForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                weekavailable: ""
            },
            weekavailableOptions: ["Oui", "Non", "Unknow"]
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /* This lifecycle hook gets executed when the component mounts */

    handleInputChange(event) {

        let name = event.target.name;
        let value = event.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let userData = this.state.newUser;
        this.setState({
            newUser: userData
        })
        fetch("/users/add", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                const nodes = data.results;
                this.setState({ nodes })

            })
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newUser: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                weekavailable: ""
            }
        });
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleFormSubmit}>
                <Input
                    inputType={"text"}
                    title={"First Name"}
                    name={"firstname"}
                    value={this.state.newUser.firstname}
                    placeholder={"Enter your firstname"}
                    handleChange={this.handleInputChange}
                />{" "}
                {/* FirstName of the user */}

                <Input
                    inputType={"text"}
                    title={"Last Name"}
                    name={"lastname"}
                    value={this.state.newUser.lastname}
                    placeholder={"Enter your lastname"}
                    handleChange={this.handleInputChange}
                />{" "}
                {/* LastName of the user */}

                <Input
                    inputType={"text"}
                    title={"Email"}
                    name={"email"}
                    value={this.state.newUser.email}
                    placeholder={"Enter your email"}
                    handleChange={this.handleInputChange}
                />{" "}
                {/* Email of the user */}

                <Input
                    inputType={"text"}
                    title={"Phone Number"}
                    name={"phone"}
                    value={this.state.newUser.phone}
                    placeholder={"Enter your Phone Number"}
                    handleChange={this.handleInputChange}
                />{" "}
                {/* Phone Number of the user */}

                <Select
                    title={"Week Available"}
                    name={"weekavailable"}
                    options={this.state.weekavailableOptions}
                    value={this.state.newUser.weekavailable}
                    placeholder={"Are you available ?"}
                    handleChange={this.handleInputChange}
                />{" "}
                {/* Available Selection */}

                <Button
                    action={this.handleFormSubmit}
                    type={"primary"}
                    title={"Submit"}
                />{" "}
                {/*Submit */}

                <Button
                    action={this.handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                />{" "}
                {/* Clear the form */}

            </form>

        );
    }
}

export default AddUsersForm;
