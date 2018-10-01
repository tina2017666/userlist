import axios from "axios";
export const setdata = data => ({
  type: "GETDATA",
  data: data
});

export const getdata = () => {
  return dispatch => {
    axios.get("/api/user").then(res => {
      dispatch(setdata(res.data));
    });
  };
};
export const getrender = data => {
  return dispatch => {
    dispatch(setdata(data));
  };
};

export const getprev = num => ({
  type: "GET_PRE",
  data: num
});
export const getnext = num => ({
  type: "GET_NEXT",
  data: num
});
export const getinit = () => ({
  type: "GET_INIT"
});
export const editdata = (id, update) => {
  return dispatch => {
    axios.put(`/api/user/${id}`, update).then(res => {
      console.log(res);
      if (res) {
        //alert("Changed Successfully!!");
        dispatch(getdata());
      }
    });
  };
};

export const deletedata = id => {
  return dispatch => {
    axios.delete(`/api/user/${id}`).then(res => {
      dispatch(getdata());
    });
  };
};
export const adduser = update => {
  return dispatch => {
    axios.post("/api/user", update).then(() => {
      dispatch(getdata());
    });
  };
};
export const getuser = id => {
  return dispatch => {
    axios.get(`/api/user/${id}`).then(res => {
      console.log(res);
      dispatch(setdata(res.data));
    });
  };
};

export const getpage = () => ({
  type: "GET_PAGE"
});
