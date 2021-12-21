import { useState } from 'react';
import styles from './styles.module.css';

import { DIRECTIONS } from '../utils';

/**
 * @returns CTA controls to trigger Toy movements
 */
const ToyControls = (props: {
  onMoveToy: () => void,
  onReport: () => void,
  onRotateLeft: () => void,
  onRotateRight: () => void,
  onUpdatePosition: (x: number, y: number, d: string) => void,
  minPos: number,
  maxPos: number,
  toyDirection: string,
  xPos: number | null,
  yPos: number | null,
}) => {
  const {
    onMoveToy,
    onReport,
    onRotateLeft,
    onRotateRight,
    onUpdatePosition, 
    toyDirection, 
    minPos, 
    maxPos, 
    xPos, 
    yPos 
  } = props;
  const xPosValue = xPos ?? 0;
  const yPosValue = yPos ?? 0;

  const [xPosLocal, setXPosLocal] = useState(xPosValue);
  const [yPosLocal, setYPosLocal] = useState(yPosValue);
  const [directionLocal, setDirectionLocal] = useState<string>(toyDirection);

  const onPlaceToy = () => {
    if(xPosLocal <= maxPos && yPosLocal <= maxPos) {
      onUpdatePosition(xPosLocal, yPosLocal, directionLocal);
    }
  }
  
  return (
    <div className={styles.gameControlsContainer}>
      <fieldset>
      <legend>Toy Controls</legend>
      <div className={styles.placeToy}>
        <div className={styles.positionContainer}>
          <div className={styles.position}>
            <label className={styles.label} htmlFor="xPos">X:</label>
            <input 
              className={styles.positionInput}
              data-testid={'input-x-pos'}
              onChange={e => setXPosLocal(Number(e.target.value))}
              min={minPos}
              max={maxPos}
              name="xPos"
              type="number" 
              value={xPosLocal} 
            />
          </div>
          <div className={styles.position}>
            <label className={styles.label} htmlFor="yPos">Y:</label>
            <input 
              className={styles.positionInput}
              data-testid={'input-y-pos'}
              onChange={e => setYPosLocal(Number(e.target.value))}
              min={minPos}
              max={maxPos}
              name="yPos" 
              type="number" 
              value={yPosLocal} 
            />
          </div>
        </div>
        <div>
          <label className={styles.label} htmlFor="toyDirection">Face:</label>
          <select 
            onChange={e => setDirectionLocal(e.target.value)}
            id="toyDirection" 
            name="toyDirection" 
            defaultValue={toyDirection}
          >
            {Object.values(DIRECTIONS).map((direction) => {
              return <option key={direction} value={direction}>{direction}</option>
            })}
          </select>
        </div>
        <button 
          className={styles.ctaButton} 
          onClick={onPlaceToy}
          title="Place Toy at X,Y,F"
        >Place
        </button>
      </div>
      <div className={styles.moveToyControls}>
        <button 
          className={styles.ctaButton} 
          onClick={onMoveToy}
          title="Move forward"
        >Move Toy
        </button>
        <button 
          className={styles.ctaButton} 
          onClick={onRotateLeft}
          title="Rotate Left by 90"
        >Rotate Left
        </button>
        <button 
          className={styles.ctaButton} 
          onClick={onRotateRight}
          title="Rotate Right by 90"
        >Rotate Right
        </button>
      </div>
      <button 
        className={styles.reportButton}
        onClick={onReport}
      >Report</button>
      </fieldset>
    </div>
  );
}

export default ToyControls;