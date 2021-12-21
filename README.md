# Toy Simulator App

## Description:
The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
There are no other obstructions on the table surface.
The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

The origin (0,0) is considered to be the SOUTH WEST most corner.

## User Actions:
* PLACE action will place the toy on the Grid in position (X,Y) and facing NORTH, SOUTH, EAST or WEST.
* MOVE action will move the toy robot one unit forward in the direction it is currently facing.
* LEFT and RIGHT actions will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
* REPORT will display the X,Y position of the robot and the direction it is currently facing.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Tech Stack
This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
  
* UI: React (Hooks)
* Type Checking: Typescript
* Styling: CSS modules
* Unit tests: Jest, React testing library
* Build: Webpack

