import axios from 'axios'
import { useEffect, useState } from 'react'
import { BackendURL, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [lists, setList] = useState([])
  console.log(lists);
  
const fetchProduct = async ()=> {
try {
  const response = await axios.get(BackendURL+"/api/product/list")
  console.log(response);
  
  if (response.data.success) {
    setList(response.data.products);
    
  }else{
    toast.error(response.data.message)
  }
  
} catch (error) {
  console.log(error);
  toast.error(error.message)
  
}
}
const removeProduct = async(id)=>{
  try {
    const response = await axios.post(BackendURL+"/api/product/remove", {id}, {headers:{
      token
    }} )
    if(response.data.success){
      toast.success(response.data.message);
     await fetchProduct()
    }else{
    toast.error(response.data.message)
  }
    
  } catch (error) {
    console.log(error);
  toast.error(error.message)
  }
}

  useEffect(()=>{

fetchProduct()

  },[])


  return (
    <>
    <p className='mb-2 text-2xl'>All the products</p>

    <div className='flex flex-col gap-3'>
                {/*   List of Table */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] rounded-md bg-gray-200 px-2 py-1 items-center text-black"> 
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/* Product listing */}
      {lists.map((item, index)=> 
        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] px-2 py-1 items-center border border-gray-300' key={index}>
           <img src={item.image[0]} className='w-12' />
           <p>{item.name}</p>
           <p>{item.category}</p>
           <p>{currency}{item.price}</p>
           <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center text-2xl cursor-pointer'>X</p>
        </div>
      )}
    </div>
    </>
  )
}

export default List