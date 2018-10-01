import React, { Component } from "react";

import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Userlist from "./Userlist";
import Edit from "../components/Edit";
import Create from "../components/Create";

import { connect } from "react-redux";
import * as actions from "../redux/actions";

const WithRouterUserlist = withRouter(Userlist);
const WithRouterEdit = withRouter(Edit);
const WithRouterCreate = withRouter(Create);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => <WithRouterUserlist {...this.props} />}
            />
            {/* <Route exact={true} path="/users" component={users} /> */}
            <Route
              exact={true}
              path="/edit/:id"
              render={() => <WithRouterEdit {...this.props} />}
            />

            <Route
              exact={true}
              path="/create"
              render={() => <WithRouterCreate {...this.props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // state is the global state, we have already had the provider
    content: state.content,
    page: state.page
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setdata: data => {
      dispatch(actions.setdata(data));
    },
    getdata: () => {
      dispatch(actions.getdata());
    },
    getprev: p => {
      dispatch(actions.getprev(p));
    },
    getnext: p => {
      dispatch(actions.getnext(p));
    },
    getinit: () => {
      dispatch(actions.getinit());
    },
    delete: id => {
      dispatch(actions.deletedata(id));
    },
    edit: (id, update) => {
      dispatch(actions.editdata(id, update));
    },
    add: update => {
      dispatch(actions.adduser(update));
    },
    getuser: id => {
      dispatch(actions.getuser(id));
    },
    getpage: () => {
      dispatch(actions.getpage());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default connect(
//   state => ({ content: state.content, page: state.page }),
//   // { getAll, pagedown, pageup, deleteUser, pageInit }
//   { getdata, getprev, getnext }
// )(App);
