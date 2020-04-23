import React,{useState, useEffect} from 'react';
import { Field,Textarea, formInputData, formValidation } from 'reactjs-input-validator';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'

import { Modal } from 'react-bootstrap';

import {TextConfim,CustmButton,CustmHeader,CustmModal} from './style.js'
import * as fun from '../../redux/actions/index'

import "./style.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ConfirmationModal = (props) =>{
    
    

    return(
        <div>
            <Modal show={props.showModal} onHide={props.hideModal}>
                <CustmHeader>
                    <Modal.Header>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                </CustmHeader>
                <Modal.Body>
                    <div>
                        <TextConfim>
                            {props.text}
                        </TextConfim>
                        <CustmButton>
                            <button 
                                className="positive ui button" 
                                type="submit"
                                onClick={props.hideModal}
                            >
                                OK
                            </button>
                        </CustmButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
