import { render } from '@testing-library/react';
import { DIRECTIONS } from '../utils';

import GridCell from "./index";

jest.mock("../Toy", 
  () => function DummyToy() {
    return <div role="toy" />;
  },
);

describe("GridCell: ", () => {
  it("should render Toy when containsToy prop is true", () => {
    const { getByRole } = render(<GridCell 
      containsToy position="1,1" 
      toyDirection={DIRECTIONS.SOUTH}
    />);

    expect(getByRole('toy')).toBeInTheDocument();
  });

  it("should display the Toy position using passed prop", () => {
    const mockPosition = "3,3";
    const { getByText } = render(<GridCell 
      containsToy={false}
      position={mockPosition} 
      toyDirection={DIRECTIONS.SOUTH}
    />);

    expect(getByText(mockPosition)).toBeInTheDocument();
  });

});