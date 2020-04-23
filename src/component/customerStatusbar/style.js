import styled,{css} from 'styled-components'

export const CustStatusMain = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    font-size: 16px;
    margin: 20px;
    color: black;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,.1);

    ${({fixedStatus}) => fixedStatus && css`
        position: fixed!important;
        width: 98%!important;
        left: 20px!important;
        right: 20px!important;
        margin: 0px!important;
    `}

    div:nth-child(1){
        color: #565656;
        span{
            color: #21ba45;
        }
    }

    div:nth-child(2){
        color: #565656;
        span{
            color: #e62323;
        }
    }


`

export const FinallyRes = styled.div`
    color: #565656;
    span{
        ${({settled}) => settled && css`
            color: #25cab4;
        `}

        ${({youget}) => youget && css`
            color: #e62323;
        `}

        ${({yougive}) => yougive && css`
            color: #21ba45;
        `}
    }

`
