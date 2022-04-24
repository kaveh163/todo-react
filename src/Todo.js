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
      // return state.filter((item) => {
      //   if (item.id === action.id) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // });
      const removeValIndex = action.id -1;
      console.log('remove', removeValIndex);
      console.log('stateRemove', state);
      state.splice(removeValIndex, 1);
      count = state.length;
      return state.map((item, index) => {
        let obj ={};
        obj['id'] = index + 1;
        obj['todo'] = item.todo;
        return obj
      })
      
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
      console.log('reducestate', state);
      console.log('reducestate2', action.data);
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
      
      // console.log("state2", state)
      if (state.length === 0) {
        // console.log("state3", state);
        let data = JSON.parse(localStorage.getItem("storeName"));
        count = data.length;
        
        // console.log('data', data);
        dispatch({ type: "lsSet", data: data });
      } else {
        // console.log('state4', state)
        array = [...state];
        // console.log('array2', array);
        localStorage.setItem("storeName", JSON.stringify(array));
      }
    }
  }, [state]);

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
              <input className="form-control" ref={addInput} />
              <button className="btn btn-danger" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Todo;
