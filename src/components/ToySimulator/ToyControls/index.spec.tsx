import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';

import ToyControls from "./index";
import { DIRECTIONS } from '../utils';

describe("ToyControls: ", () => {
  const mockOnMoveToy = jest.fn();
  const mockOnReport = jest.fn();
  const mockOnRotateLeft = jest.fn();
  const mockOnRotateRight = jest.fn();
  const mockOnUpdatePosition = jest.fn();

  const minPos = 0;
  const maxPos = 5;

  it("should invoke CTA control callbacks on clicking CTA buttons", () => {
    const mockDirection = DIRECTIONS.EAST;
    const mockXPos = 0;
    const mockYPos = 0;

    const { getByText } = render(
      <ToyControls 
        onMoveToy={mockOnMoveToy}
        onReport={mockOnReport}
        onRotateLeft={mockOnRotateLeft}
        onRotateRight={mockOnRotateRight}
        onUpdatePosition={mockOnUpdatePosition}
        minPos={minPos}
        maxPos={maxPos}
        toyDirection={DIRECTIONS.EAST}
        xPos={mockXPos}
        yPos={mockYPos}
      />
    );
    userEvent.click(getByText('Move Toy'));
    expect(mockOnMoveToy).toBeCalledTimes(1);

    userEvent.click(getByText('Rotate Left'));
    expect(mockOnRotateLeft).toBeCalledTimes(1);

    userEvent.click(getByText('Rotate Right'));
    expect(mockOnRotateRight).toBeCalledTimes(1);

    userEvent.click(getByText('Report'));
    expect(mockOnReport).toBeCalledTimes(1);

    userEvent.click(getByText('Place'));
    expect(mockOnUpdatePosition).toBeCalledTimes(1);
    expect(mockOnUpdatePosition).toHaveBeenCalledWith(mockXPos, mockYPos, mockDirection);
  });

  it("should invoke onUpdatePosition with (X, Y, direction) values selected by user", () => {
    const { getByRole, getByText, getByTestId } = render(
      <ToyControls 
        onMoveToy={mockOnMoveToy}
        onReport={mockOnReport}
        onRotateLeft={mockOnRotateLeft}
        onRotateRight={mockOnRotateRight}
        onUpdatePosition={mockOnUpdatePosition}
        minPos={minPos}
        maxPos={maxPos}
        toyDirection={DIRECTIONS.EAST}
        xPos={null}
        yPos={null}
      />
    );

    const mockXPosInput = 1;
    const mockYPosInput = 1;
    const mockSelectDirection = DIRECTIONS.SOUTH;

    const xPosInputNode = getByTestId('input-x-pos');
    const yPosInputNode = getByTestId('input-y-pos');
    const directionSelectBox = getByRole('combobox');

    // Type x-pos & y-pos values into Text nodes
    userEvent.type(xPosInputNode, `${mockXPosInput}`);
    userEvent.type(yPosInputNode, `${mockYPosInput}`);
    // Select Direction from dropdown
    userEvent.selectOptions(directionSelectBox, mockSelectDirection);

    // trigger click event on 'Place' button
    userEvent.click(getByText('Place'));

    // Verify that callback prop is invoked with above entered values.
    expect(mockOnUpdatePosition).toHaveBeenCalledWith(
      mockXPosInput, 
      mockYPosInput, 
      mockSelectDirection
    );
  });

  it("should not invoke onUpdatePosition if either X or Y position is out of bounds", () => {

    const { getByTestId, getByText } = render(
      <ToyControls 
        onMoveToy={mockOnMoveToy}
        onReport={mockOnReport}
        onRotateLeft={mockOnRotateLeft}
        onRotateRight={mockOnRotateRight}
        onUpdatePosition={mockOnUpdatePosition}
        minPos={minPos}
        maxPos={maxPos}
        toyDirection={DIRECTIONS.EAST}
        xPos={null}
        yPos={null}
      />
    );

    const xPosInputNode = getByTestId('input-x-pos');
    const yPosInputNode = getByTestId('input-y-pos');

    // Type x-pos & y-pos values greater than maxPos prop
    const mockXPosInput = maxPos + 1;
    const mockYPosInput = maxPos + 1;

    userEvent.type(xPosInputNode, `${mockXPosInput}`); // enter xPos greater than maxPos
    userEvent.type(yPosInputNode, `${maxPos}`);

    // trigger click event on 'Place' button
    userEvent.click(getByText('Place'));
    // check that onUpdatePosition was not invoked
    expect(mockOnUpdatePosition).not.toHaveBeenCalled();

    userEvent.type(xPosInputNode, `${maxPos}`);
    userEvent.type(yPosInputNode, `${mockYPosInput}`); // enter yPos greater than maxPos
     
    // trigger click event on 'Place' button
    userEvent.click(getByText('Place'));
    // check that onUpdatePosition was not invoked
    expect(mockOnUpdatePosition).not.toHaveBeenCalled();
  });
});
