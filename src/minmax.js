const PLAYER_HUMAN = 'X';
const PLAYER_AI = 'O';

//goal states
const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

//goal state test function
const checkWinner = (board) => {
    for (let i = 0; i < WIN_LINES.length; i++) {
        const [a, b, c] = WIN_LINES[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

//Get available moves
const getEmptySquares = (board) => {
    return board.map((val, index) => val === null ? index : null).filter(val => val !== null);
};

//  The Minimax Algorithm
const minimax = (newBoard, player) => {
    const availableSpots = getEmptySquares(newBoard);
    const winner = checkWinner(newBoard);

    // Base Case: Evaluate the board state//leaf node
    if (winner === PLAYER_HUMAN) {
        return { score: -1 }; // Human wins: BAD for AI
    } else if (winner === PLAYER_AI) {
        return { score: 1 };  // AI wins: GOOD for AI
    } else if (availableSpots.length === 0) {
        return { score: 0 };   // Draw
    }

    const moves = [];

    // Recurse through all possible moves
    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
        const spot = availableSpots[i];
        move.index = spot;

        // Make the move for the current player
        newBoard[spot] = player;

        if (player === PLAYER_AI) {
            // MAXIMIZER: AI tries to maximize its score (1)
            const result = minimax(newBoard, PLAYER_HUMAN);
            move.score = result.score;
        } else {
            // MINIMIZER: Human tries to minimize AI's score (-1)
            const result = minimax(newBoard, PLAYER_AI);
            move.score = result.score;
        }

        // Reset the spot on the board (clean up for next loop iteration)
        newBoard[spot] = null;
        moves.push(move);
    }

    // 4. Find the best move from the collected moves
    let bestMove = null;
    if (player === PLAYER_AI) {
        // AI (Maximizer): Choose the move with the highest score
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        // Human (Minimizer): Choose the move with the lowest score
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
};


export const findBestMove = (board) => {
    // The minimax function returns an object with the best index and its score
    const bestMove = minimax(board, PLAYER_AI);
    return bestMove.index;
};