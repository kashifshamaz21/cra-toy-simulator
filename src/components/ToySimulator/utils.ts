export enum DIRECTIONS {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
};

export enum ROTATE {
  LEFT = "left",
  RIGHT = "right",
};

/**
 * 
 * @param direction - current direction of the Toy
 * @param rotationType - Rotate Left / Rotate Right
 * @returns new Direction the Toy should face.
 */
export const getToyDirection = (
  direction: string,
  rotationType: ROTATE
) => {
  let newDirection = direction;

  switch(direction) {
    case DIRECTIONS.EAST:
      newDirection = rotationType === ROTATE.LEFT ? DIRECTIONS.NORTH : DIRECTIONS.SOUTH;
    break;
    case DIRECTIONS.WEST:
      newDirection = rotationType === ROTATE.LEFT ? DIRECTIONS.SOUTH : DIRECTIONS.NORTH;
    break;
    case DIRECTIONS.NORTH:
      newDirection = rotationType === ROTATE.LEFT ? DIRECTIONS.WEST : DIRECTIONS.EAST;
    break;
    case DIRECTIONS.SOUTH:
      newDirection = rotationType === ROTATE.LEFT ? DIRECTIONS.EAST : DIRECTIONS.WEST;
    break;
  }
  return newDirection;
}

export const calculateNextPosition = (
  currentX: number,
  currentY: number,
  maxRows: number,
  maxCols: number,
  currentDirection: string,
) => {
  let newX = currentX, newY = currentY;
  switch(currentDirection) {
    case DIRECTIONS.EAST:
      newX += 1;
    break;
    case DIRECTIONS.WEST:
      newX -= 1;
    break;
    case DIRECTIONS.NORTH:
      newY += 1;
    break;
    case DIRECTIONS.SOUTH:
      newY -= 1;
    break; 
  }

  if (newX >= 0 && newX < maxRows && newY >= 0 && newY < maxCols ) {
    return { xPos: newX, yPos: newY };
  } else {
    return { xPos: currentX, yPos: currentY };
  }
}

/**
 * 
 * @param xPos Current X-Position of Toy
 * @param yPos Current Y-Position of Toy
 * @param toyDirection Current Direction the Toy is facing
 * @returns formatted message to display info about Toy's coordinates.
 */
export const getToyLocationMessage = (
  xPos: null | number,
  yPos: null | number,
  toyDirection: string,
) => {
  let message = '';
  if(xPos != null && yPos != null) {
    message = `Toy is currently at (${xPos}, ${yPos}), facing ${toyDirection}`;
  } else {
    message = `Toy is not placed on the Board yet!!`;
  }

  return message;
}