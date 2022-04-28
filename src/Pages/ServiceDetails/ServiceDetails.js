


import { Link, useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/UseServiceDetail';

const ServiceDetails = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId)
   
    return (
        <div>
            <h2>Wellcome to service book:{service.name}</h2>
            <div className='text-center'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>proceed checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetails;