class Validation
{
    constructor( operation, params, previous )
    {
        this.operation = operation;
        this.params    = params;
        this.previous  = previous;
    }


    _rule( { predicate, message }, value )
    {
        return !predicate( value )
            ? message
            : null;
    }


    _oneOf( { predicates, message }, value )
    {
        return !predicates.map( predicate => predicate( value ) ).some( Boolean )
            ? message
            :null;
    }


    rule( predicate, message )
    {
        return new Validation( 'rule', { predicate, message }, this );
    }


    oneOf( predicates, message )
    {
       return new Validation( 'oneOf', { predicates, message }, this );
    }


    required( message )
    {
        return new Validation( 'required', message, this );
    }


    validate = ( value ) =>
    {
        if ( this.operation === 'required' )
        {
            return Boolean( value )
                ? this.previous.validate( value )
                : [this.params];
        }
        else if ( !value || !this.previous )
        {
            return [];
        }

        const operation = this[`_${ this.operation }`]
        const result    = operation( this.params, value );
        const results   = [...this.previous.validate( value ), result];

        return results.filter( Boolean );
    }
}


export default function validation()
{
    return new Validation();
}

