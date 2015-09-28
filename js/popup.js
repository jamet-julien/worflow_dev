(function( APP){

    APP.Storage.ready( function(){

        var sToken = APP.Storage.get('token');

        APP.ctrlPrincipal = new APP.Interface( APP.Popup);
        APP.ctrlMenu      = new APP.Interface( APP.Menu);
        APP.ctrlPage      = new APP.Interface( APP.Page);

        if( sToken === ''){
            APP.ctrlPrincipal.active( 'connect');
            APP.ctrlMenu.active( 'unlogged');
        }else{
            APP.Ajax.setToken( sToken);
            APP.ctrlPrincipal.active( 'page');
            APP.ctrlMenu.active( 'logged');
        }

    });

    var oBtn = document.getElementById( 'btn-dashboard');

    oBtn.addEventListener( 'click', function(){
        window.open( chrome.extension.getURL('dashboard.html'));
    });


})( window.APP || window);