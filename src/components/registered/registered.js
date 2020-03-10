import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import EditProfile from './edit_profile/edit_profile';



const Registered = () => {

    const [fbData, setFbData] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [company, setCompany] = useState('');
    const registered_companies = fbData;
    const content = [];
    let indexName = [];
    
     useEffect(() => {
        firebase.database().ref('Users').on('value', (snapshot) => {
        setFbData(snapshot.val())
        });

    }, []);  

    if(!fbData){
        return(
            <h1>Cargando...</h1>
        )
    }
    else{
        Object.keys(registered_companies).map((key, index) => {
            content[index] = registered_companies[key]
            indexName[index] = Object.keys(registered_companies)[index];
        });
        return(
            <div className='col-md-12 ml-sm-auto col-lg-12 px-4'>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>Nombre Empresa</th>
                            <th>Rut Empresa</th>
                            <th>Participante</th>
                            <th>Comprador</th>
                            <th>Ciudad</th>
                            <th>E-mail</th>
                            <th>Número</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((company, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{company.company_name}</td>
                                    <td>{company.company_rut}</td>
                                    <td>{`${company.owner_name} ${company.owner_lname}`}</td>
                                    <td>{company.comprador ? 'SI' : 'NO'}</td>
                                    <td>{company.city}</td>
                                    <td>{company.email}</td>
                                    <td>{`+56 ${company.number}`}</td>
                                    <td align="center">
                                        <a href='# ' className="text-success"><i className="fa fa-fw fa-edit"></i> Agenda</a> | 
                                        <a href='#' onClick={() => {setModalShow(true); setCompany(company.id);}} className="text-primary"><i className="fa fa-fw fa-edit"></i> Editar</a> | 
                                        <a href='# ' className="text-danger"><i className="fa fa-fw fa-trash"></i> Borrar</a>
                                    </td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
                {modalShow ? <EditProfile show={modalShow} onHide={()=>setModalShow(false)} company_id={company} /> : null}
            </div>
            
        )
    }
}

export default Registered;