"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import {useState} from 'react'
import Link from "next/link";
import { useRouter} from "next/navigation";

const page = () => {
	const [houses,setHouses]=useState([])

  const fetchHouse=async()=>{
    try {
        const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/houses`)
		const houses1=res.data;
		setHouses(houses1);
        console.log(houses);
    } catch (error) {
        console.log(error)
    }
  }
  
  const handleDelete=async(getCurrentID)=>{
		try{
		const res=await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/houses/${getCurrentID}`)
		 fetchHouse();
		console.log(res);
		}
		catch(err){
		console.log(err)
		}
  }
  return (
    <div>
        <Button onClick={fetchHouse}>Fetch</Button>
		<div>
			{houses.map((house,index)=>(
				<div key={index}>
					<h1>{house.title}</h1>
					<Link href={`/${house.id}/houseEdit`}>
						<Button>
							Edit
						</Button>
					</Link>
					<Button onClick={()=>handleDelete(house.id)}>
						Delete
					</Button>
				</div>
			))}
		</div>
    </div>
  )
}

export default page