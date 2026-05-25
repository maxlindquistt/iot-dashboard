import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SensorChart({ data }) {
    return (
        <div className="w-full h-72">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="timestamp" tickFormatter={t => `${t}s`} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#1D9E75" name="Temp (°C)" dot={false} />
                    <Line type="monotone" dataKey="humidity" stroke="#378ADD" name="Humidity (%)" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}