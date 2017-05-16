import React                 from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Form           from './Form'
import SimpleForm     from './SimpleForm';
import ValidationForm from './ValidationForm';
import ComplexForm    from './ComplexForm';


storiesOf( 'withForm', module )

     .add( 'Simple form with controlled fields', () =>
    (
        <Form
            onChange={ action( 'form change' ) }
            onSubmit={ action( 'form submit' ) }
            renderForm={ SimpleForm } />
    ) )

    .add( 'Form with validation', () =>
    (
        <Form
            onChange={ action( 'form change' ) }
            onSubmit={ action( 'form submit' ) }
            renderForm={ ValidationForm } />
    ) )

    .add( 'Form with validation and transformations', () =>
    (
        <Form
            onChange={ action( 'form change' ) }
            onSubmit={ action( 'form submit' ) }
            renderForm={ ComplexForm } />
    ) )

