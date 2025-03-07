import { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-synthesis: none;
    }

    html, body, #root {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin: 0
    }

    ul, 
    ol {
        list-style: none;
    }

`;

export default Reset;
