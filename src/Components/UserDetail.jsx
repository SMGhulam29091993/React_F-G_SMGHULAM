import React, { useState } from 'react';

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

    const [validationResults, setValidationResults] = useState({
        name: true,
        email: true,
        number: true
    });

    const handleChange = (e) => {
        const category = e.target.id.split("-")[0];
        const rating = e.target.id.split("-")[1];
        if (e.target.id === 'name' || e.target.id === "email" || e.target.id === "number") {
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

    const validateForm = () => {
        const { name, email, number } = formData;
        const emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
        const phoneRegex = /^\d{10}$/;

        const results = {
            name: !!name,
            email: emailRegex.test(email),
            number: phoneRegex.test(number)
        };

        setValidationResults(results);

        return Object.values(results).every(result => result);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
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
            <div className='mx-auto my-5 max-w-5xl border-2 rounded-lg p-3'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex md:flex-row flex-col gap-3 '>
                        <div className='flex flex-col gap-3 md:w-[50%]'>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-nowrap font-semibold'>Customer Name</label>
                                <input type='text' id='name' value={formData.name} onChange={handleChange} placeholder='Name'
                                    required className={`p-3 border rounded-lg ${!validationResults.name ? 'border-red-500' : ''}`} />
                                {!validationResults.name && <span className="text-red-500">Please enter your name.</span>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-nowrap font-semibold'>Contact Number</label>
                                <input type='text' id='number' value={formData.number} onChange={handleChange} placeholder='Number'
                                    required className={`p-3 border rounded-lg ${!validationResults.number ? 'border-red-500' : ''}`} />
                                {!validationResults.number && <span className="text-red-500">Please enter a valid 10-digit phone number.</span>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 md:w-[50%]'>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-nowrap font-semibold'>Email</label>
                                <input type='email' id='email' value={formData.email} onChange={handleChange}
                                    placeholder='Email' required className={`p-3 border rounded-lg ${!validationResults.email ? 'border-red-500' : ''}`} />
                                {!validationResults.email && <span className="text-red-500">Please enter a valid email address.</span>}
                            </div>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col gap-3'>
                        <div className='flex flex-col gap-3' style={{ width: "50%" }}>
                            <div className='flex flex-col gap-1'>
                                <label className='whitespace-nowrap font-semibold'>
                                    Please rate the quality of the service received from the host
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
                            <div className='flex flex-col gap-1' style={{ width: "50%" }}>
                                <label className='whitespace-nowrap font-semibold'>
                                    Was our restaurant clean?
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
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1' style={{ width: "50%" }}>
                                <label className='whitespace-nowrap font-semibold'>
                                    Please rate the quality of the beverages.
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
                            <div className='flex flex-col gap-1' style={{ width: "50%" }}>
                                <label className='whitespace-nowrap font-semibold'>
                                    Please rate your overall dining experience.
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
                        </div>
                    </div>
                    <button type='submit' className='p-3 mt-3 ml-auto flex bg-blue-700 rounded-lg text-white uppercase'>Submit</button>
                </form>
            </div>
             {/* Modal */}
             {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2 className="text-lg font-medium leading-6 text-gray-900">Thank you for providing the feedback</h2>
                                <p className="mt-2 text-sm text-gray-500">We will work toward improving your experience.</p>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => setShowModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
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
