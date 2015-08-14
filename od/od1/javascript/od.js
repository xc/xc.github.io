var od = {
    tools:{ 'point': { functionName: 'drawPoint', tooltip: 'Point' },
        'line': { functionName: 'drawLine', tooltip: 'Draw line'},
        'text': {functionName: 'drawText', tooltip: 'Insert text'},
        'image': { funcitonName: 'drawImage', tooltip: 'Insert image' } },
    main: null,
    canvas: null,
    statusBar: null,

    currentTool: '',


    init: function( main, canvas, statusBar ){
        this.main = main;
        this.canvas = canvas;
        this.statusBar = statusBar;
        this.loadTools( document.getElementsByClassName( 'tool' )[0] );

        main.addEventListener( 'mousemove', function( event ){ od.mouseMove( event ) }, false );

    },

    loadTools: function( toolPanel ){
        tools = this.tools;
        for( var i in tools )
        {
            var toolDiv = document.createElement( 'div' );
            toolDiv.className = 'tool-icon';
            toolDiv.setAttribute( 'onmouseout',  'od.unhover( this, "'+i+'");' );
            toolDiv.setAttribute( 'onmouseover',  'od.hover( this, "'+i+'");' );
            toolDiv.setAttribute( 'onclick', 'od.selectTool( this, "'+i+'");' );
            toolDiv.innerHTML = '<img width="100%" src="images/icon-' + i + '.png" />';
            toolPanel.appendChild( toolDiv );
        }
    },

    unhover:function( element, toolName ){
        this.statusBar.getElementsByClassName('status')[0].innerText = '';
    },

    hover:function( element, toolName ){
        this.statusBar.getElementsByClassName('status')[0].innerText = this.tools[toolName].tooltip;
    },

    mouseMove:function( event ){
        this.showCoordinate( event );

        if( this.currentTool != '' )
        {
            var actions = this[this.tools[this.currentTool].functionName];
            actions.onmousemove( event );
        }
    },

    showCoordinate: function( event ){
        var coord = this.getCurrentCoordinate( event );
        this.statusBar.getElementsByClassName('coordinate')[0].innerText = 'X: '+coord[0]+' Y:'+coord[1];
    },

    selectTool: function( element, toolName )
    {
        element.className = 'tool-icon active';
        this.currentTool = toolName;
        if( typeof( this[this.getCurrentToolBody()].onclick ) != 'undefined' )
        {
        this.main.addEventListener( 'click', function( event ) {
                od[od.getCurrentToolBody()].onclick( event );
              } , false );
        }
    },

    /**
     *
     * onmousemove
     * onselect
     * ..
     * **/
    drawLine: {
        clickTimes:0,
        startCoord:[0, 0],

        onclick:function( event ){
            this.clickTimes ++;
            if( this.clickTimes == 1 )
            {
                var coord = od.getCurrentCoordinate( event );
                this.startCoord = coord;
            }

            if( this.clickTimes == 2 )
            {
                var context = canvas.getContext( '2d' );
                context.beginPath();
                context.translate(0.5, 0.5);
                context.imageSmoothingEnabled = false;
                var coord = od.getCurrentCoordinate( event );
                context.moveTo( this.startCoord[0], this.startCoord[1] );
                context.lineTo( coord[0], coord[1] );
                context.strokeStyle = "#ff0000";
                context.stroke();

                this.clickTimes = 0;
            }

        },

        onmousemove: function( event ) {
//            var context = canvas.getContext( '2d' );
//            var coord = od.getCurrentCoordinate( event );
//            context.stroke();
            }
    },


    getCurrentCoordinate:function( event )
    {
        var rect = od.main.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return [x, y];
    },


    getCurrentToolBody: function()
    {
        return this.tools[this.currentTool].functionName;
    }

};