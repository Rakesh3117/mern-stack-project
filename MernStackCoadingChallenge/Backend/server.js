const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');


const uri = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
app.use(cors());

app.get('/',(req,res)=>{
    const fetchUsers = async () => {
        try {
            const response = await axios.get(uri);
            //console.log(response.data);
            transactions = response.data
            res.send(response.data)
            return (response)
        } catch (error) {
            console.error('There was an error fetching the users:', error);
        }
    };

    fetchUsers();

})

app.get('/statistics', (req, res) => {

    const fetchUsers = async () => {
        try {
            const response = await axios.get(uri);
            const transactions=response.data
            return (response)
        } catch (error) {
            console.error('There was an error fetching the users:', error);
        }
    };

    fetchUsers();

    const month = req.query.month; 
    console.log("Selected Month = ",month)
    console.log(transactions)
    const monthRegex = new RegExp(`^${month}`); 

    const filteredTransactions = transactions.filter(transaction => {
        const date = new Date(transaction.dateOfSale);
        console.log(date)
        const transactionMonth = String(date.getMonth() + 1).padStart(2, '0'); 
        return transactionMonth == month; 
    });

    const totalSales = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSold = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalNotSold = filteredTransactions.filter(transaction => !transaction.sold).length;

    res.json({
        totalSales,
        totalSold,
        totalNotSold,
    });
});

app.get('/statistics/bar', (req, res) => {

    const fetchUsers = async () => {
        try {
            const response = await axios.get(uri);
            const transactions=response.data
            return (response)
        } catch (error) {
            console.error('There was an error fetching the users:', error);
        }
    };

    fetchUsers();

    const month = req.query.month; 
    console.log("Selected Month = ",month)
    console.log(transactions)
    const monthRegex = new RegExp(`^${month}`); 

    const filteredTransactions = transactions.filter(transaction => {
        const date = new Date(transaction.dateOfSale);
        console.log(date)
        const transactionMonth = String(date.getMonth() + 1).padStart(2, '0'); 
        return transactionMonth == month; 
    });

    const totalSales = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSold = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalNotSold = filteredTransactions.filter(transaction => !transaction.sold).length;

    res.json({
        totalSales,
        totalSold,
        totalNotSold,
    });
});

app.get('/var-chart', (req, res) => {
  res.json({ message: 'This works!' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
