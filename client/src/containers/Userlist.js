import React, { Component } from "react";
// import {
//   BrowserRouter,
//   Route,
//   Link,
//   Switch,
//   withRouter
// } from "react-router-dom";
import { Badge, Button } from "reactstrap";

class Userlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchData: [],
      isSearched: false
    };
  }
  componentDidMount = () => {
    console.log("HI I AM WORKING");
    this.props.getdata();
  };
  handleSearch = e => {
    // we have to start from the 0th to search
    //console.log(this.props.actdata.content);
    this.props.getinit();
    const content = this.props.content;
    const value = e.target.value;
    if (value === "") {
      this.setState({
        searchData: this.props.content,
        isSearched: true,
        search: value
      });
    } else {
      const res = content.filter(item => {
        return (
          item.firstName.toLowerCase().includes(value.toLowerCase()) ||
          item.lastName.toLowerCase().includes(value.toLowerCase())
        );
      });

      this.setState({ searchData: res, isSearched: true, search: value });
    }
  };

  onclikEdit = (id, fn, ln, gd, ag) => {
    this.props.history.push(
      `/edit/${id}?firstName=${fn}&lastName=${ln}&age=${ag}&gender=${gd}`
    );
  };
  onclickDelete = id => {
    this.props.delete(id);
  };
  onclickPre = () => {
    const { page } = this.props;
    console.log(page);
    if (page <= 0) {
      this.props.getinit();
      console.log(page);
    } else {
      this.props.getprev(this.props.page);
    }
  };
  onclickNext = () => {
    const { page, content } = this.props;
    console.log(Math.floor(content.length / 3));
    if (page <= Math.floor(content.length / 3) - 1) {
      this.props.getnext(this.props.page);
    } else {
    }
  };
  onclickCreate = () => {
    this.props.history.push("/create");
  };
  onclickSort = () => {
    const { content } = this.props;
    const { searchData } = this.state;
    if (content.length !== 0 && searchData.length === 0) {
      content.sort((a, b) => {
        var a1 = a.firstName.toLowerCase();
        var b1 = b.firstName.toLowerCase();
        if (a1 < b1) {
          return -1;
        } else if (a1 > b1) {
          return 1;
        } else {
          return 0;
        }
      });
      this.props.setdata(content);
      console.log(this.props.content);
      // this.setState({ searchData: content, isSearched: true });
    } else if (searchData !== 0) {
      searchData.sort((a, b) => {
        var a1 = a.firstName.toLowerCase();
        var b1 = b.firstName.toLowerCase();
        if (a1 < b1) {
          return -1;
        } else if (a1 > b1) {
          return 1;
        } else {
          return 0;
        }
      });
      this.setState({ searchData });
    }
  };
  render() {
    const { isSearched, searchData } = this.state;
    const { page, content } = this.props;
    console.log(page);
    console.log(isSearched);
    console.log(searchData);
    let data;

    if (isSearched) {
      data = searchData.slice(page * 3, page * 3 + 3);
    } else {
      data = content.slice(page * 3, page * 3 + 3);
    }
    console.log(data);

    return (
      <div>
        <h1>Users List</h1>
        <div>
          Search:
          <input
            type="text"
            onChange={this.handleSearch}
            value={this.state.search}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <Button>Edit</Button>
              </th>

              <th>
                <Button>Delete</Button>
              </th>
              <th>
                <Button onClick={this.onclickSort}>First Name</Button>
              </th>
              <th>
                {" "}
                <Button>Last Name </Button>
              </th>
              <th>
                {" "}
                <Button>Gender </Button>
              </th>
              <th>
                {" "}
                <Button>Age </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.onclikEdit(
                        item._id,
                        item.firstName,
                        item.lastName,
                        item.gender,
                        item.age
                      );
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.onclickDelete(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Button color="success" onClick={this.onclickPre}>
            PREV
          </Button>
          <Button color="success" onClick={this.onclickNext}>
            NEXT
          </Button>
        </div>
        <Button color="warning" onClick={this.onclickCreate}>
          {" "}
          Creat User
        </Button>
      </div>
    );
  }
}
export default Userlist;
