import styled from 'styled-components';

export const PostPreviewContainer = styled.article`
  background: ${props => props.theme['gray-800']};
  border-radius: 8px;
  padding: 2rem;
  position: relative;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  
    time {
      font-size: 0.875rem;
      color: ${props => props.theme['gray-400']};
      white-space: nowrap;
      align-self: flex-start;
    }
  }

  .downarrow, .uparrow {
    background: transparent;
    border-radius: 8px;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: calc(12px + 1.5rem);
    width: calc(12px + 1.5rem);
    bottom: .5rem;
    left: 50%;

    > div {
      height: 12px;
      width: 12px;
      transform: rotateY(0deg) rotate(45deg);
      transition: 0.3s ease-in-out;
    }

    &:hover {
      background: ${props => props.theme['gray-600']};
    }
  }

  .downarrow {
    visibility: hidden;

    > div {
      margin-top: -.3rem;
      border-bottom: 2px solid ${props => props.theme['gray-300']};
      border-right: 2px solid ${props => props.theme['gray-300']};
    }
  }

  .uparrow {
    > div {
      margin-bottom: -.3rem;
      border-top: 2px solid ${props => props.theme['gray-300']};
      border-left: 2px solid ${props => props.theme['gray-300']};
    }
  }

  &:hover .downarrow {
    visibility: visible;
  }
`

export const PostPreviewContent = styled.div`

  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .authorInfo strong {
    display: block;
    color: ${props => props.theme['gray-100']};
    font-family: "Segoe_UI_Bold", sans-serif;
    line-height: 1.6;
  }
`
