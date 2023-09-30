export type Shape = 'circle' | 'square' | 'triangle';
export type Color = 'red' | 'green' | 'blue';

export interface CellProps {
  id: number;
  shape: Shape;
  color: Color;
  revealed: boolean;
  handleClick?: () => any;
}

export type GameState = {
  cells: CellProps[];
  selectedCells: CellProps[];
  attempts: number;
};