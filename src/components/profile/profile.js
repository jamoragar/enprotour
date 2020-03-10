import React,{useEffect, useState} from 'react';
import firebase from '../firebase/firebase';
import {useParams} from 'react-router-dom';
import Comprador from './comprador/comprador';
import Vendedor from './vendedor/vendedor';

const Profile = () => {
    const [companyData, setCompanyData] = useState(null);
    let {id} = useParams();

    useEffect(() => {
        firebase.database().ref(`/Users/${id}`).on('value', (snapshot) =>{
            setCompanyData(snapshot.val());
        });
    }, []);
    if(companyData){
       return companyData.comprador ? (<h1>Profile Comprador WebPage...</h1>) : (<Vendedor company={companyData} />)
    }
    else{
        return(
            <h1>Loading...</h1>
        )
    }
}

export default Profile;