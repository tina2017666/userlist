import React, { Component } from "react";

import queryString from "querystring";
import { Form, FormGroup, Button, Alert } from "reactstrap";
class Edit extends Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    const firstkey = Object.keys(parsed)[0];

    this.state = {
      firstName: parsed[firstkey],
      lastName: parsed.lastName,
      age: parsed.age,
      gender: parsed.gender,
      userpassword: "",
      password: "",
      repeat: "",
      user: {},
      notMatched: false,
      notRight: false
    };
  }
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.getuser(id);
  };
  handleFn = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLn = e => {
    this.setState({ lastName: e.target.value });
  };
  handleAg = e => {
    this.setState({ age: e.target.value });
  };
  handleGd = e => {
    this.setState({ gender: e.target.value });
  };
  handlePs = e => {
    this.setState({ password: e.target.value });
  };
  handleRp = e => {
    this.setState({ repeat: e.target.value });
  };
  handleSubmit = () => {
    var userpassword = this.props.content[0].password;
    const { repeat, password } = this.state;
    const id = this.props.match.params.id;

    console.log(userpassword);
    console.log(password, repeat);
    if (password !== repeat) {
      this.setState({ notMatched: true });
      this.props.history.push(`/edit/${id}`);
    } else if (password !== userpassword) {
      this.setState({ notRight: true });
      this.props.history.push(`/edit/${id}`);
    } else {
      var ud = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender
      };
      this.setState({ notMatched: false, notRight: false });
      this.props.edit(id, ud);
      this.props.history.push("/");
      //alert("Changed Successfully");
    }
  };

  onclickBack = () => {
    this.props.history.push("/");
  };
  render() {
    console.log(this.props);
    console.log(this.state.userpassword);
    console.log(this.props.content);

    return (
      <div>
        <Form>
          <FormGroup>
            <div> Edit User: </div>
            <div>
              <label for="name">FirstName: </label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={this.handleFn}
                placeholder="firstname is Required..."
              />
            </div>
            <div>
              <label for="name">LastName: </label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={this.handleLn}
                placeholder="lastname is Required..."
              />
            </div>
            <div>
              <label for="name">Age: </label>
              <input
                type="text"
                value={this.state.age}
                onChange={this.handleAg}
                placeholder="age is Required"
              />
            </div>
            <div>
              <label for="name">Gender: </label>
              {/* <input type="text" onChange={this.handleGd} /> */}
              <select onChange={this.handleGd} value={this.state.gender}>
                <option>please choose your gender</option>
                <option>female</option>
                <option>male</option>
              </select>
            </div>

            <div>
              <label for="name">Password: </label>
              <input
                type="password"
                onChange={this.handlePs}
                placeholder="password is Required"
              />
            </div>
            <div>
              <label for="name">Repeat: </label>
              <input
                type="password"
                onChange={this.handleRp}
                placeholder="repeat password is Required"
              />
            </div>
            <div>
              <Button color="primary" onClick={this.handleSubmit}>
                {" "}
                Save Changes
              </Button>
            </div>
          </FormGroup>
        </Form>
        <div>
          <Alert color="danger" isOpen={this.state.notMatched}>
            {" "}
            PASSWORDS DONT MATCH
          </Alert>
        </div>
        <div>
          <Alert color="warning" isOpen={this.state.notRight}>
            {" "}
            WRONG PASSWORDS
          </Alert>
        </div>
      </div>
    );
  }
}

export default Edit;
