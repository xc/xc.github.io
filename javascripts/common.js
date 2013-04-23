//
function loadFile( file, container )
{
    $(document).ready(function(){
        $.get( file,function(data,status){
            $( "#"+container ).html( data );
        });
    });

}


var uri = location.href;
var index = uri.indexOf( '?' );

if( index != -1 )
{
var anchor = uri.substring( index+1 );

loadFile( anchor+".txt", 'loaded_content' );
}