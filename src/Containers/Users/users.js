import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import './Users.css';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUser: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                weekAvailable: ""
            },
            weekAvailableOptions: ["Oui", "Non", "Unknow"],
            mode: 'view'
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
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                weekAvailable: ""
            }, mode: 'view'
        });
        this.getUsers()
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
                this.setState({ users, mode: 'view' })
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

    //Get Users by ID from Express
    handleEdit = userId => {
        fetch('/users/' + userId)
            .then(res => {
                console.log('GET USER by ID response : ', res)
                return res.json()
            })
            .then(user => {
                console.log("user :", user);
                //this.setState({ user, mode: 'edit' })
                console.log("user firstName :", user[0].firstName);
                this.setState({
                    newUser: {
                        id: user[0].id,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        email: user[0].email,
                        phoneNumber: user[0].phoneNumber,
                        weekAvailable: user[0].weekAvailable
                    },
                    mode: 'edit'
                })
                console.log("NewUser :", this.state.newUser);;
            });
    }

    //Update a user by ID on Express when button update is clicked
    handleUpdate = userId => {

        //This part update the user from id on Express
        fetch("/users/update/" + userId, {
            method: 'POST',
            body: JSON.stringify({
                id: userId,
                firstName: this.state.newUser.firstName,
                lastName: this.state.newUser.lastName,
                email: this.state.newUser.email,
                phoneNumber: this.state.newUser.phoneNumber,
                weekAvailable: this.state.newUser.weekAvailable
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response)
            if (response.ok) {
                response.json()
                    .then(data => {
                        console.log('UPDATE USER response : ', response)
                        this.getUsers()
                        this.clearForm()

                    })
            } else {
                throw new Error('Something went wrong ...');
            }
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
            <div className="container-fluid">
                <div className="row row-cols-7 bg-secondary text-white">
                    <div>&nbsp;&nbsp;&nbsp;#&nbsp;</div>
                    <div className="col">First Name</div>
                    <div className="col">Last Name</div>
                    <div className="col">Email</div>
                    <div className="col">Phone Number</div>
                    <div className="col">Available</div>
                    <div className="col">Actions</div>
                </div>
                {this.addUserRender()}
                {this.updateUsersRender()}
                {this.listUsersRender()}
            </div>
        );
    }

    addUserRender() {
        if (this.state.mode === 'edit') {
            return <div></div>;
        } else {
            return (
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div>&nbsp;&nbsp;&nbsp;</div>
                    <div className="col">
                        <Input
                            inputType={"text"}
                            title={"First Name"}
                            name={"firstName"}
                            value={this.state.newUser.firstName}
                            placeholder={"Enter your firstName"}
                            className={"form-control-plaintext"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* FirstName of the user */}
                    </div>
                    <div className="col">
                        <Input
                            inputType={"text"}
                            title={"Last Name"}
                            name={"lastName"}
                            value={this.state.newUser.lastName}
                            placeholder={"Enter your lastName"}
                            className={"form-control-plaintext"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* LastName of the user */}
                    </div>
                    <div className="col">
                        <Input
                            inputType={"text"}
                            title={"Email"}
                            name={"email"}
                            value={this.state.newUser.email}
                            placeholder={"Enter your email"}
                            className={"form-control-plaintext"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* Email of the user */}
                    </div>
                    <div className="col">
                        <Input
                            inputType={"text"}
                            title={"Phone Number"}
                            name={"phoneNumber"}
                            value={this.state.newUser.phoneNumber}
                            placeholder={"Enter your Phone Number"}
                            className={"form-control-plaintext"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* Phone Number of the user */}
                    </div>
                    <div className="col">
                        <Select
                            title={"Week Available"}
                            name={"weekAvailable"}
                            options={this.state.weekAvailableOptions}
                            value={this.state.newUser.weekAvailable}
                            placeholder={"Are you available ?"}
                            className={"custom-select"}
                            handleChange={this.handleInputChange}
                        />{" "}
                        {/* Available Selection */}
                    </div>
                    <div className="col">
                        <Button
                            action={this.handleSubmit}
                            type={"btn btn-success btn-sm"}
                            title={"Submit"}
                        />{" "}
                        {/*Submit */}
                        <Button
                            action={this.handleClearForm}
                            type={"btn btn-secondary btn-sm"}
                            title={"Clear"}
                        />{" "}
                        {/* Clear the form */}
                    </div>
                </form>

            );
        }
    }

    updateUsersRender() {
        if (this.state.mode === 'view') {
            return <div></div>;
        } else {
            return (
                <div>
                    <form className="form-inline" onSubmit={e => this.handleUpdate(this.state.newUser.id)}>
                        <div>{this.state.newUser.id}</div>
                        <div className="col">
                            <Input
                                inputType={"text"}
                                title={"First Name"}
                                name={"firstName"}
                                value={this.state.newUser.firstName}
                                handleChange={this.handleInputChange}
                            />{" "}
                            {/* FirstName of the user */}
                        </div>
                        <div className="col"><Input
                            inputType={"text"}
                            title={"Last Name"}
                            name={"lastName"}
                            value={this.state.newUser.lastName}
                            handleChange={this.handleInputChange}
                        />{" "}
                            {/* LastName of the user */}
                        </div>
                        <div className="col">
                            <Input
                                inputType={"text"}
                                title={"Email"}
                                name={"email"}
                                value={this.state.newUser.email}
                                handleChange={this.handleInputChange}
                            />{" "}
                            {/* Email of the user */}
                        </div>
                        <div className="col">
                            <Input
                                inputType={"text"}
                                title={"Phone Number"}
                                name={"phoneNumber"}
                                value={this.state.newUser.phoneNumber}
                                handleChange={this.handleInputChange}
                            />{" "}
                            {/* Phone Number of the user */}
                        </div>
                        <div className="col"><Select
                            title={"Week Available"}
                            name={"weekAvailable"}
                            options={this.state.weekAvailableOptions}
                            value={this.state.newUser.weekAvailable}
                            placeholder={"Are you available ?"}
                            className={"custom-select"}
                            handleChange={this.handleInputChange}
                        />{" "}
                            {/* Available Selection */}</div>
                        <div className="col">
                            <Button
                                action={e => this.handleEdit(this.state.newUser.id)}
                                type={"btn btn-primary btn-sm"}
                                title={"Update"}
                            />{" "}
                            {/*Update */}
                            <Button
                                action={this.handleClearForm}
                                type={"btn btn-secondary btn-sm"}
                                title={"Clear"}
                            />{" "}
                            {/* Clear the form */}
                        </div>
                    </form>
                </div>
            )
        }
    }
    listUsersRender() {
        if (this.state.mode === 'edit') {
            return <div></div>;
        } else {
            return this.state.users.map(user => {
                const { id, firstName, lastName, email, phoneNumber, weekAvailable } = user
                return (
                    <div key={id} className="row">
                        <div>{id}</div>
                        <div className="col">{firstName}</div>
                        <div className="col">{lastName}</div>
                        <div className="col">{email}</div>
                        <div className="col">{phoneNumber}</div>
                        <div className="col">{weekAvailable}</div>
                        <div className="col">
                            <Button
                                action={e => this.handleEdit(user.id)}
                                type={"btn btn-primary btn-sm"}
                                title={"Edit"}
                            />{" "}
                            {/*Delete */}
                            <Button
                                action={e => this.handleDelete(user.id)}
                                type={"btn btn-danger btn-sm"}
                                title={"Delete"}
                            />{" "}
                            {/*Delete */}
                        </div>
                    </div>
                )
            })
        }
    }
}
export default Users;