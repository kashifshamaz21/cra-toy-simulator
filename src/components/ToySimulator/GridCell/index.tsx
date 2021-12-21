import styles from './styles.module.css';
import Toy from '../Toy';

type GridCellProps = {
  containsToy: boolean,
  position: string,
  toyDirection: string,
}
const GridCell = (props: GridCellProps) => {
  const { containsToy, position, toyDirection } = props;
  return (
    <div className={styles.cellContainer}>
      {containsToy && <Toy toyFacingDirection={toyDirection} />}
      <div className={styles.cellPosition}>{position}</div>
    </div>
  );
}

export default GridCell;