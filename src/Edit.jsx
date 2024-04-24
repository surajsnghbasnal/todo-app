import React, { useState } from 'react'

const Edit = () => {
  const [student, setStudent] = useState(["Suraj", "Shashank", "Rakesh", "Himani"]);
  const [editRow, setEditRow] = useState(false)
  const [rowIndex, setRowIndex] = useState();

  const [newStudent, setNewStudent] = useState()

  const handleEditScreenChange = (index) => {
    setRowIndex(index)
    setEditRow(true)
  }

  const handleEditSubmit = (name) => {
    const filterStudent = student.filter((item) => item === name)
    setStudent(filterStudent);
    setStudent((prev) => ([...prev, newStudent]))
    setNewStudent("");
    setEditRow(false);
    setEditRow()
  }

  console.log(student);

  return (
    <div className='ms-5' style={{ margin: "0 auto" }}>
      {
        student.map((item, index) => {

          console.log("rowIndex======>", rowIndex, "index=======> ", index, index === rowIndex, item);
          return (
            <>
              <div key={index} className='p-1 d-block text-secondary d-block p-2'>
                {
                  editRow && rowIndex === index ? <input defaultValue={item} onChange={(e) => setNewStudent(e.target.value)} /> : <span key={index}> {item}</span>
                }

                {
                  editRow && rowIndex === index ?
                    <>
                      <button type='button' className='btn btn-outline-danger' onClick={() => setEditRow(false)}>Cancel</button>
                      <button type='button' className='btn btn-outline-success' onClick={() => handleEditSubmit(item)}>Save</button>
                    </>
                    :
                    <button type='button' className='btn btn-outline-primary' onClick={() => handleEditScreenChange(index)}>Edit</button>
                }
              </div>
            </>
          )
        })
      }

    </div>
  )
}

export default Edit