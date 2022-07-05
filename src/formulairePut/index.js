import { useState} from 'react';
import './styles.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

function FormulairePut(props) {
    const { donnee } = props;
    const { boolMod } = props;
    const { id } = props;

    //console.log(props);

    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
    const [debut,setDebut]=useState({
            name: JSON.stringify(donnee[id].name).replace('"','').replace('"',''),
            company: JSON.stringify(donnee[id].company.name).replace('"','').replace('"',''),
            email: JSON.stringify(donnee[id].email).replace('"','').replace('"',''),
            adresse: JSON.stringify(donnee[id].address.city).replace('"','').replace('"',''),
            phone: JSON.stringify(donnee[id].phone).replace('"','').replace('"','')
    });
    
    const formik = useFormik({        
        initialValues: {
            name: debut.name,
            company: debut.company,
            email: debut.email,
            adresse: debut.adresse,
            phone: debut.phone
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, "Must be 50 characters or less").required("Required"),
            company: Yup.string().max(25, "Must be 25 characters or less").required("Required"),
            email: Yup.string().email("Invalid email addresss`").required("Required"),
            adresse: Yup.string().max(50, "Must be 50 characters or less").required("Required"),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values);
            try {
                axios.put('https://jsonplaceholder.typicode.com/users/'+(id+1),
                {
                    name:values.name,                    
                    email:values.email,
                    phone:values.phone,
                    address:{
                        city:values.adresse}
                    ,
                    company:{
                        name:values.company}
                    })                
            } catch (error){
                console.log(error.response);
            }
        }

    });         


    return (
        <>
            <div className='fonds2' onClick={boolMod}></div>
            <div className='fonds'>
                <div className='form_fonds'>
                    <button className='btn_cancel' onClick={boolMod}>X</button>
                    <h2>FORMULAIRE</h2>
                    <form action="" className='form_class' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Name</label>
                            <input
                                id="name"
                                type="text"
                                className="input_formulaire"
                                placeholder='Full Name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name ? <p> {formik.errors.name} </p> : null}
                        </div>

                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Adresse</label>
                            <input
                                id="adresse"
                                type="text"
                                className="input_formulaire"
                                placeholder='Adresse'
                                value={formik.values.adresse}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.adresse ? <p> {formik.errors.adresse} </p> : null}
                        </div>

                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Phone</label>
                            <input
                                id="phone"
                                type="text"
                                className="input_formulaire"
                                placeholder='Phone number'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.phone ? <p> {formik.errors.phone} </p> : null}
                        </div>                      
                        
                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Email</label>
                            <input
                                id="email"
                                type="text"
                                className="input_formulaire"
                                placeholder='Email address'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email ? <p> {formik.errors.email} </p> : null}
                        </div>

                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Company</label>
                            <input
                                id="company"
                                type="text"
                                className="input_formulaire"
                                placeholder='Company name'
                                value={formik.values.company}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.company ? <p> {formik.errors.company} </p> : null}
                        </div>

                       

                        <button type='submit' className='btn_envoie btn_type'>Modifier</button>
                    </form>
                </div>
            </div>

        </>

    );
}

export default FormulairePut;