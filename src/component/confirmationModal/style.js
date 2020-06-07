import styled, {css} from 'styled-components'

export const CustmButton = styled.div`
    padding: 10px 6px;
    button{
        width: 100%;
        padding: 14px!important;
        font-size: 13px!important;
        border-radius: 0px!important;
    }
`
export const CustmHeader = styled.div`
    .modal-header{
        padding: 12px 22px!important;
        color: #2b2b2b!important;
        text-align: center;
        background: #f7f7f7;  
    }
`

export const TextConfim = styled.div`
    font-size: 18px;
    text-align: center;
    padding: 40px 10px;
    line-height: 1.5;
    color: #757575;
`

export const CustmFormField = styled.div`
    padding: 3px 12px!important;

    label{
        font-size: 15px!important;
        font-weight: 100!important;
        color: #5d5d5d!important;
        margin-bottom: 6px!important;
    }
    input{
        padding: 10px!important;
        font-size: 13px!important;
        color: #383838!important;
        border-radius: 0px!important;
        height: 36px;
        position: relative;
    }
    `
export const ShowHideToggle = styled.p`
    position: absolute;
    right: 25px;
    cursor: pointer;
    top: 5px;
    color: ${props=> props.textcolor};
    opacity: .8;
    &:hover{
        opacity: 1;
    }
`