import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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

const MainContent = styled.div`
    box-sizing: border-box; 
    height: 100%;
    /* padding: 40px; */
    width: 33.3%;
`;

const ClockBox = styled.div`
    align-items: center;
    /* background-color: black; */
    border-bottom: 1px solid black;
    box-sizing: border-box;
    /* color: white; */
    display: flex;
    font-size: 18px;
    height: 50px;
    justify-content: flex-end;
    padding: 10px;
    width: 100%;
`;

function ThirdPart() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return (() => 
            clearInterval(id) // 불필요한 작업 방지
        ); 
    }, []);

    return (
        <MainContent>
            <ClockBox>
                { time.toLocaleDateString() } { time.toLocaleTimeString()}
            </ClockBox>
        </MainContent> 
    );
};

export default ThirdPart;