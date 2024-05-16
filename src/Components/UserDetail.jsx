import React, { useState } from 'react'

const UserDetail = () => {
    const [formData, setFormData] = useState({name:"", email:"", number:"", host:[], clean:[], beverages:[], dining:[] }) 
    const handleChange = (e)=>{
        const category = e.target.id.split("-")[0];
        const rating = e.target.id.split("-")[1];
        if (e.target.id === 'name' || e.target.id === "email" || e.target.id === "number"){
            setFormData({...formData, [e.target.id]:e.target.value})
        }
        if (e.target.id === 'host-excellent' || e.target.id === "host-good" || e.target.id === "host-fair" || e.target.id === "host-bad"){
            
            setFormData(prevState => ({
                ...prevState,
                [category]: prevState[category].includes(rating)
                  ? prevState[category].filter(item => item !== rating)
                  : [rating]
              }));
        }
        if (e.target.id === 'clean-excellent' || e.target.id === "clean-good" || e.target.id === "clean-fair" || e.target.id === "clean-bad"){
            
            setFormData(prevState => ({
                ...prevState,
                [category]: prevState[category].includes(rating)
                  ? prevState[category].filter(item => item !== rating)
                  : [rating]
              }));
        }
        if (e.target.id === 'beverages-excellent' || e.target.id === "beverages-good" || e.target.id === "beverages-fair" || e.target.id === "beverages-bad"){
            
            setFormData(prevState => ({
                ...prevState,
                [category]: prevState[category].includes(rating)
                  ? prevState[category].filter(item => item !== rating)
                  : [rating]
              }));
        }
        if (e.target.id === 'dining-excellent' || e.target.id === "dining-good" || e.target.id === "dining-fair" || e.target.id === "dining-bad"){
        
            setFormData(prevState => ({
                ...prevState,
                [category]: prevState[category].includes(rating)
                  ? prevState[category].filter(item => item !== rating)
                  : [rating]
              }));
        }
    }
    console.log(formData);
  return (
    <div>
        <div className='mx-auto my-5 max-w-5xl border-2 rounded-lg p-3'>
            <form className='flex flex-col gap-4'>                
                <div className='flex md:flex-row flex-col gap-3 '>
                    <div className='flex flex-col gap-3 md:w-[50%]'  >
                        <div className='flex flex-col gap-1'>
                            <label className='whitespace-nowrap font-semibold'>Customer Name</label>
                            <input type='text' id='name' value={formData.name} onChange={handleChange} placeholder='Name'
                            required  className='p-3  border rounded-lg' />
                        </div>                
                        <div className='flex flex-col gap-1'>
                            <label className='whitespace-nowrap font-semibold'>Contact Number</label>
                            <input type='text' id='number' value={formData.numeber} onChange={handleChange} placeholder='Number'
                            required className='p-3  border rounded-lg' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 md:w-[50%] ' >
                        <div className='flex flex-col gap-1'>
                            <label className='whitespace-nowrap font-semibold'>Email</label>
                            <input type='email' id='email' value={formData.email} onChange={handleChange} 
                                placeholder='Email' required  className='p-3  border rounded-lg' />
                        </div>                
                    </div>
                    
                </div>

                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='flex flex-col gap-3' style={{width:"50%"}}>                    
                        <div className='flex flex-col gap-1' >
                            <label className='whitespace-nowrap font-semibold'>
                                Please rate the quality of the service received from the host
                            </label>
                            <div className='flex gap-3'>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='host-excellent' className='w-5' checked={formData.host.includes("excellent")} 
                                        onChange={handleChange}/>
                                    <span >Excellent</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='host-good' className='w-5' checked={formData.host.includes("good")} 
                                        onChange={handleChange}/>
                                    <span >Good</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='host-fair' className='w-5' checked={formData.host.includes("fair")} 
                                        onChange={handleChange}/>
                                    <span >Fair</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='host-bad' className='w-5' checked={formData.host.includes("bad")} 
                                        onChange={handleChange}/>
                                    <span >Bad</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1' style={{width:"50%"}}>
                            <label className='whitespace-nowrap font-semibold'>
                               Was our restaurant clean?
                            </label>
                            <div className='flex gap-3'>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='clean-excellent' className='w-5' checked={formData.clean.includes("excellent")} 
                                        onChange={handleChange}/>
                                    <span >Excellent</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='clean-good' className='w-5' checked={formData.clean.includes("good")} 
                                        onChange={handleChange}/>
                                    <span >Good</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='clean-fair' className='w-5' checked={formData.clean.includes("fair")} 
                                        onChange={handleChange}/>
                                    <span >Fair</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='clean-bad' className='w-5' checked={formData.clean.includes("bad")} 
                                        onChange={handleChange}/>
                                    <span >Bad</span>
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div className='flex flex-col gap-3'>                    
                        <div className='flex flex-col gap-1' style={{width:"50%"}}>
                            <label className='whitespace-nowrap font-semibold'>
                                Please rate the quality of the beverages.
                            </label>
                            <div className='flex gap-3'>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='beverages-excellent' className='w-5' checked={formData.beverages.includes("excellent")} 
                                        onChange={handleChange}/>
                                    <span >Excellent</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='beverages-good' className='w-5' checked={formData.beverages.includes("good")} 
                                        onChange={handleChange}/>
                                    <span >Good</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='beverages-fair' className='w-5' checked={formData.beverages.includes("fair")} 
                                        onChange={handleChange}/>
                                    <span >Fair</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='beverages-bad' className='w-5' checked={formData.beverages.includes("bad")} 
                                        onChange={handleChange}/>
                                    <span >Bad</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1' style={{width:"50%"}}>
                            <label className='whitespace-nowrap font-semibold'>
                                Please rate your overall dining experience.
                            </label>
                            <div className='flex gap-3'>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='dining-excellent' className='w-5' checked={formData.dining.includes("excellent")} 
                                        onChange={handleChange}/>
                                    <span >Excellent</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='dining-good' className='w-5' checked={formData.dining.includes("good")} 
                                        onChange={handleChange}/>
                                    <span >Good</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='dining-fair' className='w-5' checked={formData.dining.includes("fair")} 
                                        onChange={handleChange}/>
                                    <span >Fair</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type='checkbox' id='dining-bad' className='w-5' checked={formData.dining.includes("bad")} 
                                        onChange={handleChange}/>
                                    <span >Bad</span>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>                    
                
                
            </form>
        </div>
    </div>
  )
}

export default UserDetail