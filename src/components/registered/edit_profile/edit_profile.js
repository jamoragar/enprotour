import React, {useState, useEffect} from 'react';
import firebase from '../../firebase/firebase';
import {Modal, Form, Col} from 'react-bootstrap';

const EditProfile = (props) => {
    const [fbData, setFbData] = useState(null)
    const company = props.company_id;

    useEffect(() => {
        firebase.database().ref(`/Users/${company}`).on('value', (snapshot) => {
            setFbData(snapshot.val());
        })
    }, []);


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('submiting...');
    }
    const handlePayment = (e, id) => {
        firebase.database().ref('/Users').child(id).update({
            pagado:e.target.checked
        }).then((success) => console.log(success)).catch((error) => console.log(error))
    }
    return(
        <Modal {...props}>
            <Modal.Header closeButton>Perfil Participante</Modal.Header>
            <Modal.Body>
                {
                    fbData ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nombre Fantasia:</Form.Label>
                                        <Form.Control type="text" value={fbData.company_name} name="fantasy_name" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Rut:</Form.Label>
                                        <Form.Control type="text" value={fbData.company_rut} name="rut" />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nombre(s) Participante:</Form.Label>
                                        <Form.Control type='text' value={fbData.owner_name} name='owner_name' />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Apellido(s) Participante:</Form.Label>
                                        <Form.Control type='text' value={fbData.owner_lname} name='owner_lname' />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control type='text' value={fbData.email} name='email' />
                                </Col>
                                <Col>
                                    <Form.Label>Número de Contacto:</Form.Label>
                                    <Form.Control type='text' value={fbData.number} name='number' />
                                </Col>
                                <Col>
                                    <Form.Label>Ciudad:</Form.Label>
                                    <Form.Control type='text' value={fbData.city} name='city' />
                                </Col>
                            </Form.Row>
                            <br/>
                            {!fbData.comprador ? 
                                <Form.Row>
                                    <Col>
                                        <Form.Check
                                            checked={fbData.pagado}
                                            id={fbData.id}
                                            type="switch"
                                            label="Inscripción Pagada"
                                            onChange={(e) => handlePayment(e, fbData.id)}
                                        />
                                    </Col>
                                </Form.Row>
                            :
                            null
                            }
                        </Form>
                    )
                    :
                    <h1>Loading...</h1>
                }
            </Modal.Body>
        </Modal>
    )
}

export default EditProfile;