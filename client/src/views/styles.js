import styled from "styled-components"

export const Container = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media screen and (max-width: 768px) {
    /* margin-top: 15%; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    position: absolute;
    top: 25%;
    width: 100%;
  }

  @media screen and (min-width: 1025px) {
    position: absolute;
    top: 25%;
  }
`

export const Title = styled.h1`
  font-family: "Archivo Black";
  font-size: 72px;
  color: #eee;
  margin-bottom: 0px;
`

export const Highlighted = styled.span`
  color: #0cf;
`

export const UndecoratedLink = styled.a`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`

export const Description = styled.h2`
  color: #ddd;
  font-family: "Raleway";
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.8em;
  }

  @media screen and (min-width: 1025px) {
    font-size: 2em;
  }
`

export const BodyContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: ${(p) => (p.customMobileWidth ? p.customMobileWidth : null)};
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    max-width: 80%;
  }

  @media screen and (min-width: 1025px) {
    max-width: 700px;
  }
`

export const BodyText = styled.span`
  color: #ddd;
  font-family: "Raleway";
  font-size: 18px;
`

export const StyledInput = styled.input`
  background-color: #112;
  color: #ddd;
  border: 1px solid ${(p) => (p.isError ? "#d36" : "#ddd")};
  font-family: "Mukta";
  font-size: 1em;
  padding: 6px;
  padding-left: 10px;

  @media screen and (min-width: 1025px) {
    width: ${(p) => (p.customWidth ? p.customWidth : "100%")};
  }
`

export const InputFeedbackText = styled.span`
  color: ${(p) => (p.isError ? "#d36" : p.isSuccess ? "#3d6" : "#aaa")};
  font-family: "Mukta";
  font-size: 14px;
  justify-self: flex-start;
  white-space: pre;
`

export const StyledLabel = styled.label`
  color: #ddd;
  margin-right: 15px;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
`

export const FormContainer = styled.div`
  margin-top: 40px;
`

export const FormLeftColumn = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    justify-content: flex-end;
  }

  @media screen and (min-width: 1025px) {
    justify-content: flex-end;
  }
`

export const FormRightColumn = styled.div`
  display: flex;

  /* text-align: left; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    /* grid-row-start: 2; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-column-start: 2;
  }

  @media screen and (min-width: 1025px) {
    justify-content: flex-start;
    grid-column-start: 2;
  }
`

export const FormRow = styled.div`
  display: grid;
  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 1fr;
    /* margin-bottom: 10px; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }

  @media screen and (min-width: 1025px) {
    grid-template-columns: 1fr 2fr;
    margin-bottom: 20px;
  }
`

export const ErrorTextContainer = styled.div`
  display: grid;
  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 1fr;
    margin-top: -10px;
    margin-bottom: -10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }

  @media screen and (min-width: 1025px) {
    margin-top: -20px;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 20px;
  }
`

export const StyledButton = styled.button`
  background-color: transparent;
  border: ${(p) => (p.disabled ? "1px solid #666" : "1px solid #0cf")};
  color: ${(p) => (p.disabled ? "#666" : "#0cf")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  padding: 7px;
  text-transform: uppercase;

  :hover {
    background-color: ${(p) => !p.disabled && "#001026"};
  }

  @media screen and (max-width: 768px) {
    flex-grow: 1;
    margin-top: 10px;
    /* width: 100%; */
  }
  @media screen and (min-width: 1025px) {
    flex-grow: 1;
    margin-left: 10px;
    min-width: 200px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 34px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 80px;
  }
  @media screen and (min-width: 1025px) {
    flex-direction: row;
  }
`

export const NFKeyURL = styled.label`
  color: #aaa;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  margin-right: 15px;
`

export const NFKeyURLSpacer = styled.div`
  @media screen and (max-width: 768px) {
    /* grid-template-rows: 1fr 1fr; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    /* grid-template-columns: 1fr 2fr; */
  }

  @media screen and (min-width: 1025px) {
    flex-grow: 1;
    text-align: left;
  }
`
export const FadeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  opacity: ${(p) => (p.fade.in ? 1 : 0)};
  transition: opacity 1s ease;
`
