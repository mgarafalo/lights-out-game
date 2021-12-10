import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
      this.state = {
        board: [],
        hasWon: false
      }
  }

  componentDidMount = () => {
    this.createBoard()
  }

  createBoard = () => {
    let board = [[false, false, false, false ,false],[false, true, false, true ,true],[true, true, false, false, false],[false, false, false, true, false],[true, false, false, false, true]];
    this.setState({board: board})
  }

  checkWin = (board) => {
    let win = board.every(value => value === false)
    this.setState({board: board, hasWon: win})
  }

  flipCellsAround = (coord) => {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if ((x >= 0 && x < ncols) && (y >= 0 && y < nrows)) {
        board[y][x] = !board[y][x];
      }
    }

    function flipNorth(y,x) {
      let newY = y - 1
      flipCell(newY, x)
    }

    function flipSouth(y,x) {
      let newY = y + 1
      flipCell(newY, x)
    }

    function flipRight(y,x) {
      let newX = x + 1
      flipCell(y, newX)
    }

    function flipLeft(y,x) {
      let newX = x - 1
      flipCell(y, newX)
    }

    flipCell(y,x)
    flipNorth(y,x)
    flipSouth(y,x)
    flipRight(y,x)
    flipLeft(y,x)

    this.checkWin(board)
  }

  render() {
    return (
      <>
      {this.state.hasWon == true 
      ? <h1>You Win!</h1>     
      : 
      <table style={{margin: 'auto'}}>
        <tbody>
          {this.state.board.map((r, index) => 
          <tr>
            {r.map((c, indx) => <Cell key={`${index}-${indx}`} coord={`${index}-${indx}`} isLit={c} flipCellsAroundMe={this.flipCellsAround} />)}
          </tr>)}
        </tbody>
      </table> }
    </>
    )
  }
}


export default Board;
