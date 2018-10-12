import React from 'react';
import { Row, Column } from '../Layout';
import styled from 'styled-components/native';

interface Props {
  onChange: (s: string) => void;
  onSubmit: () => void;
  value: string;
}

const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  placeholder: 'Search ...',
  returnKeyType: 'search',
})`
  background-color: white;
  border-radius: 4px;
  height: 40px;
  padding-horizontal: 16px;
`;

const SearchBox = ({ onChange, value, onSubmit }: Props) => {
  return (
    <Column backgroundColor="#DDD" padding={8}>
      <Input onChangeText={onChange} value={value} onSubmitEditing={onSubmit} />
    </Column>
  );
};

export default SearchBox;
