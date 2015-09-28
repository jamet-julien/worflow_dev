(function( APP){

    APP.Storage.ready( function(){

        var sToken = APP.Storage.get('token');

        APP.ctrlPrincipal = new APP.Interface( APP.Dashboard);
        APP.ctrlMenu      = new APP.Interface( APP.Menu);
        APP.ctrlPage      = new APP.Interface( APP.Project);

        if( sToken === ''){

            APP.ctrlPrincipal.active( 'connect');
            APP.ctrlMenu.active( 'unlogged');

        }else{

            APP.Ajax.setToken( sToken);
            APP.ctrlPrincipal.active( 'page');
            APP.ctrlMenu.active( 'logged');

        }

    });



})( window.APP || window);