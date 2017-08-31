import React, { Component } from 'react';

import './App.css';
import Board from './Containers/Board';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            order: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const move = {
            x: i % 3 + 1,
            y: Math.floor(i / 3) + 1
        };

        if (calculateWinner(squares).winner || squares[i]) return;

        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat([
                {
                    squares,
                    move
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move
                ? "Move: (" + step.move.x + ", " + step.move.y + ")"
                : "Game start";
            return (
                <li key={move}>
                    <a
                        style={
                            move === this.state.stepNumber
                                ? { fontWeight: "bold" }
                                : null
                        }
                        tabindex="0"
                        role="button"
                        type="button"
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </a>
                </li>
            );
        });

        let status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        if (winner.winner) status = "Winner: " + winner.winner;

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winner={winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div className="switch">
                        <input
                            type="checkbox"
                            onChange={e =>
                                this.setState({
                                    ...this.state,
                                    order: !this.state.order
                                })}
                        />
                        <label>
                            <span className="fontawesome-ok" />
                            <span className="fontawesome-remove" />
                            <div />
                        </label>
                    </div>
                    <ol>{this.state.order ? moves : moves.reverse()}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return {
                winner: squares[a],
                line: lines[i]
            };
        }
    }
    return {
        line: []
    };
}


export default Game;
