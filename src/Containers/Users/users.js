import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUser: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                weekavailable: ""
            },
            weekavailableOptions: ["Oui", "Non", "Unknow"]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    //Called immediately after a component is mounted.
    componentDidMount() {
        this.getUsers()
    }

    //Clear the form
    clearForm() {
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

    //Populate the newUser Object when form is filled
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

    //Call the clearForm() when button Clear is clicked
    handleClearForm(event) {
        event.preventDefault();
        this.clearForm()
    }

    //Get Users from Express
    getUsers() {
        fetch('/users')
            .then(res => {
                console.log('GET USERS response : ', res)
                return res.json()
            })
            .then(users => {
                //console.log(users);
                this.setState({ users })
            });
    }

    //ADD a user to Express when button Submit is clicked
    handleSubmit(event) {
        event.preventDefault();
        let userData = this.state.newUser;

        fetch("/users/add", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json()
                .then(data => {
                    console.log('ADD USER response : ', response)
                    this.getUsers()
                    this.clearForm()

                })
        })
    }

    //DELETE a user by ID on Express when button Delete is clicked
    handleDelete = userId => {

        //This part delete the user from id on Express
        fetch("/users/delete/" + userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json()
                .then(data => {
                    console.log('DELETE USER response : ', response)
                    this.getUsers()
                    this.clearForm()

                })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr className="trTtle">
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Available</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td colSpan="7">
                                    {this.addUserRender()}
                                </td>
                            </tr>
                            {this.listUsersRender()}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
    listUsersRender() {
        return this.state.users.map(user => {
            const { id, firstName, lastName, email, phoneNumber, weekAvailable } = user
            return (
                <tr key={id}>
                    <td>
                        {id}
                        {/* ID of the user */}
                    </td>
                    <td>
                        <Input
                            inputType={"text"}
                            title={"First Name"}
                            name={"firstname"}
                            value={firstName}
                            placeholder={"Enter your firstname"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* FirstName of the user */}
                    </td>
                    <td>
                        <Input
                            inputType={"text"}
                            title={"Last Name"}
                            name={"lastname"}
                            value={lastName}
                            placeholder={"Enter your lastname"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* LastName of the user */}
                    </td>
                    <td>
                        <Input
                            inputType={"text"}
                            title={"Email"}
                            name={"email"}
                            value={email}
                            placeholder={"Enter your email"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* Email of the user */}
                    </td>
                    <td>
                        <Input
                            inputType={"text"}
                            title={"Phone Number"}
                            name={"phone"}
                            value={phoneNumber}
                            placeholder={"Enter your Phone Number"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* Phone Number of the user */}
                    </td>
                    <td>
                        <Select
                            title={"Week Available"}
                            name={"weekavailable"}
                            options={this.state.weekavailableOptions}
                            value={weekAvailable}
                            placeholder={"Are you available ?"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* Available Selection */}
                    </td>
                    <td>Edit| <input value="Delete" type="button" onClick={e => this.handleDelete(user.id)} className="delete-btn"></input></td>
                </tr>
            )
        })

    }
    addUserRender() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
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
                    action={this.handleSubmit}
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
export default Users;