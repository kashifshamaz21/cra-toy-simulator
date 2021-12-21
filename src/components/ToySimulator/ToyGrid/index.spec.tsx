import { render, screen } from '@testing-library/react'
import { DIRECTIONS } from '../utils';

import ToyGrid from "./index";

jest.mock("../GridCell", 
  () => function DummyGridCell() {
    return <div role="grid-cell" />;
  },
);

describe("ToyGrid: ", () => {
  it("should render (n * m) grid cells based on passed rows & columns count", async () => {
    const mockNumRows = 5;
    const mockNumCols = 5;

    render(<ToyGrid 
      numRows={mockNumRows}
      numColumns={mockNumCols}
      toyDirection={DIRECTIONS.SOUTH}
      xPos={null}
      yPos={null}
    />);

    const gridCells = await screen.findAllByRole('grid-cell');
    expect(gridCells).toHaveLength(mockNumRows * mockNumCols);
  });
});