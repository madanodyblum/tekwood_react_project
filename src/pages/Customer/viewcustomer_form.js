import React, {Component} from 'react'
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { trls } from '../../components/translate';
import * as authAction  from '../../actions/authAction';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';

const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    blankdispatch: () =>
              dispatch(authAction.blankdispatch()),
});

class Viewcustomerform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        this.props.blankdispatch();
    }

    handleSubmit = (event) => {
        this._isMounted = true;
        event.preventDefault();
        const clientFormData = new FormData(event.target);
        const data = {};
        for (let key of clientFormData.keys()) {
            data[key] = clientFormData.get(key);
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.put(API.PostUpdateCustomer+this.props.updateCustomerData.id, data, headers)
        .then(result => {
            this.props.onHide();
            this.props.onGetCustomerData()
        })
        .catch(err => {
        });
    }

    onHide = () => {
        this.props.onHide() 
        this.props.blankdispatch();
    }
    
    render(){
        let viewCustomerData = this.props.viewCustomerData;
        return (
            <Modal
                show={this.props.show}
                onHide={this.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop= "static"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {trls('View_Customer')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form className="container product-form" onSubmit = { this.handleSubmit }>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="3">
                            {trls('CustomerName')}   
                            </Form.Label>
                            <Col sm="9" className="product-text input-div">
                                <Form.Control type="text" name="name" className="input-text" disabled defaultValue={viewCustomerData.name} required placeholder={trls('CustomerName')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="3">
                            {trls('Address')}   
                            </Form.Label>
                            <Col sm="9" className="product-text input-div">
                                <Form.Control type="text" name="address" className="input-text" disabled defaultValue={viewCustomerData.address} required placeholder={trls('Address')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="3">
                            {trls('ZipCode')}   
                            </Form.Label>
                            <Col sm="9" className="product-text input-div">
                                <Form.Control type="text" name="zipCode" className="input-text" disabled defaultValue={viewCustomerData.zipCode} required placeholder={trls('ZipCode')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="3">
                            {trls('City')}   
                            </Form.Label>
                            <Col sm="9" className="product-text input-div">
                                <Form.Control type="text" name="city" className="input-text" disabled defaultValue={viewCustomerData.city} required placeholder={trls('City')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="3">
                            {trls('Country')}   
                            </Form.Label>
                            <Col sm="9" className="product-text input-div">
                                <Form.Control type="text" name="country" className="input-text" disabled defaultValue={viewCustomerData.country} required placeholder={trls('Country')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="3">
                            {trls('AvailableCredits')}   
                            </Form.Label>
                            <Col sm="9" className="product-text input-div">
                                <Form.Control type="number" name="availableCredits" className="input-text" disabled defaultValue={viewCustomerData.availableCredits} required placeholder={trls('AvailableCredits')} />
                            </Col>
                        </Form.Group>
                    </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Viewcustomerform);