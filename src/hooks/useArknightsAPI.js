import { useEffect, useMemo, useState } from "react"
import { penguinClient, rhodosClient } from "../api/ApiClient";
import axios from "axios";

const useOperatorData = ( operatorName ) => {
    
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        if(!operatorName) return;
        
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.rhodesapi.com/api/operator/${ operatorName }`);
                setData(response.data);
            } catch (e) {
                setError(e);
                console.log("rhodosAPI error: ", e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [operatorName]);

    return { data, loading, error };
}

const useDropMatrix = () => {
    
    const [matrix, setMatrix] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await penguinClient.get('/result/matrix?server=KR');
                setMatrix(response.data.matrix || []);
            } catch (e) {
                setError(e);
                console.log("penguinAPI error: ", e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, []);

    return { matrix, loading, error };
}

const useAllOperators = () => {

    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllOperators = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://api.rhodesapi.com/api/operator");
                setOperators(response.data || []);
            } catch (e) {
                setError(e);
                console.log('RhodosAPI All Operators Error: ', e);
            } finally {
                setLoading(false);
            }
        }

        fetchAllOperators();
    }, []);

    const groupedByOperators = useMemo(() => {
        
        if(operators.length === 0) return {};

        const groupedByClass = operators.reduce((acc, op) => {
            
            const opClass = op.class;

            if(!acc[opClass]) {
                acc[opClass] = [];
            }
            
            acc[opClass].push({
                name: op.name,
                id: op.id,
                icon: op.art.find(a => a.name === 'Icon')?.link,
                rarity: op.rarity,
            });

            return acc;
        }, {});

        for(const className in groupedByClass) {
            groupedByClass[className].sort((a, b) => b.rarity - a.rarity);
        }

        return groupedByClass;
    }, [operators]);

    return { groupedByOperators, loading, error };
}

export { useOperatorData, useDropMatrix, useAllOperators };