import React, { useState } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState(null);
  const [txid, setTxid] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState([]);


  // Iniciar loteria
  const startLottery = async () => {
    try {
      const response = await axios.post(
        "http://localhost:50000/start-lottery",
        { user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(`Loteria iniciada: ${response.data}`);
    } catch (error) {
      console.error("Error iniciando loteria:", error);
      setMessage("Error iniciando loteria");
    }
  };
  const endLottery = async () => {
    try {
      const response = await axios.post(
        "http://localhost:50000/end-lottery",
        { user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(`Loteria terminada: ${response.data}`);
    } catch (error) {
      console.error("Error terminando loteria loteria:", error);
      setMessage("Error terminando loteria");
    }
  };
  const getEntranceFee = async () => {
    try {
      const response = await axios.post(
        "http://localhost:50000/get-entrance-fee",
        { user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(`Fee: ${response.data}`);
    } catch (error) {
      console.error("Error obteniendo fee:", error);
      setMessage("Error obteniendo fee");
    }
  };


  // Generate OTP
  const generateOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:50000/generate-otp",
        { user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOtp(response.data.otp);
      setMessage(`OTP Generated: ${response.data.otp}`);
    } catch (error) {
      console.error("Error generating OTP:", error);
      setMessage("Failed to generate OTP");
    }
  };

  // Register Participant
  const registerParticipant = async () => {
    try {
      const response = await axios.post(
        "http://localhost:50000/register-participant",
        { user_id: userId, otp, txid, amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering participant:", error);
      setMessage("Failed to register participant");
    }
  };

  // Fetch Participants
  const fetchParticipants = async () => {
    try {
      const response = await axios.get("http://localhost:50000/get-participants");
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
      setMessage("Failed to fetch participants");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Lottery System</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Iniciar loteria:
        </label>
        <button onClick={startLottery}>Iniciar Loteria</button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Terminar loteria:
        </label>
        <button onClick={endLottery}>Terminar Loteria</button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Obtener fee de transaccion:
        </label>
        <button onClick={getEntranceFee}>Obtener Fee</button>
      </div>




      <div style={{ marginBottom: "20px" }}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <button onClick={generateOtp}>Generate OTP</button>
      </div>

      {otp && <p>Your OTP: {otp}</p>}

      <div style={{ marginBottom: "20px" }}>
        <label>
          TXID:
          <input
            type="text"
            value={txid}
            onChange={(e) => setTxid(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button onClick={registerParticipant}>Register Participant</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={fetchParticipants}>Fetch Participants</button>
        {participants.length > 0 && (
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>
                {participant.user_id} - {participant.txid} - {participant.amount}
              </li>
            ))}
          </ul>
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

