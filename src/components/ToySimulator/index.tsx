import { useState } from 'react';
import styles from './styles.module.css';

import ToyGrid from './ToyGrid';
import ToyControls from './ToyControls';
import { 
  DIRECTIONS, 
  ROTATE,
  calculateNextPosition,
  getToyDirection,
  getToyLocationMessage,
} from './utils';

const GRID_SIZE = 5; // N x N size grid table on which toy is placed.

const ToySimulator = () => {
  const [toyDirection, setToyDirection] = useState<string>(DIRECTIONS.NORTH);
  const [xPos, setXPos] = useState<number | null>(null);
  const [yPos, setYPos] = useState<number | null>(null);

  const onUpdatePosition = (
    updatedXPos: number, 
    updatedYPos: number, 
    updatedDirection: string
  ) => {
    setXPos(updatedXPos);
    setYPos(updatedYPos);
    setToyDirection(updatedDirection);
  };

  const onMoveToy = () => {
    if(xPos != null && yPos != null) {
      const { xPos: newX, yPos: newY } = calculateNextPosition(xPos, yPos, GRID_SIZE, GRID_SIZE, toyDirection);
      onUpdatePosition(newX, newY, toyDirection);
    }
  };

  const onRotateToy = (rotateTowards: ROTATE) => {
    if(xPos != null && yPos != null) {
      const newToyDirection = getToyDirection(toyDirection, rotateTowards);
      setToyDirection(newToyDirection);
    }
  };

  const onReport = () => {
    const message = getToyLocationMessage(xPos, yPos, toyDirection);
    window.alert(message);
  }

  return (
    <div className={styles.contentWrapper}>
      <h1>Toy Simulator</h1>
      <ToyGrid 
        numColumns={GRID_SIZE}
        numRows={GRID_SIZE}
        toyDirection={toyDirection}
        xPos={xPos}
        yPos={yPos}
      />
      <ToyControls
        onMoveToy={onMoveToy}
        onReport={onReport}
        onRotateLeft={() => onRotateToy(ROTATE.LEFT)}
        onRotateRight={() => onRotateToy(ROTATE.RIGHT)}
        onUpdatePosition={onUpdatePosition}
        minPos={0}
        maxPos={GRID_SIZE - 1}
        toyDirection={toyDirection}
        xPos={xPos}
        yPos={yPos}
      />
    </div>
  );
}

export default ToySimulator;