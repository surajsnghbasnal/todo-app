import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Listing = (props) => {
    const { todo, search, handleCompleteTodo, event, clickEdit, setClickEdit, editElem,  setNewvalue, handleEdit, handleSave, handleDelete, handleSelectAll, handleSelectIndividual, selectAll, title} = props
    console.log(selectAll);
    return (
        <>
            <Table striped className='text-center'>
                <thead>
                    <tr>
                        <th><Form.Check onChange={handleSelectAll} type="checkbox"/></th>
                        <th>Id</th>
                        <th>Mark Done</th>
                        <th>Todo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todo?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className='p-4 fw-bold'>
                                    Please Add Some Todo
                                </td>
                            </tr>
                        ) :
                            (
                                todo?.filter((item) => item.name?.toLowerCase().includes(search)).filter((item)=> item.status== title || title== "All Tasks").map((item, index) => {
                                    console.log(item.selected)
                                    return (
                                        <tr key={index}>
                                            <td><Form.Check type="checkbox" id={index.toString()} onChange={(e)=>handleSelectIndividual(item , index , e)}  checked={item.selected} disabled={item.selected } /></td>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Form.Check id={index.toString()} disabled={item.status === "Completed"} defaultChecked={item.status === "Completed"} type="checkbox" onChange={() => handleCompleteTodo(item)} />
                                            </td>
                                            {
                                                editElem === index && clickEdit ? (
                                                    <input
                                                        onChange={(e) => setNewvalue(e.target.value?.toLowerCase())}
                                                        defaultValue={item.name} />
                                                ) : (
                                                    <td>{item.name}</td>
                                                )
                                            }
                                            <td className={item.status === "Pending" ? "text-warning" : "text-danger"}>{item.status}</td>
                                            <td >
                                                {
                                                    editElem === index && clickEdit ? (
                                                        <>
                                                            <Button onClick={() => handleSave(item)} variant="primary">Save</Button>
                                                            <Button className='ml-1' onClick={() => setClickEdit(false)} variant="danger">Cancel</Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button disabled={item.status === "Completed" ? true : false} onClick={() => handleEdit(index)} variant="secondary">Edit</Button>
                                                            <Button onClick={() => handleDelete(item, index)} className='ml-1' variant="danger">Delete</Button>
                                                        </>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                    }

                    { todo?.length != 0 &&   todo?.filter((item) =>item.name.toLowerCase().includes(search)).length === 0 && (
                        <tr>
                            <td colSpan={6} className='p-4 fw-bold'>
                                No Record Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default Listing