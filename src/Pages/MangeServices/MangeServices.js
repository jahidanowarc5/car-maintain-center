
import React from 'react';
import useServices from '../../hooks/UseServices';

const MangeServices = () => {
    const [services,setServices] = useServices();
    const handleDelete = id =>{
        const proceed = window.confirm('are you sure you want to delete?')
        if(proceed){
            const url = `http://localhost:5000/service/${id}`
            fetch(url,{
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                const remaining = services.filter(service => service._id !== id)
                setServices(remaining)
            })
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>manage your service:</h2>
            {
                services.map(service =><div key={service._id}>{service.name}<button onClick={()=>handleDelete(service._id)}>x</button></div> )
            }
        </div>
    );
};

export default MangeServices;