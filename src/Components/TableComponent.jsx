import { useEffect, useState } from "react";

const TableComponent = () => {
    const [userData, setUserData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formSubmissions'));
        if (storedData) {
            setUserData(storedData);
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

    return (
        <div>
            <div className='mx-auto my-5 max-w-5xl border-2 rounded-lg p-3 relative'>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Select</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Number</th>
                            <th className="border px-4 py-2">Quality of Host Service</th>
                            <th className="border px-4 py-2">Cleanliness</th>
                            <th className="border px-4 py-2">Quality of Beverages</th>
                            <th className="border px-4 py-2">Overall Dining Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((data, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    <input type="checkbox" onChange={(e) => handleCheckboxChange(e, index)} checked={selectedRows.includes(index)} />
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
                <div>
                    {selectedRows.length > 0 && (
                        <button onClick={handleDeleteRows} className='p-3 mt-3 ml-auto flex bg-red-700 rounded-lg text-white uppercase'>Delete Selected</button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default TableComponent;
