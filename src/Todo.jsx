import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [tempTodo, setTempTodo] = useState(null);
  const [error, setError] = useState();
  const [search, setSearch] = useState("")
  const [editTodo, setEditTodo] = useState({
    isActive: false,
    rowIndex: null,
    item: null,
    newTodo: null,
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSetTodo = () => {
    if (tempTodo?.length === 0 || tempTodo === null) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000)
    } else {
      // api calling => 
      //  axios.post("url" , "data").then((res)=>console.log(res)).catch((err)=>console.log(err))
      axios.post("http://localhost:4200/todo", { name: tempTodo, status: "Pending" }).then((res) => {
        getTodoData();
        handleClose();
      }).catch((err) => console.log(err))
    }
  
  }

  const getTodoData = ()=>{
      axios.get("http://localhost:4200/todo").then((res)=>{
        console.log(res)
        setTodo(res.data)
      }).catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getTodoData()
  },[])




  const handleCompleteTodo = (item, e) => {
    axios.patch(`http://localhost:4200/todo/${item.id}` , {status: "Completed"} ).then((res) => {
      getTodoData();
    }).catch((err) => console.log(err))


   
  }

  const handleDeleteTodo = (item) => {
    axios.delete(`http://localhost:4200/todo/${item.id}`).then((res) => {
      getTodoData()
    }).catch((err) => console.log(err))
  }

  const handleEditTodo = (data, e, index) => {
    setEditTodo({
      isActive: true,
      rowIndex: index,
      item: data,
      newTodo: null,
    })
  }

  const handleEditTodoSubmit = () => {

    const { item } = editTodo;
    axios.patch(`http://localhost:4200/todo/${item.id}` , {name: editTodo.newTodo} ).then((res) => {
      getTodoData();
      setEditTodo({
        isActive: false,
        rowIndex: null,
        item: null,
        newTodo: null,
      })
    }).catch((err) => console.log(err))
  }



  return (
    <>

      {
        error &&
        <Alert key={"warning"} variant={"warning"}>
          Please add some todo
        </Alert>
      }


      <div className='d-flex justify-content-end p-3'>
        <input className='form-control w-25 ' onInput={(e) => setSearch(e.target.value)} placeholder='Search for any todo ' />
        <Button variant="primary" onClick={handleShow}>
          Add Todo
        </Button>

      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" onChange={(e) => setTempTodo(e.target.value)} placeholder="Enter new todo" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSetTodo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>



      <Listing todo={todo} search={search} editTodo={editTodo} setEditTodo={setEditTodo} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} handleEditTodoSubmit={handleEditTodoSubmit} />
    </>
  )
}

export default Todo