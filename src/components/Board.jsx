import React, { useState } from 'react';
import { findBestMove } from '../minmax.js';

const initialBoard = Array(9).fill(null);
const PLAYER_HUMAN = 'X';
const PLAYER_AI = 'O';

// Goal state test function
const calculateWinner = (squares) => {
 
    // these are the goal states
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

// Square component for the UI
const Square = ({ value, onClick }) => (
  <button 
    className="w-20 h-20 text-4xl font-bold flex items-center justify-center  bg-gray-100  border-gray-400  hover:bg-gray-200 transition-colors"
    onClick={onClick}
  >
    {value}
  </button>
);

const Board = () => {
    const [board, setBoard] = useState(initialBoard);
    const [isHumanTurn, setIsHumanTurn] = useState(true);

    const makeAIMove = (currentBoard) => {
        // Check if game is already over
        if (calculateWinner(currentBoard) || currentBoard.every(Boolean)) {
            setIsHumanTurn(true); // Re-enable human turn to reset logic state
            return;
        }

        // Find the best move using Minimax
        const bestMoveIndex = findBestMove(currentBoard.slice());

        // Make the AI move
        const newBoard = currentBoard.slice();
        newBoard[bestMoveIndex] = PLAYER_AI;
        setBoard(newBoard);
        setIsHumanTurn(true); // Switch turn back to human
    };

    const handleClick = (index) => {
        if (calculateWinner(board) || board[index] || !isHumanTurn) {
            return; // Ignore if game is over, square is occupied, or it's not human's turn
        }

        // 1. Human's Move
        const humanMoveBoard = board.slice();
        humanMoveBoard[index] = PLAYER_HUMAN;
        setBoard(humanMoveBoard);

        // Check for winner after human move
        if (calculateWinner(humanMoveBoard) || humanMoveBoard.every(Boolean)) {
             return;
        }

        // 2. Prepare for AI's Move
        setIsHumanTurn(false); // Disable user input

        // Use setTimeout to allow the UI to update with the human's move 
        // before the AI calculation (improves UX)
        setTimeout(() => {
            makeAIMove(humanMoveBoard);
        }, 500); // 500ms delay
    };

    const winner = calculateWinner(board);
    const status = winner ? `Winner: ${winner}` : board.every(Boolean)
                                                    ? `Draw!` : `Next player: ${isHumanTurn ? PLAYER_HUMAN : PLAYER_AI}`;

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-800">AI Tic Tac Toe</h1>
            The game you will never win !
            
            {/* status shows if the next player is human or AI or if there's a winner or draw */}
            <div className="text-xl mt-4 mb-8 bg-green-200 py-2 px-4 rounded-lg font-semibold text-gray-600">{status}</div>
            
            {/* grid of 3x3 squares */}
            <div className="grid grid-cols-3 gap-1">
                {board.map((value, index) => (
                    <Square key={index} value={value} onClick={() => handleClick(index)} />
                ))}
            </div>

            {/* restart game button */}
            <button
                className="mt-6 px-6 py-2 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => {
                    setBoard(initialBoard);
                    setIsHumanTurn(true);
                }}
            >
                Restart Game
            </button>
        </div>
    );
};

export default Board;
