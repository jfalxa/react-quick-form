import React from 'react';

import withForm        from '../src';
import * as validators from './validators';


const rules =
{
    email :
    {
        validate : validators.email.validate,
        toStore  : viewValue => viewValue + '@muy.com',
        toView   : ( storeValue='' ) => storeValue.replace( '@muy.com', '' )
    },

    password :
    {
        validate : validators.password.validate
    },

    pixel :
    {
        validate : validators.pixel.validate,
        toStore  : viewValue => viewValue ? viewValue + 'px' : viewValue,
        toView   : ( storeValue='' ) => storeValue.replace( /px$/, '' )
    },

    pixelPercent :
    {
        validate : validators.pixelPercent.validate
    }
};


function ComplexForm( { fields, errors, change, submit } )
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

            <input
                name="pixel"
                value={ fields.pixel } />
            <span>{ errors.pixel }</span>

            <input
                name="pixelPercent"
                value={ fields.pixelPercent } />
            <span>{ errors.pixelPercent }</span>

            <button type="submit">SUBMIT</button>

        </form>

    );
}


export default withForm( rules )( ComplexForm );

