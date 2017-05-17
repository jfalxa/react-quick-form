import React     from 'react';
import get       from 'lodash/get';
import omitBy    from 'lodash/omitBy';
import isEmpty   from 'lodash/isEmpty';
import identity  from 'lodash/identity';
import mapValues from 'lodash/mapValues';
import stubArray from 'lodash/stubArray';


export default function withForm( rules )
{
    function viewToStore( field, viewValue )
    {
        const toStore = get( rules, [field, 'toStore'] )
            || identity;

        return toStore( viewValue );
    }


    function storeToView( field, storeValue )
    {
        const toView = get( rules, [field, 'toView'] )
            || identity;

        return toView( storeValue );
    }


    function validate( field, storeValue )
    {
        const validate = get( rules, [field, 'validate'] )
            || stubArray;

        return validate( storeValue );
    }


    return Component => class FormManager extends React.Component
    {
        getStoreFields()
        {
            const { fields } = this.props;

            // list all fields, including those which are not yet initialized
            return mapValues( rules,
                ( _, field ) => fields[field] );
        }


        getViewFields()
        {
            const { fields } = this.props;

            // turn store values into ones expected by your views
            return mapValues( rules,
                ( _, field ) => storeToView( field, fields[field] ) );
        }


        validate()
        {
            const { fields } = this.props;

            // validate every field listed in the rules
            const errors = mapValues( rules,
                ( _, field ) => validate( field, fields[field] ) );

            // remove fields without errors from the final object
            return omitBy( errors, isEmpty );
        }


        change = ( field, viewValue ) =>
        {
            // prepare value for the store and validate it
            const storeValue = viewToStore( field, viewValue );
            const errors     = validate( field, storeValue );

            this.props.onChange( field, storeValue, errors );
        }


        submit = ( e ) =>
        {
            e.preventDefault();

            const fields = this.getStoreFields();
            const errors = this.validate();

            this.props.onSubmit( fields, errors );
        }


        render()
        {
            const injectedProps =
            {
                fields : this.getViewFields(),
                errors : this.props.errors,
                change : this.change,
                submit : this.submit
            };

            return <Component { ...injectedProps } />;
        }
    }
}
