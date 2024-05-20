import React, { useState } from 'react';
import { FaAsterisk, FaCheck } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const UserDetail = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        host: "",
        clean: "",
        beverages: "",
        dining: ""
    });

    const [showModal, setShowModal] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const category = e.target.id.split("-")[0];
        const rating = e.target.id.split("-")[1];
        if (e.target.id === 'name' || e.target.id === "email" ) {
            setFormData({ ...formData, [e.target.id]: e.target.value });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [category]: prevState[category].includes(rating)
                    ? prevState[category].filter(item => item !== rating)
                    : rating
            }));
        }
    };


    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        
        if (!formData.name) {
        errors.name = "Name is required.";
        }
        
        if (!formData.email) {
        errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid.";
        }
        
        if (!formData.number) {
            errors.number = "Phone number is required.";
        } else if (!/^\d{12}$/.test(formData.number.replace(/\D/g, ''))) {
            errors.phone = "Phone number is invalid. It should be 10 digits.";
            
        }       
        
        if (formData.host.length === 0) {
            errors.host = "At least one rating is required for the host.";
        }

        if (formData.clean.length === 0) {
            errors.clean = "At least one rating is required for cleanliness.";
        }

        if (formData.beverages.length === 0) {
            errors.beverages = "At least one rating is required for beverages.";
        }

        if (formData.dining.length === 0) {
            errors.dining = "At least one rating is required for dining.";
        }
        
        setErrors(errors);
        
        return Object.keys(errors).length === 0;
    };

    console.log(formData.number);
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validate()) {
            // Retrieve existing submissions from local storage
            const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            
            // Append current form data to the list
            const updatedSubmissions = [...existingSubmissions, formData];
            
            // Store the updated list back in local storage
            localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
    
            console.log('Form submitted successfully:', formData);
            
            // Reset form data after submission
            setFormData({
                name: "",
                email: "",
                number: "",
                host: "",
                clean: "",
                beverages:"",
                dining:""
            });
            setShowModal(true)
        }
    };
    

    return (
        <div>
            <motion.div className='mx-auto my-5 max-w-5xl border-2 rounded-lg p-3' initial={{opacity:0}} whileInView={{opacity:1}}
                transition={{duration:1,ease:"easeInOut"}}>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex md:flex-row flex-col gap-3 '>
                        <div className='flex flex-col gap-3 md:w-[50%]'>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-wrap font-semibold flex items-center gap-2'>
                                        Customer Name <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                <input type='text' id='name' value={formData.name} onChange={handleChange} placeholder='Name'
                                    className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`} />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-wrap font-semibold flex items-center gap-2'>
                                    Contact Number <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                <PhoneInput id="number"
                                    country={'in'}
                                    value={formData.number}
                                    onChange={(value) => setFormData({ ...formData, number: value })}
                                />
                                
                                
                                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 md:w-[50%]'>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-wrap font-semibold flex items-center gap-2'>
                                    Email <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                <input type='email' id='email' value={formData.email} onChange={handleChange}
                                    placeholder='Email' className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`} />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col gap-3'>
                        <div className='flex flex-col gap-3' style={{ width: "50%" }}>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-wrap font-semibold flex items-center gap-2'>
                                    Please rate the quality of the service received from the host
                                    <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                
                                <div className='flex gap-3'>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='host-excellent' className='w-5' checked={formData.host.includes("excellent")}
                                            onChange={handleChange} />
                                        <span>Excellent</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='host-good' className='w-5' checked={formData.host.includes("good")}
                                            onChange={handleChange} />
                                        <span>Good</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='host-fair' className='w-5' checked={formData.host.includes("fair")}
                                            onChange={handleChange} />
                                        <span>Fair</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='host-bad' className='w-5' checked={formData.host.includes("bad")}
                                            onChange={handleChange} />
                                        <span>Bad</span>
                                    </div>
                                </div>
                            </div>
                            {errors.host && <p className="text-red-500 text-sm mt-1">{errors.host}</p>}
                            <div className='flex flex-col gap-1' style={{ width: "50%" }}>
                                <label className='whitespace-nowrap font-semibold flex items-center gap-2'>
                                    Was our restaurant clean? <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                <div className='flex gap-3'>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='clean-excellent' className='w-5' checked={formData.clean.includes("excellent")}
                                            onChange={handleChange} />
                                        <span>Excellent</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='clean-good' className='w-5' checked={formData.clean.includes("good")}
                                            onChange={handleChange} />
                                        <span>Good</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='clean-fair' className='w-5' checked={formData.clean.includes("fair")}
                                            onChange={handleChange} />
                                        <span>Fair</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='clean-bad' className='w-5' checked={formData.clean.includes("bad")}
                                            onChange={handleChange} />
                                        <span>Bad</span>
                                    </div>
                                </div>
                            </div>
                            {errors.clean && <p className="text-red-500 text-sm mt-1">{errors.clean}</p>}
                        </div>
                        

                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1' style={{ width: "50%" }}>
                                <label className='whitespace-nowrap font-semibold flex items-center gap-2'>
                                    Please rate the quality of the beverages. 
                                    <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                <div className='flex gap-3'>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='beverages-excellent' className='w-5' checked={formData.beverages.includes("excellent")}
                                            onChange={handleChange} />
                                        <span>Excellent</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='beverages-good' className='w-5' checked={formData.beverages.includes("good")}
                                            onChange={handleChange} />
                                        <span>Good</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='beverages-fair' className='w-5' checked={formData.beverages.includes("fair")}
                                            onChange={handleChange} />
                                        <span>Fair</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='beverages-bad' className='w-5' checked={formData.beverages.includes("bad")}
                                            onChange={handleChange} />
                                        <span>Bad</span>
                                    </div> 
                                </div>
                            </div>
                            {errors.beverages && <p className="text-red-500 text-sm mt-1">{errors.beverages}</p>}

                            <div className='flex flex-col gap-1' style={{ width: "50%" }}>
                                <label className='whitespace-nowrap font-semibold flex items-center gap-2'>
                                    Please rate your overall dining experience. 
                                    <span ><FaAsterisk className='text-red-700 text-xs'/></span>
                                </label>
                                <div className='flex gap-3'>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='dining-excellent' className='w-5' checked={formData.dining.includes("excellent")}
                                            onChange={handleChange} />
                                        <span>Excellent</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='dining-good' className='w-5' checked={formData.dining.includes("good")}
                                            onChange={handleChange} />
                                        <span>Good</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='dining-fair' className='w-5' checked={formData.dining.includes("fair")}
                                            onChange={handleChange} />
                                        <span>Fair</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type='checkbox' id='dining-bad' className='w-5' checked={formData.dining.includes("bad")}
                                            onChange={handleChange} />
                                        <span>Bad</span>
                                    </div>
                                </div>
                            </div>
                            {errors.dining && <p className="text-red-500 text-sm mt-1">{errors.dining}</p>}
                        </div>
                    </div>
                    <button type='submit' className='p-3 mt-3 ml-auto flex bg-green-700 rounded-lg text-white uppercase'>Submit</button>
                </form>
            </motion.div>
             {/* Modal */}
             {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col gap-3 items-center justify-center">
                                <div className='bg-green-700 p-4 h-12 w-12 rounded-full shadow-md'>
                                    <FaCheck className=' text-white' />
                                </div>
                                <h2 className="text-lg font-medium leading-6 text-gray-900">Thank you for providing the feedback</h2>
                                <p className="mt-2 text-sm text-gray-500">We will work toward improving your experience.</p>
                                
                                <button onClick={() => {
                                    setShowModal(false)
                                    navigate("/table")
                                    }} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-700 text-base font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Close
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetail;
