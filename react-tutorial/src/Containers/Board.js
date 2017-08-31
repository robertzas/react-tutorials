import React, { Component } from 'react';
import Square from '../Components/Square'

class Board extends Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                mark={this.props.winner.line.includes(i)}
            />
        );
    }
    renderRow(i) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(this.renderSquare(i * 3 + j));
        }
        return row;
    }
    renderBoard() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            board.push(
                <div className="board-row" key={i}>
                    {this.renderRow(i)}
                </div>
            );
        }
        return board;
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

export default Board;