import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getUrl = 'http://localhost:5000/item/get-item';
const postUrl = 'http://localhost:5000/item/post-item';
// const delUrl = 'http://localhost:5000/item/delete';

// get with axios
// axios.get(`${url}`)
//     .then((result) => { console.log(result) })
//     .catch((error) => { console.log(`iko sida mahali pwana ${error}`) });

const Main = () => {

    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [quant, setQuant] = useState('');
    const [desc, setDesc] = useState('');
    const [id, setId] = useState();

    // get
    useEffect(() => {
        axios.get(`${getUrl}`)
            .then(result => {
                const items = result.data;
                setItems(items)
                console.log(items)
                // setId(arr[0]._id)
                // console.log(arr[0]._id)
            })
            // log errorsx 
            .catch((error) => console.log(`err in fetch ${error}`))
    }, []);

    // delete
    const deleteItem = async (id, e) => {

        console.log(id)
        await axios.delete(`http://localhost:5000/item/delete/${id}`)
            .then((result) => console.log(`success in deleting user!: ${result.data}`))
            .catch((error) => console.log(`error in delete user!: ${error}`));

        // const items = this.state.items.filter(item => item.id !== id);
        // setItems(items);
    }

    // post
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            quantity: quant,
            description: desc,
        }
        console.log(formData)
    }
    useEffect((formData) => {
        axios.post(`${postUrl}`, formData)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(`error in post ${err}`))
    }, [])
    return (
        <nav>
            <form onSubmit={onSubmit}>
                <label> name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='name' />
                </label>
                <label > quatity:
                    <input type="number" value={quant} onChange={e => setQuant(e.target.value)} placeholder='quant' />
                </label>
                <label > description
                    <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder='desc' />
                </label>
                <button type="submit"> POST </button>
            </form>
            {
                items.map((item) =>
                    <ul key={item._id} >
                        <p> <strong> id: {!item._id ? "loading id" : item._id} </strong></p>
                        <li>
                            name: {!item.name ? "loading..." : item.name}
                            <button onClick={e => deleteItem(item._id, e)}> delete</button>
                        </li>
                        <ol>
                            <li > quantity: {item.quantity}  </li>
                            <li > description: {item.description}  </li>
                            <li > created at: {item.createdAt}  </li>
                            <li > updated at: {item.updatedAt}  </li>
                        </ol>
                    </ul>
                )
            }
        </nav>
    )
}

export default Main
