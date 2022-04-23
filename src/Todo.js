import { useEffect, useReducer, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, InputGroup, Input } from "reactstrap";
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
      return state.filter((item) => {
        if (item.id === action.id) {
          return false;
        } else {
          return true;
        }
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
        id : ++count,
        todo: action.add
      }
      state = [...state, obj];
      return state;
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
  const handleAdd =() => {
    console.log('addInput',addInput.current.value);
    const addValue = addInput.current.value;
    dispatch({type:'addInput', add: addValue})
    addInput.current.value = '';
  }
  const handleUpdate = (update, item) => {
    // const item = e.target.getAttribute("data-id")
    // console.log(handleInput.current);
    const updateValue = update.value;
    update.value = "";
    dispatch({ type: "update", id: item.id, updateVal: updateValue });
  };
  
  return (
    <>
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Todo</th>
              <th>Remove Item</th>
              <th>Update Item</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.todo}</td>
                  <td>
                    <Button color="primary" onClick={() => handleRemove(item)}>
                      Remove Item
                    </Button>
                  </td>
                  <td className="d-flex justify-content-center">
                    <div className="input-group w-50">
                      <input
                        type="text"
                        ref={(el) => (handleInput.current[i] = el)}
                        className="form-control"
                        style={{ width: "70px!important" }}
                      />
                      <button
                        className="btn btn-primary"
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
        <button className="btn btn-success" onClick={() => setToggle(!toggle)}>
          Add Item
        </button>
        <br />
        <br />
        {toggle && (
          <div className="d-flex justify-content-center">
            <div className="input-group w-50">
              <input className="form-control" ref={addInput}/>
              <button className="btn btn-danger" onClick={handleAdd}>Add</button>
            </div>
          </div>
        )
        }
      </div>
    </>
  );
}
export default Todo;
