import styles from './styles.module.css';
import GridCell from '../GridCell';

/**
 * 
 * @returns Grid containing rows filled with GridCells based on grid size (NxN).
 */
type GridProps = {
  numRows: number,
  numColumns: number,
  toyDirection: string,
  xPos: number | null,
  yPos: number | null,
}

const ToyGrid = (props: GridProps) => {
  const { numColumns, numRows, toyDirection, xPos, yPos } = props;
  const gridMatrixRows = [];

  for (let row = numRows - 1; row >= 0; row--) {
    gridMatrixRows.push(
    <ToyGridRow 
      key={row}
      rowIndex={row} 
      totalColumns={numColumns} 
      toyDirection={toyDirection}
      xPos={xPos}
      yPos={yPos}
    />
    );
  }
  return (
    <div className={styles.gridBoard}>{gridMatrixRows}</div>
  );
}

/**
 * 
 * @returns a GridRow filled with GridCells based on totalColumns.
 */
const ToyGridRow = (props: {
  rowIndex: number,
  totalColumns: number,
  toyDirection: string,
  xPos: number | null,
  yPos: number | null,
}) => {
  const { rowIndex, totalColumns, toyDirection, xPos, yPos } = props;
  const currentToyPosition = `${xPos ?? ""}${yPos ?? ""}`;
  const rowCells = [];

  for(let col = 0; col < totalColumns; col++) {
    const cellPosition = `${col}${rowIndex}`;
    const containsToy = currentToyPosition === cellPosition;

    rowCells.push(
      <GridCell 
        position={`${col},${rowIndex}`}
        containsToy={containsToy}
        key={cellPosition}
        toyDirection={toyDirection}
      />
    );
  }

  return <div className={styles.gridRowContainer}>{rowCells}</div>;
}

export default ToyGrid;