# Quick Form

This library only exposes one hoc to give some validation/transformation rules to your forms.


## Usage

The can receive 4 props that will dictate its behaviour:
- `fields`: the current list of values (indexed by field name)
- `errors`: the current list of errors (indexed by field name)
- `onChange( field, value, errors )`: a callback called any time one field changes
- `onSubmit( fields, errors )`: a callback called when the form is submitted

Then it injects 4 props to your own component so you can interact with it:
- `fields`: the current list of values (indexed by field name and transformed for the view)
- `errors`: the current list of errors (indexed by field name)
- `change( field, value )`: a function to update one field value
- `submit( e )`: a function to submit your whole form and prevent the page from reloading

The final component is completely controlled so you'll have to manage a state/store outside of it. You can follow the example used in stories `stories/Form.js`.


## Rules

Rules are defined by an object with keys matching the different fields you have in your input. Each of those keys point to an object which contains the rules specific to this field.

For now, you only have 3 kinds of rules:
- `toStore( value )`: A function that converts the value coming from your inputs to the one you want to put in your store
- `toView( value )`: A function that converts the value coming from your store to what you want ot see in your inputs
- `validate( value )`: A function that is executed on change/submit to validate the store value and returns an array describing the different errors found


## Example: Login form with validation

```JS
import { withForm }    from 'react-quick-form';
import * as validators from './validators';


const rules =
{
    email :
    {
        validate : validators.email
    },

    password :
    {
        validate : validators.password
    }
}


function MyForm( { fields, errors, change, submit } )
{
    return (

        <form
            onChange={ e => change( e.target.name, e.target.value ) }
            onSubmit={ submit }>

            <input
                name="email"
                value={ fields.email } />
            <ul>{ errors.email }</ul>

            <input
                name="password"
                type="password"
                value={ fields.password } />
            <ul>{ errors.password }</ul>

        </form>

    );
}


export default withForm( rules )( MyForm );
```
