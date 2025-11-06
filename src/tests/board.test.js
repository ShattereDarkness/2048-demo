import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as engine from '../utils/board';


describe('createEmptyBoard', () => {
    it('Create grid of 0s', () => {
        const board = engine.createEmptyBoard(4);
        expect(board.length).toBe(4);
        expect(board.every(row => row.length === 4)).toBe(true);
        expect(board.every(row => (cell => cell === 0))).toBe(true);
    });
});

describe('addTiles', () => {
    it('Add random tile', () => {
        let board = [[0,0], [0,0]];

        vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.49)
            .mockReturnValueOnce(0.1);


        board = engine.addRandomTile(board);
        console.log(board)

        expect(board[0][1] === 2).toBe(true);
        let sum = 0;
        board.flat().map(i => sum += i);
        expect(sum).toBe(2);

        
    }) 
})