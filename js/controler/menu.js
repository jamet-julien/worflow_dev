


( function( APP){


    APP.Menu = APP.Menu || {};

   /**
    * [_construct description]
    * @param  {String} ){                     var _idDom [description]
    * @return {[type]}     [description]
    */
    var parent = ( function _construct(){
        var _idDom = '';

        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){

            try {
                document.getElementById( this.idDom).style.display = 'block';
            } catch (e) {
                console.log( 'Menu IDDOM : '+this.idDom);
            }
        }

        /**
         * [disable description]
         * @return {[type]} [description]
         */
        function disable(){

            try {
                document.getElementById( this.idDom).style.display = 'none';
            } catch (e) {
                console.log( 'Menu IDDOM : '+this.idDom);
            }
        }

        var oPublic = {
            idDom   : _idDom,
            active  : active,
            disable : disable
        };

        return oPublic;

    })();

    /**
     * [_construct description]
     * @param  {String} ){                     var _idDom [description]
     * @return {[type]}     [description]
     */
    var logged = ( function _construct(){
        var _idDom = 'tool-logged';

        /**
         * [_deconnect description]
         * @return {[type]} [description]
         */
        function _deconnect(){
            APP.ctrlPrincipal.active( 'connect');
            APP.ctrlMenu.active( 'unlogged');
        }


        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);

            var oBtn = document.getElementById( 'tool-logged');
            oBtn.addEventListener( 'click', _deconnect);
        }

        var oPublic = {
            idDom : _idDom,
            active: active
        };

        return oPublic;

    })();

    /**
     * [_construct description]
     * @param  {String} ){                     var _idDom [description]
     * @return {[type]}     [description]
     */
     var unlogged = ( function _construct(){
        var _idDom = 'tool-unlogged';

        /**
         * [_deconnect description]
         * @return {[type]} [description]
         */
        function _subscribe(){
            APP.ctrlPrincipal.active( 'subscribe');
            APP.ctrlMenu.active( 'connect');
        }

         /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);

            var oBtn = document.getElementById( 'btn-subscribe');
            oBtn.addEventListener( 'click', _subscribe);
        }

        var oPublic = {
            idDom : _idDom,
            active : active
        };

        return oPublic;

    })();

    /**
     * [_construct description]
     * @param  {String} ){                     var _idDom [description]
     * @return {[type]}     [description]
     */
     var connect = ( function _construct(){
        var _idDom = 'tool-connect';

        /**
         * [_deconnect description]
         * @return {[type]} [description]
         */
        function _connect(){
            APP.ctrlPrincipal.active( 'connect');
            APP.ctrlMenu.active( 'unlogged');
        }

         /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);

            var oBtn = document.getElementById( 'btn-logged');
            oBtn.addEventListener( 'click', _connect);
        }

        var oPublic = {
            idDom : _idDom,
            active : active
        };

        return oPublic;

    })();


    APP.Menu.parent    = parent;
    APP.Menu.logged    = logged;
    APP.Menu.unlogged  = unlogged;
    APP.Menu.connect   = connect;

})( window.APP || window);