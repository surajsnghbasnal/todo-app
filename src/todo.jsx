import React, { useState } from 'react'
import Listing from './listing'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Toast } from 'react-bootstrap';


const Todo = () => {
const [todo, setTodo] = useState([]);
const [tempTodo, setTempTodo] = useState(null);
const [error, setError] = useState()
const [show, setShow] = useState(false);
const [search, setSearch] = useState("")
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [clickEdit, setClickEdit] = useState(false)
const [editElem, setEditElem] = useState()
const [deleteElem, setDeleteElem] = useState("")
const [newValue, setNewvalue] = useState()
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');




const handleSetTodo = () => {
    if (tempTodo?.length === 0 || tempTodo === null) {
    setError(true);
    setTimeout(() => {
        setError(false);
    }, 2000)
    } else {
    setTodo((prev) => ([...prev, { name: tempTodo, status: "Pending" }]))
    }
    handleClose();
}

const handleCompleteTodo = (e, data) => {
    const{checked} = e.target
    setTodo((prev) => {
        return prev.map((item) => {
            if (item.name === data.name) {
                return {
                ...item, 
                status: checked? 'Completed': 'Pending'
            }
        } else{
            return item
        }
        })
    })
}

return (
    <>
    {  
            <div className="container position-fixed bottom-0 right-0 pb-3  w-1/4">
        <Toast show={showToast} onClose={()=> setShowToast(false)}>
        <Toast.Header></Toast.Header>
        <Toast.Body >{toastMessage}</Toast.Body>
        </Toast>
        </div>
    }
    {
        error &&
        <Alert key={"warning"} variant={"warning"}>
        Please add some todo
        </Alert>
    }
    <div className='d-flex  justify-content-between p-3'>
            <input
            type="text"
            className="form-control w-25"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            aria-label="Search input"
            />

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




    <Listing setTodo ={setTodo} todo={todo} search={search} handleCompleteTodo={handleCompleteTodo} clickEdit={clickEdit} setClickEdit={setClickEdit} editElem={editElem} setEditElem={setEditElem} deleteElem={deleteElem} setDeleteElem={setDeleteElem} newValue={newValue} setNewvalue={setNewvalue} toastMessage={toastMessage} setToastMessage={setToastMessage} showToast={showToast} setShowToast={setShowToast}/>
    </>
)
}

export default Todo