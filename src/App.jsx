import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import SensorChart from './SensorChart';
import LedControl from './LedControl';

const BASE = 'https://iot-backend-production-b5f0.up.railway.app';
const API = `${BASE}/api`;

export default function App() {
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        axios.get(`${API}/history`).then(res => setAllData(res.data.reverse()));
    }, []);

    useEffect(() => {
        const socket = io(BASE);
        socket.on('sensor_data', reading => {
            setAllData(prev => [...prev, reading]);
        });
        return () => socket.disconnect();
    }, []);

    const latest = allData[allData.length - 1];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-semibold text-gray-900 mb-8">IoT Dashboard</h1>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <p className="text-sm text-gray-500 mb-1">Temperature</p>
                        <p className="text-4xl font-semibold text-gray-900">
                            {latest ? `${latest.value}°C` : '—'}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <p className="text-sm text-gray-500 mb-1">Humidity</p>
                        <p className="text-4xl font-semibold text-gray-900">
                            {latest ? `${latest.humidity}%` : '—'}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Sensor history</h2>
                    <SensorChart data={allData} />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">LED control</h2>
                    <LedControl />
                </div>

            </div>
        </div>
    );
}