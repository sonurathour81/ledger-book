import styled from 'styled-components'

export const CustmFormField = styled.div`
    padding: 3px 12px!important;

    label{
        font-size: 16px!important;
        font-weight: 100!important;
        color: #888888!important;
        margin-bottom: 6px!important;
    }
    select,
    input{
        padding: 10px!important;
        font-size: 13px!important;
        color: #383838!important;
        border-radius: 0px!important;
        height: 40px;

    }
`

export const CustmButton = styled.div`
    padding: 10px 6px;
    button{
        width: 100%;
        padding: 14px!important;
        font-size: 13px!important;
        border-radius: 0px!important;
    }
`

export const ChekBoxsMain = styled.div`
    padding: 8px 0px;
    .ui.radio.checkbox label:before {
        width: 20px!important;
        height: 20px!important;
        top: 0px!important;
    }
    .ui.radio.checkbox label:after {
        top: 0px!important;
        width: 20px!important;
        height: 20px!important;
        background-color: rgb(33, 186, 69)!important;
    }
` 