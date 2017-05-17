import React from 'react';

import withForm from '../src';


const rules =
{
    email    : {},
    password : {}
};


function SimpleForm( { fields, change, submit } )
{
    return (

        <form
            autoComplete="off"
            style={ { display: 'flex', flexDirection: 'column' } }
            onChange={ e => change( e.target.name, e.target.value ) }
            onSubmit={ submit }>

            <input
                name="email"
                value={ fields.email } />

            <input
                name="password"
                value={ fields.password } />

            <button type="submit">SUBMIT</button>

        </form>

    );
}


export default withForm( rules )( SimpleForm );

