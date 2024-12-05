import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const App = () => {
    const [otp, setOtp] = useState('');
    const [amount, setAmount] = useState('');
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        socket.on('new-participation', (data) => {
            setParticipants((prev) => [...prev, data]);
        });
    }, []);

    const generateOtp = async () => {
        const response = await axios.post('http://localhost:3001/generate-otp');
        setOtp(response.data.otp);
        setAmount(response.data.amount);
    };

    return (
        <div>
            <h1>Sistema de Sorteos con USDT</h1>
            <button onClick={generateOtp}>Generar OTP</button>
            {otp && (
                <div>
                    <p>OTP: {otp}</p>
                    <p>Monto a transferir: {amount} USDT</p>
                </div>
            )}
            <h2>Participaciones</h2>
            <ul>
                {participants.map((p, index) => (
                    <li key={index}>
                        {p.address} - {p.amount} USDT
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

