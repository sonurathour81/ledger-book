import styled from 'styled-components'

export const MainTab = styled.div`
    margin: 20px;
    a{
        width: 50%;
        text-align: center;
        font-size: 16px;
        padding: 12px;
    }
    .nav-link{
        border: none;
        background: whitesmoke;
        color: #21ba45;
    }
    .nav-link.active{
        background: #21ba45;
        color: white;
        border-radius: 0;
    }
`