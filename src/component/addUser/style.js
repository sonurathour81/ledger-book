import styled from 'styled-components'

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
        height: 37px!important;
    }
    .form-group.has-feedback{
        margin-bottom: 0px!important;
    }
    .form-group.has-feedback.has-error{
        .help-block{
            color: #e62323;
        }
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