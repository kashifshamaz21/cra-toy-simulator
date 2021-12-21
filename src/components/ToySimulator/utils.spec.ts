import exp from 'constants';
import {
  calculateNextPosition,
  DIRECTIONS,
  ROTATE,
  getToyDirection,
} from './utils'

describe("Utils: ", () => {

  describe("calculateNextPosition: ", () => {
    const mockMaxRows = 5;
    const mockMaxCols = 5;

    it("should calculate next position for give (x,y) facing various directions", () => {
      const mockXPos = 2;
      const mockYPos = 2;
      const { xPos: xPosEast, yPos: yPosEast } = calculateNextPosition(
        mockXPos, 
        mockYPos, 
        mockMaxRows, 
        mockMaxCols, 
        DIRECTIONS.EAST
      );
      expect([xPosEast, yPosEast]).toEqual([mockXPos + 1, mockYPos]);

      const { xPos: xPosWest, yPos: yPosWest } = calculateNextPosition(
        mockXPos, 
        mockYPos, 
        mockMaxRows, 
        mockMaxCols, 
        DIRECTIONS.WEST
      );
      expect([xPosWest, yPosWest]).toEqual([mockXPos - 1, mockYPos]);
    });

    it("should return current position, when current position is on edge of grid", () => {
      // Place toy on left edge of Grid and facing West.
      let mockXPos = 0;
      let mockYPos = mockMaxCols - 1;
      const { xPos: xPosWest, yPos: yPosWest } = calculateNextPosition(
        mockXPos, 
        mockYPos, 
        mockMaxRows, 
        mockMaxCols, 
        DIRECTIONS.WEST
      );
      expect([xPosWest, yPosWest]).toEqual([mockXPos, mockYPos]);

      // Place toy on left edge of Grid and facing North.
      const { xPos: xPosNorth, yPos: yPosNorth } = calculateNextPosition(
        mockXPos, 
        mockYPos, 
        mockMaxRows, 
        mockMaxCols, 
        DIRECTIONS.NORTH
      );
      expect([xPosNorth, yPosNorth]).toEqual([mockXPos, mockYPos]);

      // Place toy on right edge of Grid and facing East.
      mockXPos = mockMaxRows - 1, mockYPos = 0;
      const { xPos: xPosEast, yPos: yPosEast } = calculateNextPosition(
        mockXPos, 
        mockYPos, 
        mockMaxRows, 
        mockMaxCols, 
        DIRECTIONS.EAST
      );
      expect([xPosEast, yPosEast]).toEqual([mockXPos, mockYPos]);

      // Place toy on right edge of Grid and facing South.
      mockXPos = mockMaxRows - 1, mockYPos = 0;
      const { xPos: xPosSouth, yPos: yPosSouth } = calculateNextPosition(
        mockXPos, 
        mockYPos, 
        mockMaxRows, 
        mockMaxCols, 
        DIRECTIONS.SOUTH
      );
      expect([xPosSouth, yPosSouth]).toEqual([mockXPos, mockYPos]);
    });
  });

  describe("getToyDirection: ", () => {
    it("should calculate next Toy direction after rotation (left / right)", () => {
      // Toy placed facing East & rotated Left & Right
      let nextLeftDirection = getToyDirection(DIRECTIONS.EAST, ROTATE.LEFT);
      let nextRightDirection = getToyDirection(DIRECTIONS.EAST, ROTATE.RIGHT);
      expect(nextLeftDirection).toBe(DIRECTIONS.NORTH);
      expect(nextRightDirection).toBe(DIRECTIONS.SOUTH);

      // Toy placed facing West & rotated Left & Right
      nextLeftDirection = getToyDirection(DIRECTIONS.WEST, ROTATE.LEFT);
      nextRightDirection = getToyDirection(DIRECTIONS.WEST, ROTATE.RIGHT);
      expect(nextLeftDirection).toBe(DIRECTIONS.SOUTH);
      expect(nextRightDirection).toBe(DIRECTIONS.NORTH);

      // Toy placed facing North & rotated Left & Right
      nextLeftDirection = getToyDirection(DIRECTIONS.NORTH, ROTATE.LEFT);
      nextRightDirection = getToyDirection(DIRECTIONS.NORTH, ROTATE.RIGHT);
      expect(nextLeftDirection).toBe(DIRECTIONS.WEST);
      expect(nextRightDirection).toBe(DIRECTIONS.EAST);

      // Toy placed facing South & rotated Left & Right
      nextLeftDirection = getToyDirection(DIRECTIONS.SOUTH, ROTATE.LEFT);
      nextRightDirection = getToyDirection(DIRECTIONS.SOUTH, ROTATE.RIGHT);
      expect(nextLeftDirection).toBe(DIRECTIONS.EAST);
      expect(nextRightDirection).toBe(DIRECTIONS.WEST);
    });
  })
});