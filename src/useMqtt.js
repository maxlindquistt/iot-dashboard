import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const BROKER = 'wss://broker.hivemq.com:8884/mqtt';
const TOPIC_SENSOR = 'lnu/iot/ml227cu/sensor';

export function useMqtt() {
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        const client = mqtt.connect(BROKER);

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe(TOPIC_SENSOR);
        });

        client.on('message', (topic, message) => {
            const data = JSON.parse(message.toString());
            setReadings(prev => [...prev.slice(-49), data]);
        });

        return () => client.end();
    }, []);

    return readings;
}