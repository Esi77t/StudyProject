import "../css/OperatorSelector.css"

const OperatorSelector = ({ groupedOperators = {}, onSelect, onClose }) => {
    
    const classOrder = ['Vanguard', 'Guard', 'Defender', 'Caster', 'Medic', 'Suppoter', 'Specialist'];
    const sortedClasses = classOrder.filter(cls => Array.isArray(groupedOperators[cls]));

    return(
        <div className="selector-modal-overlay" onClick={ onClose } >
            <div className="selector-modal-content" onClick={ e => e.stopPropagation() }>
                <button className="close-button" onClick={ onClose }>&times;</button>
                <h2>오퍼레이터 선택</h2>
                { sortedClasses.map(className => (
                    <div key={ className } className="class-group"> 
                        <h3 className="class-name">{ className }</h3>
                        <div className="operator-grid">
                            { groupedOperators[className].map(op => (
                                <div key={ op.id } className="operator-card" onClick={() => onSelect(op.name)}>
                                    <div className={ `rarity-badge rarity-${ op.rarity }` }>{ op.rarity }★</div>
                                    <img src={ op.icon } alt={ op.name } onError={(e) => { e.currentTarget.src="https://via.placeholder.com/70"; }} />
                                    <span>{ op.name }</span>
                                </div>
                            )) }
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default OperatorSelector;