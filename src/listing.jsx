import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Listing = (props) => {
    const { todo , setTodo, search, handleCompleteTodo, clickEdit, setClickEdit, editElem, setEditElem, deleteElem, setDeleteElem, newValue, setNewvalue, toastMessage, setToastMessage, showToast, setShowToast} = props


    const handleEdit = (index)=>{
        setEditElem(index)
        setClickEdit(true)
    }
    const handleSave=(taskObj)=>{
        setTodo((prev)=> {
            return prev.map((item)=> {
                if(item.name === taskObj.name){
                    return {
                        ...item,
                        name: newValue
                    }
                }else{
                    return item
                }
            })  
        })
        setClickEdit(false)
        setNewvalue("")
        setToastMessage("Your record has been saved.")
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000);
    }
    const handleDelete=(index)=>{
        setDeleteElem(index)
        console.log(index)
        const filterTodo = todo?.filter((item, index)=> deleteElem != index)
        setTodo(filterTodo);
        setTodo((prev)=>[...prev]);
        setToastMessage("Your record has been deleted.")
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000);
    }

    return (
        <>
            <Table striped className='text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Mark Done</th>
                        <th>Todo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todo.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='p-4 fw-bold'>
                                    Please Add Some Todo
                                </td>
                            </tr>
                        ):
                        (
                            todo?.filter((item)=> item.name?.toLowerCase().includes(search)).map((item, index) => {
                                return (
                                    <tr >
                                        <td>{index + 1}</td>
                                        <td>
                                            <Form.Check disabled={item.status==="Completed"? true : false}  type="checkbox" onChange={(e)=>handleCompleteTodo(e, item)} />
                                        </td>
                                        {
                                            editElem == index && clickEdit?(
                                                <input
                                                    onChange={(e)=> setNewvalue(e.target.value?.toLowerCase())}
                                                    defaultValue={item.name}/>                                                   
                                            ):(
                                                <td>{item.name}</td>
                                            )
                                        }
                                        <td className={item.status === "Pending" ? "text-warning" : "text-danger"}>{item.status}</td>
                                        <td >
                                            {
                                                editElem == index && clickEdit? (
                                                    <>
                                                    <Button onClick={()=>handleSave(item)} variant="primary">Save</Button>
                                                    <Button  className='ml-1' onClick={()=>setClickEdit(false)} variant="danger">Cancel</Button>
                                                    </>
                                                ):(
                                                    <>
                                                    <Button disabled={item.status==="Completed"? true : false}  onClick={()=> handleEdit(index)} variant="secondary">Edit</Button>
                                                    <Button onClick={()=> handleDelete(index)} className='ml-1' variant="danger">Delete</Button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            )
                    }
                    {/* {todo?.filter((item) => item.name.toLowerCase().includes(search)).length === 0 && "no data found"} */}
                </tbody>
            </Table>
        </>
    )
}

export default Listing