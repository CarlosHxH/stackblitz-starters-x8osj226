"use client"
import { useEffect, useState } from 'react';

interface Coordenadas {
    latitude: number;
    longitude: number;
}

const MeuComponente: React.FC = () => {
    const [localizacao, setLocalizacao] = useState<Coordenadas | null>(null);
    const [distancia, setDistancia] = useState<number | null>(null);
    const pontoDeInteresse: Coordenadas = {latitude: -15.6694558, longitude: -56.1641471};

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    setLocalizacao({ latitude, longitude });
                    calcularDistancia(latitude, longitude);
                },
                () => {
                    alert('Não foi possível obter a localização.');
                }
            );
        } else {
            alert('Geolocalização não é suportada pelo seu navegador.');
        }
    }, []);

    const calcularDistancia = (lat1: number, lon1: number) => {
        const R = 6371; // Raio da Terra em km
        const dLat = (pontoDeInteresse.latitude - lat1) * (Math.PI / 180);
        const dLon = (pontoDeInteresse.longitude - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(pontoDeInteresse.latitude * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanciaEmKm = R * c;
        setDistancia(distanciaEmKm);
    };

    return distancia?.toFixed(0)
};

export default MeuComponente;