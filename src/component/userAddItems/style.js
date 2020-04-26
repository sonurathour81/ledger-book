import styled from 'styled-components'

export const MainDiv2 = styled.div`
    form{
        box-shadow: 0px 2px 10px 3px rgba(0,0,0,.1);
        padding: 25px 20px;
        margin-top: 20px;
    }
`
export const MainUserHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    font-size: 18px;
    color: #ffffff;
    border-bottom: 2px solid #21ba45;
    background: #21ba45;
    a{
        text-decoration: none;
        color: white;
    }
`

export const MainDivInput = styled.div`
    
    label{
        font-size: 15px!important;
        font-weight: 100!important;
        color: #5d5d5d!important;
        margin-bottom: 6px!important;
    }
    select,input{
        padding: 10px!important;
        border-radius: 0!important;
        font-size: 14px!important;
        color: #383838!important;
    }
    `

export const MianDivButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    button{
        width: 100%;
        padding: 14px!important;
        font-size: 13px!important;
        border-radius: 0px!important;
        background: #e62323!important;
    }
    
`

export const CustTable = styled.div`
    padding: 20px;
    box-shadow: 0px 2px 10px 3px rgba(0,0,0,.1);
    margin-top: 20px;
    div{
        color: #565656;
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        span{
            color: #e62323;
        }
    }
    table{
        border-top: 1px solid #e62323!important;
        border-bottom: 1px solid #e62323!important;
        border-radius: 0px!important;
        td{
            text-transform: uppercase;
            padding: 10px!important;
            vertical-align: middle!important;
        }
        i.rupee{
           color: #525252;
        }
        i.trash{
            color: #e62323;
        }
    }
`

export const TotalTr = styled.tr`
    td{
        font-weight: 900;
        button{
             background: #e62323!important;
        }
    }
`
