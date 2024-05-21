import { startTransition, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaSyncAlt } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const TableComponent = () => {
    const [userData, setUserData] = useState([]);
    const [totalData, setTotalData] = useState([])
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formSubmissions'));
        if (storedData) {
            setUserData(storedData);
            setTotalData(storedData)
        }
    }, []);

    const handleCheckboxChange = (e, index) => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, index]);
        } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== index));
        }
    };

    const handleDeleteRows = () => {
        const filteredData = userData.filter((_, index) => !selectedRows.includes(index));
        localStorage.setItem('formSubmissions', JSON.stringify(filteredData));
        setUserData(filteredData);
        setSelectedRows([]);
    };

    const handleSearch = (value)=>{
        const filterData = userData.filter((data)=>{
            return Object.values(data).some((val)=> val && val.toString().toLowerCase().includes(value.toLowerCase()));
        });
        setUserData(filterData);
        setSearchValue("")
    }

    const handleReset = ()=>{
        const storedData = JSON.parse(localStorage.getItem('formSubmissions'));
        if (storedData) {
            setUserData(storedData);
        }
    }

    const openModal = (data) => {
        setModalData(data);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setModalData(null);
    }

    return (
        <div>
            <motion.div className='mx-auto my-5 max-w-5xl border-2 rounded-lg p-3 ' initial={{x:-200, opacity:0}} 
                    whileInView={{x:0,opacity:1}}transition={{duration:1.5,ease:"backInOut"}}>

                <div className="flex items-center justify-between flex-wrap m-1">
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-slate-500">Aromatic Bar</h2>
                        <p className="text-slate-400 text-md font-semibold">{userData.length} out of {totalData.length} records</p>
                    </div>
                    <div className="flex items-center gap-2 max-w-lg" >
                        <div className="border-2 border-slate-500 p-1 rounded flex items-center justify-between">
                            <input placeholder="Search" value={searchValue} 
                                onChange={(e)=>setSearchValue(e.target.value)} 
                                className="border-none outline-none bg-white  lg:w-[30%] xs:w-[10%]" />
                            <FaSearch onClick={()=>handleSearch(searchValue)} className="cursor-pointer"/>
                        </div>
                        
                        <div onClick={handleReset} className="bg-slate-100 p-3 rounded text-slate-500 cursor-pointer ">
                            <FaSyncAlt   />
                        </div>
                        <button onClick={()=>startTransition(()=>navigate("/"))} className="p-2 bg-green-600 text-white rounded-lg w-24">
                            Add New
                        </button>
                    </div>
                </div>
                <div className="w-full overflow-auto">
                    <table>
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Select</th>
                                <th className="border px-4 py-2">Details</th>
                                <th className="min-w-48 border px-4 py-2">Customer Name</th>
                                <th className="min-w-48 border px-4 py-2">Customer Email</th>
                                <th className="min-w-48 border px-4 py-2">Customer Number</th>
                                <th className="min-w-80 border px-4 py-2">Please rate the quality of the service received from the host</th>
                                <th className="min-w-80 border px-4 py-2">Was our restaurant clean?</th>
                                <th className="min-w-80 border px-4 py-2">Please rate the quality of the beverages.</th>
                                <th className="min-w-80 border px-4 py-2">Please rate your overall dining experience.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((data, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border px-4 py-2">
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, index)} checked={selectedRows.includes(index)} />
                                    </td>
                                    <td className="border px-4 py-2 "><span onClick={()=>openModal(data)} 
                                    className="text-blue-400 hover:underline cursor-pointer">
                                        Details</span>
                                    </td>
                                    <td className="border px-4 py-2 ">{data.name}</td>
                                    <td className="border px-4 max-w-56 py-2 truncate">{data.email}</td>
                                    <td className="border px-4 py-2">{data.number}</td>
                                    <td className="border px-4 py-2">{data.host}</td>
                                    <td className="border px-4 py-2">{data.clean}</td>
                                    <td className="border px-4 py-2">{data.beverages}</td>
                                    <td className="border px-4 py-2">{data.dining}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div>
                    {selectedRows.length > 0 && (
                        <button onClick={handleDeleteRows} className='p-3 mt-3 ml-auto flex bg-red-700 rounded-lg text-white uppercase'>Delete Selected</button>
                    )}

                </div>

                {modalData && <Modal showModal={showModal} closeModal={closeModal} data={modalData}/>}

            </motion.div>

        </div>
    );
}

export default TableComponent;
