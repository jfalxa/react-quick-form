import React from 'react';

import withForm        from '../src/withForm';
import * as validators from './validators';


const rules =
{
    email :
    {
        validate : validators.email.validate,
    },

    password :
    {
        validate : validators.password.validate
    }
};


function ValidationForm( { fields, errors, change, submit } )
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
            <span>{ errors.email }</span>

            <input
                name="password"
                value={ fields.password } />
            <span>{ errors.password }</span>

            <button type="submit">SUBMIT</button>

        </form>

    );
}


export default withForm( rules )( ValidationForm );

