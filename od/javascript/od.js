

var od = {
    canvas: function(){
        return document.getElementsByClassName('canvas')[0];
    },

    context: function(){
        return this.canvas().getContext( '2d' );
    },
    
    getCurrentCoordinate:function( event )
    {
        var rect = this.canvas().getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return [x, y];
    }
};

var line = {

    mousemove:function( event ){
        var context = lineCanvas.getContext( '2d' );
        var coord = od.getCurrentCoordinate( event );                         
        lineData[2] = coord[0];
        lineData[3] = coord[1];
        console.log( lineData );
        context.clearRect( 0, 0, 1500, 600 );
        line.draw( context, lineData, 0.2 );
    },

    draw:function( context, data, width )
    {
        context.beginPath();
        context.moveTo( data[0], data[1] );
        context.lineTo( data[2], data[3] );
        context.closePath();
        context.lineWidth=width;
        context.stroke();
    }

};


function main()
{
    document.onclick=function( event ){
        clickTimes++;
        if( clickTimes == 1 )
        {
            var coord = od.getCurrentCoordinate( event );
            lineData[0] = coord[0];
            lineData[1] = coord[1];

            lineCanvas = document.getElementsByClassName( 'canvas_move' )[0];
            lineCanvas.addEventListener( 'mousemove', line.mousemove, false );
        }

        if( clickTimes == 2 )
        {
            var context = lineCanvas.getContext( '2d' );
            context.clearRect( 0, 0, 800, 600 );

            lineCanvas.removeEventListener( 'mousemove', line.mousemove );
            line.draw( od.context(), lineData, 0.4 );
            clickTimes = 0;
        }
    };




}

main();
var lineCanvas;
var lineData = [0, 0, 0, 0];
var clickTimes = 0;