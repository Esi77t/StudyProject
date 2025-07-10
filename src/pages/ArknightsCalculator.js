import { useState } from "react";
import { useAllOperators, useDropMatrix, useOperatorData } from "../hooks/useArknightsAPI";
import OperatorSelector from "../components/OperatorSelector";
import "../css/ArknightsCalculator.css"

const ArknightsCalculator = () => {

    const [selectedOperator, setSelectedOperator] = useState('');
    const [targetElite, setTargetElite] = useState(0);
    const [results, setResults] = useState([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    const { data: operatorData, loading: opLoading, error: opError } = useOperatorData(selectedOperator);
    const { matrix, loading: matrixLoading, error: matrixError } = useDropMatrix();
    const { groupedOperators, loading: allOpLoading, error: allOpError } = useAllOperators();

    const handleSelectOperator = (operatorName) => {
        setSelectedOperator(operatorName);
        setIsSelectorOpen(false);
    }

    const handleCalculate = () => {
        
        if(!operatorData || matrix.length === 0) {
            alert('잠시 후에 다시 시도하세요');
            return;
        }

        setIsCalculating(true);
        setResults([]);

        const requiredMaterials = operatorData.elite[targetElite]?.materials || [];

        if(requiredMaterials.length === 0) {
            alert('해당 정예 단계의 재료 정보가 없거나 마지막 단계 입니다.');
            setIsCalculating(false);
            return;
        }

        const finalResults = requiredMaterials.map(material => {
            
            let bestStage = { code: 'N/A', efficiency: 0 };

            const itemDrops = matrix.filter(drop => drop.itemId === material.id && drop.stage.sanity > 0);

            itemDrops.forEach(drop => {
                const efficiency = (drop.quantity / drop.times) / drop.stage.sanity;

                if(efficiency > bestStage.efficiency) {
                    bestStage = { code: drop.stage.code, efficiency };
                }
            });

            return {
                id: material.id,
                name: material.name,
                count: material.count,
                bestStage: bestStage.code,
            };
        });

        setResults(finalResults);
        setIsCalculating(false);
    }

    const isLoading = opLoading || matrixLoading || allOpLoading;
    const hasError = opError || matrixError || allOpError;

    return(
        <>
        { isSelectorOpen && (
            <OperatorSelector
                groupedOperators={ groupedOperators }
                onSelect={ handleSelectOperator }
                onClose={() => setIsCalculating(false)}
            />
        )}
            <div className="ark-calc-container">
                <div className="ark-calc-header">
                    <h2>재료 계산기</h2>
                    <p></p>
                </div>
                <div className="ark-calc-controls">
                    <div className="control-group">
                        <label>오퍼레이터</label>
                        <button className="operator-select-button" onClick={() => setIsSelectorOpen(true)}>
                            { operatorData ? (
                                <>
                                    <img src={ operatorData.art.find(a => a.name === 'Icon')?.link } alt={ operatorData.name } />
                                    { operatorData.name }
                                </>
                            ) : (
                                '선택'
                            )}
                        </button>
                    </div>
                    <div className="control-group">
                        <label htmlFor="elite-select">목표 정예화</label>
                        <select id="elite-select" value={ targetElite } onChange={ e => setTargetElite(e) } >
                            <option value={0}>1차 정예화</option>
                            <option value={1}>2차 정예화</option>
                        </select>
                    </div>
                    <button onClick={ handleCalculate }>
                        { isLoading ? '데이터 불러오는 중' : isCalculating ? '계산 중' : '필요 재료 계산' }
                    </button>
                </div>
                { hasError && <div className="error-message">데이터를 불러오는 중 실패하였습니다</div> }
                { results.length > 0 ? (
                    <div className="results-table">
                        <div className="results-header">
                            <span className="header-item">필요 재료</span>
                            <span className="header-count">수량</span>
                            <span className="header-stage">추천 파밍 작전 구역</span>
                        </div>
                        { results.map(item => (
                            <div key={ item.id } className="results-row">
                                <span className="item-name">{ item.name }</span>
                                <span className="item-count">{ item.count }</span>
                                <span className="item-stage">{ item.bestStage }</span>
                            </div>
                        )) }
                    </div>
                ) : (
                    !isCalculating && <div className="no-result">
                        <p>계산할 오퍼레이터와 목표를 선택하고 버튼을 눌러주세요</p>
                    </div>
                ) }
            </div>
        </>
    )
}

export default ArknightsCalculator;