import styled from 'styled-components/native';

export const Avatar = styled.Image`
  height: ${(p) => `${p.size}px`};
  width: ${(p) => `${p.size}px`};
  border-radius: ${(p) => `${p.size / 2}px`};
`;

Avatar.defaultProps = {
  size: 40,
};