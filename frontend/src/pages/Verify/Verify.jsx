import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Verify.css'
import {useNavigate, useSearchParams} from "react-router-dom"
import axios from 'axios'
const Verify = () => {

    const  [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate();
    const {url} = useContext(StoreContext);
    // console.log(success, orderId);

    const verifyPayment = async ()=>{
        const response = await axios.post(`${url}/api/order/verify`, {success , orderId});
        if (response.data.success) {
            navigate("/myorders");
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[]);

    return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
