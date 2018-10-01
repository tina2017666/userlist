import React, { Component } from "react";
import { Form, FormGroup, Button, Alert } from "reactstrap";
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      password: "",
      repeat: "",
      us: {},
      isFn: false,
      isLn: false,
      isAg: false,
      isGd: false,
      isPs: false,
      isRp: false,
      isVisble: false,
      isRequired: false,
      isChanged: false
    };
  }

  handleFn = e => {
    this.setState({ firstName: e.target.value, isFn: true });
  };
  handleLn = e => {
    this.setState({ lastName: e.target.value, isLn: true });
  };
  handleAg = e => {
    this.setState({ age: e.target.value, isAg: true });
  };
  handleGd = e => {
    this.setState({ gender: e.target.value, isGd: true });
  };
  handlePs = e => {
    this.setState({ password: e.target.value, isPs: true });
  };
  handleRp = e => {
    this.setState({ repeat: e.target.value, isRp: true });
  };
  handleSubmit = () => {
    const { password, repeat, isAg, isFn, isGd, isLn, isPs, isRp } = this.state;

    console.log(password);
    console.log(repeat);

    if (isFn && isLn && isAg && isGd && isPs && isRp && password === repeat) {
      var ud = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender,
        password: password
      };
      this.props.add(ud);
      this.setState({ isChanged: true, isRequired: false, isVisble: false });
    } else if (!isFn || !isLn || !isAg || !isGd || !isPs || !isRp) {
      this.setState({ isRequired: true, isChanged: false });
    } else if (password !== repeat) {
      this.setState({ isVisble: true, isChanged: false });
    }
  };
  handlenoSubmit = () => {};

  onclickBack = () => {
    this.props.history.push("/");
  };
  render() {
    console.log(this.state.us);
    console.log(this.state.isChanged);
    return (
      <div>
        <Form>
          <FormGroup>
            <h1>Create User: </h1>
            <div>
              <label for="name">FirstName: </label>
              <input
                type="text"
                onChange={this.handleFn}
                placeholder="last name is required"
              />
            </div>
            <div>
              <label for="name">LastName: </label>
              <input
                type="text"
                onChange={this.handleLn}
                placeholder="last name is required"
              />
            </div>
            <div>
              <label for="name">Age: </label>
              <input
                type="text"
                onChange={this.handleAg}
                placeholder="age is required"
              />
            </div>
            <div>
              <label for="name">Gender: </label>
              {/* <input type="text" onChange={this.handleGd} /> */}
              <select onChange={this.handleGd}>
                <option>please choose your gender</option>
                <option>female</option>
                <option>male</option>
              </select>
            </div>
            <div>
              <label for="name">Password: </label>
              <input type="password" onChange={this.handlePs} />
            </div>
            <div>
              <label for="name">Repeat: </label>
              <input type="password" onChange={this.handleRp} />
            </div>
            <div>
              <Button color="danger" onClick={this.handleSubmit}>
                {" "}
                Create User
              </Button>
            </div>
          </FormGroup>
        </Form>
        <Button color="danger" onClick={this.onclickBack}>
          {" "}
          return to users{" "}
        </Button>
        <div>
          <Alert color="danger" isOpen={this.state.isVisble}>
            {" "}
            PASSWORDS DONT MATCH
          </Alert>
        </div>
        <div>
          <Alert color="warning" isOpen={this.state.isRequired}>
            {" "}
            Fiels Required
          </Alert>
        </div>
        <Alert color="success" isOpen={this.state.isChanged}>
          {" "}
          Changed Successfully
        </Alert>
      </div>
    );
  }
}

export default Create;
