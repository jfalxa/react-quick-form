import React from 'react';


export default class Form extends React.Component
{
    state =
    {
        fields : {},
        errors : {}
    }


    handleChange = ( field, value, errors ) =>
    {
        this.props.onChange( field, value, errors );

        this.setState( {
            fields : { ...this.state.fields, [field] : value },
            errors : { ...this.state.errors, [field] : errors }
        } );
    }


    handleSubmit = ( fields, errors ) =>
    {
        this.props.onSubmit( fields, errors );
        this.setState( { fields, errors } );
    }


    render()
    {
        const { fields, errors }        = this.state;
        const { renderForm:CustomForm } = this.props;

        return (

            <CustomForm
                fields={ fields }
                errors={ errors }
                onChange={ this.handleChange }
                onSubmit={ this.handleSubmit } />

        );
    }
}
