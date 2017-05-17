import validation from 'validation-chain';


function isEmail( value='' )
{
    return /^[\w\-\.]+\@[\w\-]+\.[\w]+$/.test( value );
}


function minLength( length )
{
    return ( value='' ) => ( value.length >= length );
}


function isZero( value )
{
    return value == 0;
}


function isPixel( value )
{
    return /^[0-9\.]+px$/.test( value );
}


function isPercent( value )
{
    return /^[0-9]+%$/.test( value );
}


function contains( str )
{
    return ( value='' ) => value.includes( str );
}


export const email = validation()
    .rule( isEmail, 'Must be a valid email address' )
    .required( 'Email is required' );


export const password = validation()
    .rule( contains( 'ha' ), 'Must contain ha' )
    .rule( minLength( 5 ), 'Must have at least 5 characters' )
    .required( 'Password is required' );


export const pixel = validation()
    .rule( isPixel, 'Must be a pixel value' );


export const pixelPercent = validation()
    .oneOf( [isZero, isPixel, isPercent], 'Must be 0, a pixel or a percent value' )
    .required( 'Pixelpercent required' );

