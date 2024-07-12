// src/components/CommonStyles.js
import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const HalfInputDiv = styled.div`
  flex: 1;
`;

export const StyledButtonPrimary = styled.button`
  background: ${({ bgColor }) => bgColor || '#ff9800'};
  color: ${({ textColor }) => textColor || '#fff'};
  padding: ${({ padding }) => padding || '10px 20px'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: ${({ width }) => width || 'auto'};

  &:hover {
    background: ${({ bgColor }) => bgColor || '#ff9800'};
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ beforeBgColor }) => beforeBgColor || '#ff9800'};
    transition: transform 0.3s ease;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover:before {
    transform: scaleX(1);
  }
`;