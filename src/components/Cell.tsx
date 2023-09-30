import React from 'react';
import styled from 'styled-components';
import { CellProps } from '../types';

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
`;

const Circle = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
`;

const Square = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid ${(props) => props.color};
`;

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const { shape, color, revealed, handleClick } = props;
  return (
    <CellContainer
      onClick={!revealed ? handleClick : () => null}
    >
      {shape === 'square' && <Square color={revealed ? color : 'transparent'} />}
      {shape === 'circle' && <Circle color={revealed ? color : 'transparent'} />}
      {shape === 'triangle' && <Triangle color={revealed ? color : 'transparent'} />}
    </CellContainer>
  );
};

export default Cell;