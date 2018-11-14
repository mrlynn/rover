import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  RoverData,
  RoverControl,
  setRoverAngle,
  setRoverSpeedForward,
  setRoverSpeedValue,
  addRoverMove,
} from '../../state';
import { Header, Controls, MovesList } from '..';

interface OwnProps {}

interface StateProps {
  roverData?: RoverData;
  roverControl: RoverControl;
}

interface DispatchProps {
  addMove: () => void;
  setAngle: (angle: number) => void;
  setSpeedForward: (isForward: boolean) => void;
  setSpeedValue: (value: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

// const dummyMoves = [
//   { _id: '1', speed: 1, angle: 45 },
//   { _id: '2', speed: 2, angle: 55 },
//   { _id: '3', speed: 3, angle: 65 },
//   { _id: '4', speed: -1, angle: 75 },
//   { _id: '5', speed: -2, angle: 85 },
//   { _id: '6', speed: -3, angle: 95 },
//   { _id: '7', speed: 2, angle: 105 },
//   { _id: '8', speed: -3, angle: 115 },
//   { _id: '9', speed: -3, angle: 125 },
//   { _id: '10', speed: 1, angle: 135 },
// ];

class Home extends Component<Props> {
  render() {
    const { roverData = { moves: [] }, roverControl, addMove, setAngle, setSpeedForward, setSpeedValue } = this.props;
    return (
      <div className="home">
        <div className="home-dashboard">
          <Header isPathClear={true} temperature={67} luminosity={87} />
          <hr />
          <Controls
            angle={roverControl.angle}
            speedIsForward={roverControl.speed.isForward}
            speedValue={roverControl.speed.value}
            addMove={addMove}
            setAngle={setAngle}
            setSpeedForward={setSpeedForward}
            setSpeedValue={setSpeedValue}
          />
        </div>
        <div className="home-sidepanel">
          <MovesList moves={roverData.moves} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ rover }: AppState) => ({
  roverData: rover.data,
  roverControl: rover.control,
});

interface UnmergedDispatchProps {
  addMove: (angle: number, isForward: boolean, value: number) => void;
  setAngle: (angle: number) => void;
  setSpeedForward: (isForward: boolean) => void;
  setSpeedValue: (value: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): UnmergedDispatchProps => ({
  addMove: (angle: number, isForward: boolean, value: number) =>
    dispatch<any>(addRoverMove.action({ angle, isForward, value })),
  setAngle: (angle: number) => dispatch(setRoverAngle(angle)),
  setSpeedForward: (isForward: boolean) => dispatch(setRoverSpeedForward(isForward)),
  setSpeedValue: (value: number) => dispatch(setRoverSpeedValue(value)),
});

const mergeProps = ({ roverData, roverControl }: StateProps, { addMove, ...dispatchProps }: UnmergedDispatchProps) => ({
  roverData,
  roverControl,
  addMove: () => addMove(roverControl.angle, roverControl.speed.isForward, roverControl.speed.value),
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Home);
