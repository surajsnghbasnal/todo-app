import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Listing = (props) => {
    const { todo, handleCompleteTodo, handleDeleteTodo, handleEditTodo, editTodo, setEditTodo, handleEditTodoSubmit, search } = props;
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
                        todo.length != 0 ? todo.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => {
                            return (
                                <tr >
                                    <td>{index + 1}</td>
                                    <td>
                                        <Form.Check disabled={item?.status === "Completed"} defaultChecked={item.status === "Completed"} type="checkbox" onChange={(e) => handleCompleteTodo(item, e)} />
                                    </td>
                                    <td>
                                        {
                                            editTodo.isActive && editTodo.rowIndex === index ? <Form.Control type="text" defaultValue={item.name} onChange={(e) => setEditTodo((prev) => ({ ...prev, newTodo: e.target.value }))} />
                                                :
                                                <>
                                                    {item.name}
                                                </>
                                        }
                                    </td>
                                    <td className={item.status === "Pending" ? "text-warning" : "text-danger"}>{item.status}</td>
                                    <td >
                                        {
                                            editTodo.isActive && index === editTodo.rowIndex ?
                                                (
                                                    <>
                                                        <Button variant="secondary" onClick={(e) => setEditTodo((prev) => ({ ...prev, isActive: false, rowIndex: null, newTodo: null, item: null }))}>Cancel</Button>{' '}
                                                        <Button variant="danger" onClick={handleEditTodoSubmit}>Save</Button>{' '}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button variant="secondary" onClick={(e) => handleEditTodo(item, e, index)}>Edit</Button>{' '}
                                                        <Button variant="danger" onClick={() => handleDeleteTodo(item)}>Delete</Button>{' '}
                                                    </>
                                                )
                                        }

                                    </td>
                                </tr>
                            )
                        })
                            : todo.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                                <tr>
                                    <td colSpan={5} className='p-4 fw-bold'>
                                        No data found
                                    </td>
                                </tr>
                            ) : todo.length === 0 && (
                                <tr>
                                    <td colSpan={5} className='p-4 fw-bold'>
                                        Please Add Some Todo
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Listing