import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import theme from "../common/colors";

const AlignCenter = css`
    align-items: center;
    display: flex;
    justify-content: center;
`;

const HorizontalAlign = css`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const MainWrap = styled.main`
    height: 100%;
    width: 30%;
    
    @media (max-width: 768px) { width: 100%; };
`;

const LayoutSection = styled.article`
  background-color: ${ theme.sectionColor };
  border-radius: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px;
`;


function ThirdPart() {

    return (
        <MainWrap>
            <LayoutSection>
                
            </LayoutSection>
        </MainWrap> 
    );
};

export default ThirdPart;