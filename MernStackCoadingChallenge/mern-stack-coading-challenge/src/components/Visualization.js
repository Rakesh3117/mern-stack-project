// src/components/TransactionBarChart.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Visualization = ({ selectedMonth }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/statistics/bar/?month=${selectedMonth}`);
                const transactions = response.data;

                // Create price ranges and count items in each range
                const ranges = [
                    { range: '0-50', count: 0 },
                    { range: '51-100', count: 0 },
                    { range: '101-200', count: 0 },
                    { range: '201-300', count: 0 },
                    { range: '301-400', count: 0 },
                ];

                transactions.forEach(transaction => {
                    const price = transaction.price;

                    if (price <= 50) ranges[0].count++;
                    else if (price <= 100) ranges[1].count++;
                    else if (price <= 200) ranges[2].count++;
                    else if (price <= 300) ranges[3].count++;
                    else if (price <= 400) ranges[4].count++;
                });

                setData(ranges);
            } catch (error) {
                console.error('Error fetching transaction statistics:', error);
            }
        };

        fetchData();
    }, [selectedMonth]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Visualization;
