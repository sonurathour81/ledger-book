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

    div:nth-child(3){
        color: #565656;
        span{
            color: #21ba45;
        }
    }

`

export const FinallyRes = styled.div`
    color: #565656;
    span{
        ${({settled}) => settled && css`
            color: #25cab4!important;
        `}

        ${({youget}) => youget && css`
            color: #e62323!important;
        `}

        ${({yougive}) => yougive && css`
            color: #21ba45!important;
        `}
    }

`
export const SrchMain =  styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    div:nth-child(1){
        color: #565656;
        cursor: pointer;
        i{
            color: #21ba45;
        }
    }

    div:nth-child(2){
        color: #565656;
        span{
            color: #fbbd08;
        }
    }

    form i{
        position: absolute;
        right: 25px;
        top: 20px;
        cursor: pointer;
        &:hover{
            color: #21ba45;
        }

    }
`

export const SearchInput =  styled.input`
    position: relative;
    width: 350px;
    padding-right: 35px;
    padding: 5px 8px;
    font-size: 16px;
    color: #3c3c3c;
    outline: none;
    border: 1px solid rgba(34,36,38,.15);
    transition: color .1s ease,border-color .1s ease;
    box-shadow: 0 0 0 0 transparent inset;

    &:focus{
        border: 1px solid #85b7d9;
        box-shadow: 0 0 0 0 rgba(34,36,38,.35) inset;
    }

    ::placeholder {
        color: #b9b9b9;
    }
`

