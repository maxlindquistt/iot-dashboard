import { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api';

export default function LedControl() {
    const [ledOn, setLedOn] = useState(false);

    async function toggle() {
        const newState = !ledOn;
        await axios.post(`${API}/command/led`, { state: newState });
        setLedOn(newState);
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-gray-600">
                LED is <span className="font-semibold text-gray-900">{ledOn ? 'ON' : 'OFF'}</span>
            </span>
            <button
                onClick={toggle}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${ledOn
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                {ledOn ? 'Turn off' : 'Turn on'}
            </button>
            <div className={`w-4 h-4 rounded-full ${ledOn ? 'bg-yellow-400' : 'bg-gray-300'}`} />
        </div>
    );
}