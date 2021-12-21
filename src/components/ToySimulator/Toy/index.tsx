import classNames from 'classnames';

import { DIRECTIONS } from '../utils';
import styles from './styles.module.css';

const ToyDirectionClassMap: Record<string, string> = {
  [DIRECTIONS.NORTH]: "facingNorth",
  [DIRECTIONS.SOUTH]: "facingSouth",
  [DIRECTIONS.EAST]: "facingEast",
  [DIRECTIONS.WEST]: "facingWest",
}
const Toy = (props: {
  toyFacingDirection: string
}) => {
  const { toyFacingDirection: direction } = props;
  const directionClass = ToyDirectionClassMap[direction] ?? "";
  const contentClassName = classNames(styles.toyContent, styles[directionClass]);

  return (
    <div className={contentClassName}></div>
  );
}

export default Toy;
