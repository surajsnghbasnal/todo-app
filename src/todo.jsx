import React, { useState, useEffect } from 'react'
import Listing from './listing'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Toast,  DropdownButton, Dropdown  } from 'react-bootstrap';
import axios from 'axios'

const Todo = () => {
const [todo, setTodo] = useState();
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
const [title, settitle] = useState("All Tasks")
const [event, setevent] = useState()
const [selectAll, setselectAll] = useState(false)
const [selectedId, setselectedId] = useState(null)

const getTodo = () => {
    axios.get('http://localhost:4200/todo')
        .then(response => {
            setTodo(response.data);
        })
        .catch(error => {
            console.log(error);
        });
};
useEffect(()=>{
    getTodo()
}, [])

const handleSetTodo = () => {
    if (tempTodo?.length === 0 || tempTodo === null) {
    setError(true);
    setTimeout(() => {
        setError(false);
    }, 2000)
    } else {
        // set data to database by using axios.
        axios.post('http://localhost:4200/todo', {name: tempTodo, status: "Pending", selected: false})
        .then((response)=>{
            getTodo()
            console.log(getTodo());
        }
    ).catch((error) => console.log(error))
    }
    handleClose();
}

const handleCompleteTodo = (item) => {
            // set data to database by using axios.
    axios.patch(`http://localhost:4200/todo/${item.id}`, {status:"Completed"}).then((response)=>{
        getTodo()
    }).catch((error) => console.log(error))
}

const handleEdit = (index) => {
    setEditElem(index)
    setClickEdit(true)
}

const handleSave = (item) => {
    axios.patch(`http://localhost:4200/todo/${item.id}`, {name: newValue ? newValue : item.name}).then((response)=>{
        getTodo()
    }).catch((error)=> console.log(error))
    setClickEdit(false)
    setNewvalue("")
    setToastMessage("Your record has been saved.")
    setShowToast(true)
    setTimeout(() => {
        setShowToast(false)
    }, 3000);
}

const handleDelete = (item, index) => {
    axios.delete(`http://localhost:4200/todo/${item.id}`).then((response)=>{
        getTodo()
        document.getElementById(index.toString()).checked = false
    }).catch((error)=> console.log(error))
}

const handleSelect = (eventKey) => {
    if(eventKey=="All tasks"){
        settitle("All Tasks")
        setevent(eventKey)
    }else if(eventKey=="Completed"){
        settitle("Completed")
        setevent(eventKey)
    }else if(eventKey=="Pending"){
        settitle("Pending")
        setevent(eventKey)
    }
    // console.log(eventKey)
}

const handleSelectAll =(e)=>{
    setselectAll(e.target.checked)
    if (e.target.checked) {
        setselectedId(todo?.map((item)=> item.id))
        todo?.map((item)=> item.id).map((item)=>{
            axios.patch(`http://localhost:4200/todo/${item}`,{selected: true}).then((response)=>{
                getTodo()
            }).catch((error)=> console.log(error))
        })
    }else{
        selectedId.map((item)=>{
            axios.patch(`http://localhost:4200/todo/${item}`,{selected: false}).then((response)=>{
                getTodo()
            }).catch((error)=> console.log(error))
        })
        setselectedId([])
    }
}

const handleSelectIndividual =(item)=>{
    console.log(item.id)
    if (!selectAll) {
        setselectedId((prev)=>[...prev, item.id])
    }else{
        setselectedId((prev)=>[...prev])
    }
}

const handleBulkDelete =()=>{
    selectedId.map((item)=>{
        axios.delete(`http://localhost:4200/todo/${item}`).then((response)=>{
            getTodo()
        }).catch((error)=> console.log(error))
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
    
        <DropdownButton disabled={todo?.length > 0? false: true} title={title} variant="primary" onSelect={handleSelect}>
            <Dropdown.Item eventKey="All tasks">All Tasks</Dropdown.Item>
            <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
        </DropdownButton>

        <Button disabled={selectedId == null || selectedId?.length == 0} variant="danger" onClick={()=>handleBulkDelete()}>
            Delete
        </Button>

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




    <Listing  todo={todo} search={search} setNewvalue={setNewvalue} handleCompleteTodo={handleCompleteTodo} handleDelete={handleDelete} handleSave={handleSave} handleEdit={handleEdit} clickEdit={clickEdit} setClickEdit={setClickEdit} editElem={editElem} deleteElem={deleteElem} setDeleteElem={setDeleteElem} event={event} handleSelectAll={handleSelectAll} handleSelectIndividual={handleSelectIndividual} selectAll={selectAll} title={title}/>
    </>
)
}

export default Todo