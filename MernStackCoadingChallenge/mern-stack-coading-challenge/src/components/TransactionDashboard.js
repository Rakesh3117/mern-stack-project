import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styling/transactionDashboard.css';
import Visualization from './Visualization';

const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const TransactionDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedDescription, setExpandedDescription] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('03'); // Default month is March
    const [statistics, setStatistics] = useState({ totalSales: 0, totalSold: 0, totalNotSold: 0 });
    const transactionsPerPage = 8;
    const[stats,setStats] =useState(false);
    const[visual,setVisual] = useState(false)

    // Fetch transactions from the API
    const handleAPI = async () => {
        try {
            const response = await axios("http://localhost:5000/");
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleStats = () =>{
        setStats(!stats)
    }
    const handleVisual = () => {
        setVisual(!visual)
    }

    // Fetch statistics based on the selected month
    const fetchStatistics = async (month) => {
        try {
            const response = await axios.get(`http://localhost:5000/statistics?month=${month}`);
            setStatistics(response.data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    useEffect(() => {
        handleAPI();
        fetchStatistics(selectedMonth); // Fetch statistics for the default month
    }, []);

    useEffect(() => {
        fetchStatistics(selectedMonth); // Fetch statistics whenever the month changes
        setCurrentPage(1); // Reset to first page on month change
    }, [selectedMonth]);

    // Filter transactions based on search term and selected month
    const filteredTransactions = transactions.filter((transaction) => {
        const date = new Date(transaction.dateOfSale);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month in "MM" format
        const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = month === selectedMonth;

        return matchesSearch && matchesMonth;
    });

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const lastIndex = currentPage * transactionsPerPage;
    const firstIndex = lastIndex - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(firstIndex, lastIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleDescription = (id) => {
        setExpandedDescription(expandedDescription === id ? null : id);
    };

    return (
        <div className='main-container'>
            <div className='sub-container'>
                <div className='heading'>
                    <div><h1>Transaction Dashboard</h1></div>
                </div>
                <div className='filters-container'>
                    <div className='filters-sub-container'>
                        <p className='filter-name'>Search Transaction</p>
                        <input
                            type="text"
                            placeholder="Search by title or description"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='input-bar'
                        />
                    </div>
                    <div className='filters-sub-container'>
                        <p className='filter-name'>Select Month</p>
                        <select className='input-bar'
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="statistics">
                    <h2>Statistics for {months.find(month => month.value === selectedMonth).label}</h2>
                    <p>Total Sales: ${statistics.totalSales}</p>
                    <p>Total Sold Items: {statistics.totalSold}</p>
                    <p>Total Not Sold Items: {statistics.totalNotSold}</p>
                </div>
                <div>
                   <div>
                    <div>
                        <button onClick={handleVisual}>
                            Visualization   
                        </button>
                        {visual && <Visualization selectedMonth={selectedMonth} />}
                    </div>
                    
                    </div> 
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>SOLD</th>
                                <th>IMAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTransactions.map((each) => (
                                <tr key={each.id}>
                                    <td>{each.id}</td>
                                    <td>{each.title}</td>
                                    <td>
                                        <div className={expandedDescription === each.id ? 'description expanded' : 'description'}>
                                            {each.description}
                                        </div>
                                        {expandedDescription === each.id ? (
                                            <button onClick={() => toggleDescription(each.id)}>Read less</button>
                                        ) : (
                                            <button onClick={() => toggleDescription(each.id)}>Read more</button>
                                        )}
                                    </td>
                                    <td>{each.price}</td>
                                    <td>{each.category}</td>
                                    <td>{each.sold ? "Yes" : "No"}</td>
                                    <td>
                                        <img src={each.image} alt={each.title} width="50" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
                    <span>{currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDashboard;
