import React from 'react'
import axios from "axios"


const ServerData = () => {
    try {
        axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }

    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(res => console.log(res))


    return (
        <div>ServerData</div>
    )
}

export default ServerData