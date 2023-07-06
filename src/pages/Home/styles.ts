import styled from "styled-components";

export const HomeContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

`

export const BaseContdownButton = styled.button`

  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${props => props.theme["green-500"]};
  color: ${props => props.theme["gray-100"]};

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
  }

  &:not(:disabled)hover{
  background: ${props => props.theme["green-700"]};
  }

  &:hover {
    opacity: .9;
  }
`

export const StartContdownButton = styled(BaseContdownButton)`
  background: ${props => props.theme["green-500"]};

  &:not(:disabled)hover{
  background: ${props => props.theme["green-700"]};

  }
`

export const StopContdownButton = styled(BaseContdownButton)`
  background: ${props => props.theme["red-500"]};

  &:not(:disabled)hover{
  background: ${props => props.theme["red-700"]};
  }
`


