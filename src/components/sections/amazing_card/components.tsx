import styled from "styled-components";

export const CardSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  transition: transform 0.8s ease;
  font-size: 2rem;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
`;

export const CardSideFront = styled(CardSide)`
  background-color: green;
`;

export const CardSideBack = styled(CardSide)`
  transform: rotateY(180deg);
  text-align: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  background-color: rgba(255, 255, 255, 0.4);
`;

export const Card = styled.div`
  perspective: 150rem;
  -moz-perspective: 150rem;
  position: relative;

  &:hover ${CardSideFront} {
    transform: rotateY(-180deg);
  }

  &:hover ${CardSideBack} {
    transform: rotateY(0);
  }
`;
export const CardPicture = styled.div`
  background-size: cover;
  background-position: bottom;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  background-blend-mode: screen;
  background-image: linear-gradient(
      to right bottom,
      rgba(white, 1),
      rgba(green, 1)
    ),
    url(../img/nat-5.jpg);
`;

export const CardHeading = styled.div`
  font-size: 2.8rem;
  font-weight: 300;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
  position: absolute;
  top: 12rem;
  right: 2rem;
  width: 75%;
  text-align: right;
`;

export const CardHeadingSpan = styled.span`
  padding: 1rem 1.5rem;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-image: linear-gradient(
    to right bottom,
    rgba(white, 0.85),
    rgba(green, 0.85)
  );
`;

export const CardDetails = styled.div`
  padding: 3rem;

  ul {
    list-style: none;
    width: 80%;
    margin: 0 auto;

    li {
      text-align: center;
      font-size: 1.5rem;
      padding: 1rem;

      &:not(:last-child) {
        border-bottom: 0.1px solid rgba(gray, 0.1);
      }
    }
  }
`;

export const CardHeadingBack = styled.div`
  font-size: 1.3rem;
`;

export const CardPrice = styled.div`
  font-size: 6rem;
  letter-spacing: -2px;
`;
