import React, { useState } from 'react'


const data = [
  {
    albumId: 1,
    id: 1,
    title: "shashank",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  },
  {
    albumId: 1,
    id: 2,
    title: "shivam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796"
  },
  {
    albumId: 1,
    id: 3,
    title: "ritvik",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
    albumId: 1,
    id: 4,
    title: "Suraj",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776"
  },
  {
    albumId: 1,
    id: 5,
    title: "Nontu",
    url: "https://via.placeholder.com/600/f66b97",
    thumbnailUrl: "https://via.placeholder.com/150/f66b97"
  },
  {
    albumId: 1,
    id: 6,
    title: "Tanay",
    url: "https://via.placeholder.com/600/56a8c2",
    thumbnailUrl: "https://via.placeholder.com/150/56a8c2"
  },
  {
    albumId: 1,
    id: 7,
    title: "Vikas",
    url: "https://via.placeholder.com/600/b0f7cc",
    thumbnailUrl: "https://via.placeholder.com/150/b0f7cc"
  },
  {
    albumId: 1,
    id: 8,
    title: "Anmol",
    url: "https://via.placeholder.com/600/54176f",
    thumbnailUrl: "https://via.placeholder.com/150/54176f"
  },
  {
    albumId: 1,
    id: 9,
    title: "nishu",
    url: "https://via.placeholder.com/600/51aa97",
    thumbnailUrl: "https://via.placeholder.com/150/51aa97"
  },
  {
    albumId: 1,
    id: 10,
    title: "Tanya",
    url: "https://via.placeholder.com/600/810b14",
    thumbnailUrl: "https://via.placeholder.com/150/810b14"
  },
  {
    albumId: 1,
    id: 11,
    title: "Supriya",
    url: "https://via.placeholder.com/600/1ee8a4",
    thumbnailUrl: "https://via.placeholder.com/150/1ee8a4"
  },
  {
    albumId: 1,
    id: 12,
    title: "Shruti",
    url: "https://via.placeholder.com/600/66b7d2",
    thumbnailUrl: "https://via.placeholder.com/150/66b7d2"
  },
  {
    albumId: 1,
    id: 13,
    title: "Shrey",
    url: "https://via.placeholder.com/600/197d29",
    thumbnailUrl: "https://via.placeholder.com/150/197d29"
  },
  {
    albumId: 1,
    id: 14,
    title: "Shivan",
    url: "https://via.placeholder.com/600/61a65",
    thumbnailUrl: "https://via.placeholder.com/150/61a65"
  },
  {
    albumId: 1,
    id: 15,
    title: "golu",
    url: "https://via.placeholder.com/600/f9cee5",
    thumbnailUrl: "https://via.placeholder.com/150/f9cee5"
  }
]


const transformData = (array) => {

  const result = array.map((item) => {
    const { albumId, id, title, url, thumbnailUrl } = item

    return {
      albumId,
      id,
      title,
      url,
      thumbnailUrl
    }
  })

  return result

}




const Parent = () => {

  const [employee, setEmployee] = useState(transformData(data));
  const [search, setSearch] = useState("")


  return (
    <div >

      <section >
        <div className="container py-5 h-100">
          <div className='d-flex justify-content-end'>


            <input type='search' placeholder='Search.....' onChange={(e) => setSearch(e.target.value.toLowerCase())} className='form-control w-25' />
          </div>
          <div className="row d-flex justify-content-center align-items-center h-100">

            {
              employee.filter((item) => item.title.toLowerCase().includes(search)).map((item) => {
                return (
                  <div className="col-md-6 col-xl-6 p-2">
                    <div className="card" style={{ borderRadius: 15 }}>
                      <div className="card-body text-center">
                        <div className="mt-3 mb-4">
                          <img
                            src={item.url}
                            className="rounded-circle img-fluid"
                            style={{ width: 100 }}
                          />
                        </div>
                        <h4 className="mb-2">{item.title}</h4>
                        <p className="text-muted mb-4">
                          @Programmer <span className="mx-2">|</span>{" "}
                          <a href="#!">mdbootstrap.com</a>
                        </p>

                        <button
                          type="button"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-primary btn-rounded btn-lg"
                        >
                          {"Follow"}
                        </button>
                        <div className="d-flex justify-content-between text-center mt-5 mb-2">
                          <div>
                            <p className="mb-2 h5">{"5566778877"}</p>
                            <p className="text-muted mb-0">Phone</p>
                          </div>
                          <div className="px-3">
                            <p className="mb-2 h5">8512</p>
                            <p className="text-muted mb-0">Income amounts</p>
                          </div>
                          <div>
                            <p className="mb-2 h5">4751</p>
                            <p className="text-muted mb-0">Total Transactions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }


            {employee.filter((item) => item.title.toLowerCase().includes(search)).length === 0 && "no data found"}

          </div>
        </div>
      </section>

    </div>
  )
}

export default Parent