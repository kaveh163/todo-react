import { useEffect, useReducer, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  InputGroup,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import "./Todo.css";
// const InitialTodo = [
//   {
//     id: 1,
//     todo: "Todo1",
//   },
//   {
//     id: 2,
//     todo: "Todo2",
//   },
//   {
//     id: 3,
//     todo: "Todo3",
//   },
// ];
const InitialTodo = [];
let count = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case "removeItem": {
      // return state.filter((item) => {
      //   if (item.id === action.id) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // });
      const removeValIndex = action.id - 1;
      console.log("remove", removeValIndex);
      console.log("stateRemove", state);
      state.splice(removeValIndex, 1);
      console.log("stateRemove2", state);
      count = state.length;
      if (count === 0) {
        localStorage.setItem("storeName", JSON.stringify([]));
      }
      return state.map((item, index) => {
        let obj = {};
        obj["id"] = index + 1;
        obj["todo"] = item.todo;
        return obj;
      });
    }
    case "update": {
      return state.map((item) => {
        if (item.id === action.id) {
          item.todo = action.updateVal;
          return item;
        } else {
          return item;
        }
      });
    }
    case "addInput": {
      let obj = {
        id: ++count,
        todo: action.add,
      };
      state = [...state, obj];
      return state;
    }
    case "lsSet": {
      console.log("reducestate", state);
      console.log("reducestate2", action.data);
      return action.data;
    }
    default:
      return state;
  }
};
function Todo() {
  const [state, dispatch] = useReducer(reducer, InitialTodo);
  const [toggle, setToggle] = useState(false);
  const handleRemove = (item) => {
    dispatch({ type: "removeItem", id: item.id });
  };
  const handleInput = useRef([]);
  const addInput = useRef();
  const handleAdd = () => {
    console.log("addInput", addInput.current.value);
    const addValue = addInput.current.value;
    dispatch({ type: "addInput", add: addValue });
    addInput.current.value = "";
  };
  const handleUpdate = (update, item) => {
    // const item = e.target.getAttribute("data-id")
    // console.log(handleInput.current);
    const updateValue = update.value;
    update.value = "";
    dispatch({ type: "update", id: item.id, updateVal: updateValue });
  };

  useEffect(() => {
    if (state.length === 0) {
      let data = JSON.parse(localStorage.getItem("storeName"));
      if (data) {
        count = data.length;
        dispatch({ type: "lsSet", data: data });
      }
    }
  }, []);

  useEffect(() => {
    // console.log("useEffect");
    // let data = JSON.parse(localStorage.getItem("data"));
    // console.log("data 1", data);
    // if (localStorage.getItem("data") === null) {
    //   data = [];
    //   localStorage.setItem("data", JSON.stringify(data));
    // } else {
    // if(state.length === 0) {
    //   dispatch({type: "lsSet", data: data})
    // } else {
    //   localStorage.setItem('data', JSON.stringify(state));
    // }
    // if (state.length === 0) {
    //   console.log("state");
    //   let refData = JSON.parse(localStorage.getItem("data"));
    //   console.log(refData);
    //   dispatch({ type: "lsSet", data: refData });
    // } else {
    //   data = [...state];
    //   localStorage.setItem("data", JSON.stringify(data));
    // }
    // }

    let array;
    let bool;
    // console.log("state1", state);

    array = JSON.parse(localStorage.getItem("storeName"));
    // console.log('array', array);

    if (localStorage.getItem("storeName") === null) {
      array = [];
      localStorage.setItem("storeName", JSON.stringify(array));
    } else {
      array = [...state];
      localStorage.setItem("storeName", JSON.stringify(array));
      // console.log("state2", state)
      // if (state.length === 0) {

      // console.log("state3", state);

      // let data = JSON.parse(localStorage.getItem("storeName"));
      // count = data.length;

      // console.log('data', data);

      // dispatch({ type: "lsSet", data: data });
    }
    // else {
    // console.log('state4', state)
    // array = [...state];
    // console.log('array2', array);
    // localStorage.setItem("storeName", JSON.stringify(array));
    // }
    // }
  }, [state]);

  return (
    <>
      <Container fluid>
        <div className="container-fluid">
          <Table className="">
            <thead>
              <tr>
                <th>#</th>
                <th>Todo</th>
                <th>Remove</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {state.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.todo}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(item)}
                        className="btn btn-sm btn-primary"
                      >
                        Remove
                      </button>
                    </td>
                    <td className="d-flex justify-content-center">
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          ref={(el) => (handleInput.current[i] = el)}
                          className="form-control"
                          style={{ width: "70px!important" }}
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            handleUpdate(handleInput.current[i], item)
                          }
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <br />
          <button
            className="btn btn-success"
            onClick={() => setToggle(!toggle)}
          >
            Add Item
          </button>
          <br />
          <br />
          {toggle && (
            <Col sm="12" className="col">
              <div className="">
                <div className="input-group  input-size">
                  <input className="form-control" ref={addInput} />
                  <button className="btn btn-danger" onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </div>
            </Col>
          )}
        </div>
      </Container>
    </>
  );
}
export default Todo;
