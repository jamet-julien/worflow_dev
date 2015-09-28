


( function( APP){


    APP.Dashboard = APP.Dashboard || {};

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
                console.log( 'Space IDDOM : '+this.idDom);
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
                console.log( 'Space IDDOM : '+this.idDom);
            }
        }

        var oPublic = {
            idDom : _idDom,
            active : active,
            disable : disable
        };

        return oPublic;

    })();

/*****************************************************
     .o88b.  .d88b.  d8b   db d8b   db d88888b  .o88b. d888888b
    d8P  Y8 .8P  Y8. 888o  88 888o  88 88'     d8P  Y8 `~~88~~'
    8P      88    88 88V8o 88 88V8o 88 88ooooo 8P         88
    8b      88    88 88 V8o88 88 V8o88 88~~~~~ 8b         88
    Y8b  d8 `8b  d8' 88  V888 88  V888 88.     Y8b  d8    88
     `Y88P'  `Y88P'  VP   V8P VP   V8P Y88888P  `Y88P'    YP
*****************************************************/
    var connect = ( function _construct(){
        var _idDom = 'connect';

        /**
         * [_sendConnect description]
         * @return {[type]} [description]
         */
        function _sendConnect(){
            APP.Ajax.setData({

                email    : document.getElementById( 'log-email').value,
                password : document.getElementById( 'log-password').value

            }).send({

                url    : APP.urlApi + 'connect.json',
                method : "POST"

            }, function( oData){

                if( oData.status == 'success'){//connection OK

                    APP.Ajax.setToken( oData.data);// upadte Ajax request
                    APP.Storage.set( 'token',  oData.data);// sauvegarde du token en local storage

                    APP.ctrlPrincipal.active( 'page');
                    APP.ctrlMenu.active( 'logged');
                }

            });
        }

        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);

            APP.Storage.unset( 'token');

            var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.addEventListener( 'click', _sendConnect);

        }

        /**
         * [disable description]
         * @return {[type]} [description]
         */

        function disable(){
            parent.disable.apply( oPublic, []);
            document.getElementById( 'log-email').value    = '';
            document.getElementById( 'log-password').value = '';

            var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.removeEventListener( 'click', _sendConnect);
        }

        var oPublic = {
            idDom : _idDom,
            active: active,
            disable : disable
        };

        return oPublic;

    })();

/*****************************************************
    d8888b.  .d8b.   d888b  d88888b
    88  `8D d8' `8b 88' Y8b 88'
    88oodD' 88ooo88 88      88ooooo
    88~~~   88~~~88 88  ooo 88~~~~~
    88      88   88 88. ~8~ 88.
    88      YP   YP  Y888P  Y88888P
*****************************************************/

     var page = ( function _construct(){
        var _idDom = 'page',
            _sUrl  = '';

        /**
         * [_showProjectList description]
         * @return {[type]} [description]
         */
        function _showProjectList(){


            APP.Ajax.setData().send({

                url    : APP.urlApi + 'project.json',
                method : "GET"

            }, function( oData){

                if( oData.status == 'success'){//connection OK

                    APP.ctrlPage.setData( 'lire', 'project', oData.data)
                                 .setData( 'lire', 'parent', oPublic)
                                 .active( 'lire');

                }
            });

        }

        /**
         * [ajouterPage description]
         * @param  {[type]} oProject [description]
         * @return {[type]}          [description]
         */
        function ajouterPage( oProject){


            APP.Ajax.setData({

                url              : _sUrl,
                project_serial   : oProject.serial

            }).send({

                url    : APP.urlApi + 'page.json',
                method : "POST"

            }, function( oData){

                if( oData.status == 'success'){//connection OK
                    APP.ctrlPage.setData( 'lire', 'page', oData.data)
                                 .setData( 'lire', 'parent', oPublic)
                                 .active( 'lire');
                }
            });
        }

        /**
         * [supprimerTache description]
         * @return {[type]} [description]
         */
        function updateTache( sSerialTache){

            APP.Ajax.setData({
                status : '1'
            }).send({

                    url    : APP.urlApi + 'tache/' + sSerialTache + '.json',
                    method : "POST"

                }, function( oData){

                    if( oData.status == 'success'){//connection OK
                       _showProjectList();
                    }
                });

        }

        /**
         * [ajouterPage description]
         * @param  {[type]} oProject [description]
         * @return {[type]}          [description]
         */
        function ajouterTache( oPage, sTache){

            APP.Ajax.setData({

                nom            : sTache,
                page_serial    : oPage.serial

            }).send({

                url    : APP.urlApi + 'tache.json',
                method : "POST"

            }, function( oData){

                if( oData.status == 'success'){//connection OK
                    _showProjectList();
                }
            });

        }

        /**
         * [readInfoTache description]
         * @param  {[type]} sSerial [description]
         * @return {[type]}         [description]
         */
        function readInfoTache( sSerial){
             APP.Ajax.setData({}).send({

                url    : APP.urlApi + 'project/' + sSerial + '/tache.json',
                method : "GET"

            }, function( oData){

                if( oData.status == 'success'){//connection OK
                    APP.ctrlPage.setData( 'lire', 'tache', oData.data)
                                 .setData( 'lire', 'parent', oPublic)
                                 .exec( 'showTache', 'lire', []);
                }
            });

        }

        /**
         * [deleteProject description]
         * @param  {[type]} sSerial [description]
         * @return {[type]}         [description]
         */
        function deleteProject( sSerial){
             APP.Ajax.setData({}).send({

                url    : APP.urlApi + 'project/' + sSerial + '.json',
                method : "DELETE"

            }, function( oData){

                if( oData.status == 'success'){//connection OK
                   _showProjectList();
                }
            });

        }

         /**
         * [deleteProject description]
         * @param  {[type]} sSerial [description]
         * @return {[type]}         [description]
         */
        function deleteTache( sSerial, oDom){
             APP.Ajax.setData({}).send({

                url    : APP.urlApi + 'tache/' + sSerial + '.json',
                method : "DELETE"

            }, function( oData){

                if( oData.status == 'success'){//connection OK
                   oDom.parentNode.removeChild( oDom);
                }
            });

        }

        /**
         * [ajouterProjet description]
         * @param  {[type]} oProject [description]
         * @return {[type]}          [description]
         */
        function ajouterProjet( sNom){

            APP.Ajax.setData({

                nom    : sNom

            }).send({

                url    : APP.urlApi + 'project.json',
                method : "POST"

            }, function( oData){
                if( oData.status == 'success'){//connection OK
                    _showProjectList();
                }
            });

        }

        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);
            _showProjectList();

        }

        var oPublic = {
            idDom         : _idDom,
            active        : active,
            ajouterPage   : ajouterPage,
            ajouterTache  : ajouterTache,
            updateTache   : updateTache,
            ajouterProjet : ajouterProjet,
            deleteProject : deleteProject,
            deleteTache   : deleteTache,
            readInfoTache : readInfoTache
        };

        return oPublic;

    })();

/*****************************************************
    .d8888. db    db d8888b. .d8888.  .o88b. d8888b. d888888b d8888b. d88888b
    88'  YP 88    88 88  `8D 88'  YP d8P  Y8 88  `8D   `88'   88  `8D 88'
    `8bo.   88    88 88oooY' `8bo.   8P      88oobY'    88    88oooY' 88ooooo
      `Y8b. 88    88 88~~~b.   `Y8b. 8b      88`8b      88    88~~~b. 88~~~~~
    db   8D 88b  d88 88   8D db   8D Y8b  d8 88 `88.   .88.   88   8D 88.
    `8888Y' ~Y8888P' Y8888P' `8888Y'  `Y88P' 88   YD Y888888P Y8888P' Y88888P
*****************************************************/
     var subscribe = ( function _construct(){
        var _idDom = 'subscribe';

        /**
         * [_sendConnect description]
         * @return {[type]} [description]
         */
        function _sendSubscribe(){
            APP.Ajax.setData({

                email    : document.getElementById( 'sub-email').value,
                pseudo   : document.getElementById( 'sub-pseudo').value,
                password : document.getElementById( 'sub-password').value

            }).send({

                url    : APP.urlApi + 'membre.json',
                method : "POST"

            }, function( oData){

                if( oData.status == 'success'){//connection OK

                    APP.Ajax.setToken( oData.data);// upadte Ajax request
                    APP.Storage.set( 'token',  oData.data);// sauvegarde du token en local storage

                    APP.ctrlPrincipal.active( 'page');
                    APP.ctrlMenu.active( 'logged');
                }

            });
        }

         /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);

            APP.Storage.unset( 'token');

            var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.addEventListener( 'click', _sendSubscribe);

        }

         /**
         * [disable description]
         * @return {[type]} [description]
         */

        function disable(){
            parent.disable.apply( oPublic, []);
            document.getElementById( 'sub-email').value    = '';
            document.getElementById( 'sub-pseudo').value = '';
            document.getElementById( 'sub-password').value = '';

            var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.removeEventListener( 'click', _sendSubscribe);
        }

        var oPublic = {
            idDom : _idDom,
            active : active,
            disable : disable
        };

        return oPublic;

    })();

    APP.Dashboard.parent    = parent;
    APP.Dashboard.connect   = connect;
    APP.Dashboard.page      = page;
    APP.Dashboard.subscribe = subscribe;

})( window.APP || window);