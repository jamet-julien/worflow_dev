


( function( APP){


    APP.Page = APP.Page || {};

   /**
    * [_construct description]
    * @param  {String} ){                     var _idDom [description]
    * @return {[type]}     [description]
    */
    var parent = ( function _construct(){
        var _idDom = '',
            _oData = {};
        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){

            try {
                document.getElementById( this.idDom).style.display = 'block';
            } catch (e) {
                console.log( 'Page IDDOM : '+this.idDom);
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
                console.log( 'Page IDDOM : '+this.idDom);
            }
        }

                /**
         * [setData description]
         * @param {[type]} sKey   [description]
         * @param {[type]} mValue [description]
         */
        function setData( sKey, mValue){
            this.oData[sKey] = mValue;
        }

        var oPublic = {
            oData : _oData,
            idDom : _idDom,
            active : active,
            disable : disable,
            setData : setData
        };

        return oPublic;

    })();

/*****************************************************************
     .d8b.     d88b  .d88b.  db    db d888888b d88888b d8888b.
    d8' `8b    `8P' .8P  Y8. 88    88 `~~88~~' 88'     88  `8D
    88ooo88     88  88    88 88    88    88    88ooooo 88oobY'
    88~~~88     88  88    88 88    88    88    88~~~~~ 88`8b
    88   88 db. 88  `8b  d8' 88b  d88    88    88.     88 `88.
    YP   YP Y8888P   `Y88P'  ~Y8888P'    YP    Y88888P 88   YD
 ****************************************************************/
    var ajouter = ( function _construct(){
        var _idDom = 'page-ajouter',
            _oData = {};


        function _ajouterProjet(){
            var sNom = document.getElementById('project-nom').value;
            _oData.parent.ajouterProjet( sNom);
            document.getElementById('project-nom').value = '';
        }

        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            parent.active.apply( oPublic, []);

            var oWrapper      = document.getElementById( 'project-wrapper'),
                sTemplate     = document.getElementById( 'list-project').innerHTML,
                oTemplate     = new Template( sTemplate),
                sTemplateHtml = '',
                sKey;

            for( sKey in _oData.project){

                var oList       = document.createElement('p');
                oList.innerHTML = oTemplate.compute( _oData.project[ sKey ]);

                oList.addEventListener( 'click', (function( oObject){

                        return function(){
                           _oData.parent.ajouterPage( oObject);
                        };

                    })( _oData.project[ sKey ]));


                oWrapper.appendChild( oList);
            }

            var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.addEventListener( 'click', _ajouterProjet);

        }

        function disable(){
            parent.disable.apply( oPublic, []);
            document.getElementById( 'project-wrapper').innerHTML = '';
        }

        var oPublic = {
            idDom : _idDom,
            oData : _oData,
            active : active,
            disable : disable
        };

        return oPublic;

    })();

/*****************************************************************
    db      d888888b d8888b. d88888b
    88        `88'   88  `8D 88'
    88         88    88oobY' 88ooooo
    88         88    88`8b   88~~~~~
    88booo.   .88.   88 `88. 88.
    Y88888P Y888888P 88   YD Y88888P
 ****************************************************************/
    var lire = ( function _construct(){
        var _idDom = 'page-lire',
            _oData = {};



        /**
         * [_ajouterTache description]
         * @return {[type]} [description]
         */
        function _ajouterTache(){
            var sNom = document.getElementById('tache-nom').value;
            _oData.parent.ajouterTache( _oData.page, sNom);
            document.getElementById('tache-nom').value = '';
        }

        /**
         * [_updateBadge description]
         * @param  {[type]} iNum [description]
         * @return {[type]}      [description]
         */
        function _updateBadge( iNum){

            chrome.browserAction.setBadgeText( {text : iNum+''});

        }

        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){

            /**
             * DISPLAY
             */
            var oWrapper       = document.getElementById( 'page-wrapper'),
                oWrapperTache  = document.getElementById( 'tache-wrapper'),
                sTemplate      = document.getElementById( 'info-page').innerHTML,
                sTemplateTache = document.getElementById( 'list-tache').innerHTML,
                oTemplate      = new Template( sTemplate),
                oTemplateTache = new Template( sTemplateTache),
                sTemplateHtml  = '',
                aTache         = _oData.page.tache,
                i              = 0,
                iOpen          = 0;



            for( i = 0 ; i < aTache.length; i++){

                var oTache      = aTache[i];
                var oList       = document.createElement('span');
                oList.innerHTML = oTemplateTache.compute( oTache);

                if( oTache.status == 'open'){
                    iOpen++;
                }

                oList.addEventListener( 'click', ( function( oObject){

                    return function(){
                      _oData.parent.updateTache( oObject.serial);
                    };

                })( oTache));



                oWrapperTache.appendChild( oList);
            }

            //chrome.browserAction.setIcon({path:"block.png"});//changement d'icon de la page

            oWrapper.innerHTML = oTemplate.compute( _oData.page);
            _updateBadge( iOpen);

            /**
             * FORM
             */
             var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.addEventListener( 'click', _ajouterTache);

            parent.active.apply( oPublic, []);

        }

        /**
         * [disable description]
         * @return {[type]} [description]
         */
        function disable(){
            parent.disable.apply( oPublic, []);
            document.getElementById( 'page-wrapper').innerHTML = '';
            document.getElementById( 'tache-wrapper').innerHTML = '';
        }

        var oPublic = {
            oData : _oData,
            idDom : _idDom,
            active : active,
            disable : disable
        };

        return oPublic;

    })();

    APP.Page.parent    = parent;
    APP.Page.ajouter   = ajouter;
    APP.Page.lire      = lire;

})( window.APP || window);