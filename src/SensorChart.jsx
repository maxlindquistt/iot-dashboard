import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const point = payload[0].payload;
    const time = point.created_at
        ? new Date(point.created_at.replace(' ', 'T') + 'Z').toLocaleTimeString()
        : '';
    return (
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
            {time && <p className="text-gray-500 mb-1">{time}</p>}
            {payload.map(entry => (
                <p key={entry.dataKey} style={{ color: entry.color }}>
                    {entry.name}: {entry.value}
                </p>
            ))}
        </div>
    );
}

export default function SensorChart({ data }) {
    return (
        <div className="w-full h-72">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis hide />
<YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#1D9E75" name="Temp (°C)" dot={false} />
                    <Line type="monotone" dataKey="humidity" stroke="#378ADD" name="Humidity (%)" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}