import styled,{css} from 'styled-components'

export const CustTable = styled.div`
    padding: 20px;
    box-shadow: 0px 2px 10px 3px rgba(0,0,0,.1);
    margin-top: 20px;
    .ui.table{
        border-radius: 0px!important;
    }
    i.rupee{
           color: #525252;
    }
`

export const TableHeading = styled.div`
    text-align: center;
    font-size: 20px;
    line-height: 1;

    ${({yougave}) => yougave && css`
        color: #e62323;
    `}

    ${({yougot}) => yougot && css`
        color: #21ba45;
    `}
`

export const AccrodinMain = styled.div`
    max-height: 550px;
    overflow-y: auto;
    margin-bottom: 10px;
`

export const GotTopHeader = styled.div`
    display: flex;
    padding: 12px 18px;
    border-top: 1px solid #21ba45;
    border-bottom: 1px solid #21ba45;
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
    color: #565656;


    div:nth-child(1) {
        width: 10%;
    }
    div:nth-child(2) {
        width: 30%;
    }
    div:nth-child(3) {
        width: 30%;
    }
    div:nth-child(4) {
        width: 30%;
    }
`

export const GotItems = styled.div`
    display: flex;
    padding: 12px 10px;
    margin: 0px 11px;
    border: 1px solid #dddddd;
    border-top: none;

    div:nth-child(1) {
        width: 10%;
    }
    div:nth-child(2) {
        width: 30%;
    }
    div:nth-child(3) {
        width: 30%;
    }
    div:nth-child(4) {
        width: 30%;
    }

    :nth-child(1){
        border-top: 1px solid #dddddd;
    }
`
