import React, { useState, useRef } from 'react';
import firebase from './components/firebase/firebase';
import { Button, Modal, Form, Col, InputGroup, Spinner } from 'react-bootstrap';
import { rutEsValido } from './helper';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [btnText, setBtnText] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);

  const input_rut_empresa = useRef(null);

  const regiones = ['Aisén del G. Carlos Ibáñez del Campo',
    'Antofagasta',
    'Arica y Parinacota',
    'Atacama',
    'Biobío',
    'Coquimbo',
    'La Araucanía',
    "Libertador General Bernardo O'Higgins",
    "Los Lagos",
    "Los Ríos",
    "Magallanes y de la Antártica Chilena",
    "Maule",
    "Metropolitana de Santiago",
    "Ñuble",
    "Tarapacá",
    "Valparaíso"];

    const handleCheck = () => {
      setChecked(!checked);
    }

    const onFormSubmit = (e) => {
      e.preventDefault();
      setBtnText(true);

      const {f_name, rut_empresa, rep_name, rep_lastname, city, region, email, number } = e.target.elements; 
      if(!rutEsValido(rut_empresa.value)){
        alert(`El rut: ${rut_empresa.value}, no es un rut válido. Intente nuevamente.`);
        input_rut_empresa.current.focus();
      }

      console.log(f_name.value, rut_empresa.value, rep_name.value, rep_lastname.value, city.value, region.value);
      const key = firebase.database().ref().push().key;
      firebase.database().ref().child(`/Users/${key}`).set({
        id: key,
        company_name: f_name.value,
        company_rut: rut_empresa.value,
        owner_name: rep_name.value,
        owner_lname: rep_lastname.value,
        city: city.value,
        region: region.value,
        email: email.value, 
        number: number.value,
        comprador: checked,
        pagado: false,
      })
        .then(()=>{
          setBtnText(false);
          handleClose();
        })

    }

  return (
    <div className="App">

      <Button onClick={handleShow} variant='primary'>Registrarse</Button>

      <Modal show={showForm} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={onFormSubmit}>
            
            <Form.Row>
              <Form.Group as={Col} controlId="formGriNombreFantasia">
                <Form.Label>Nombre Fantasia</Form.Label>
                <Form.Control name='f_name' type="text" placeholder="Ingrese Nombre de su Empresa" required/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRutEmpresa">
                <Form.Label>Rut Empresa</Form.Label>
                <Form.Control ref={input_rut_empresa} name='rut_empresa' type="text" placeholder="Ingrese el Rut de su Empresa" required/>
                <Form.Text className="text-muted">
                  Ejemplo: 12345678-0
                </Form.Text>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridNombreRepresentante">
              <Form.Label>Nombre(s) Participante</Form.Label>
              <Form.Control name='rep_name' type='text' placeholder="Ingrese el nombre del respresentante legal" required/>
            </Form.Group>

            <Form.Group controlId="formGridApellidoRepresentante">
              <Form.Label>Apellido(s) Participante</Form.Label>
              <Form.Control name='rep_lastname' type='text' placeholder="Ingrese el apellido del respresentante legal" required/>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control name='city' type='text' placeholder="Ingrese su ciudad de origen." required/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegion">
                <Form.Label>Región</Form.Label>
                <Form.Control name='region' as="select">
                  {regiones.map((region, i) => {
                    return(
                      <option value={region} key={region + i}>{region}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control name='email' type='email' placeholder="Ingrese correo electrónico" required/>
            </Form.Group>
            <Form.Group controlId="formGridNumber">
              <Form.Label>Número de contacto</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>+56</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control name='number'  type='text' placeholder='Ingrese su Nro. telefónico' />
              </InputGroup>
            </Form.Group>

            {/* Check Box Si o No */}
            <p>Comprador?</p>
            <Form.Check 
            inline
            checked={checked}
            name={'control'}
            type={'radio'}
            id={`custom`}
            label={`Si`}
            onChange={handleCheck}
            />
            <Form.Check 
            inline
            checked={!checked}
            name={'control'}
            type={'radio'}
            id={`custom`}
            label={`No`}
            onChange={handleCheck}
            />
            <br /><br />

            <Button variant="danger" onClick={handleClose}>
              Cerrar
            </Button>
            <Button style={{marginLeft:'25px'}} variant="success" type='submit'>
            {
              btnText ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
              :
              'Aceptar'
            }
            </Button>
          </Form>

        </Modal.Body>
      </Modal>

    </div>
  );
}

export default App;
