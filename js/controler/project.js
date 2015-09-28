


( function( APP){


    APP.Project = APP.Project || {};

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
    db      d888888b d8888b. d88888b
    88        `88'   88  `8D 88'
    88         88    88oobY' 88ooooo
    88         88    88`8b   88~~~~~
    88booo.   .88.   88 `88. 88.
    Y88888P Y888888P 88   YD Y88888P
 ****************************************************************/
    var lire = ( function _construct(){
        var _idDom = 'project-lire',
            _oData = {};


        function _ajouterProjet(){
            var sNom = document.getElementById('project-nom').value;
            _oData.parent.ajouterProjet( sNom);
            document.getElementById('project-nom').value = '';
        }

        /**
         * [showTache description]
         * @return {[type]} [description]
         */
        function showTache(){
            /**
             * DISPLAY
             */
            var oWrapperList  = document.getElementById( 'tache-wrapper'),

                sTemplateList = document.getElementById( 'list-tache').innerHTML,

                oTemplateList  = new Template( sTemplateList),
                sTemplateHtml  = '',
                aTache       = _oData.tache,
                i              = 0,
                iOpen          = 0;

            oWrapperList.innerHTML = '';

            for( i = 0 ; i < aTache.length; i++){

                var oItem      = aTache[i];
                var oList       = document.createElement('span');
                oList.innerHTML = oTemplateList.compute( oItem);

                 oList.querySelector('.btn-show').addEventListener( 'click', ( function( oObject){

                    return function(){
                      window.open( oObject.url);
                    };

                })( oItem));

                oList.querySelector('.btn-sup').addEventListener( 'click', ( function( oObject){

                    return function(){
                      _oData.parent.deleteTache( oObject.serial, this.parentNode.parentNode);
                    };

                })( oItem));

                oWrapperList.appendChild( oList);
            }

        }

        /**
         * [active description]
         * @return {[type]} [description]
         */
        function active(){
            /**
             * DISPLAY
             */
            var oWrapperList  = document.getElementById( 'project-wrapper'),

                sTemplateList = document.getElementById( 'list-project').innerHTML,

                oTemplateList  = new Template( sTemplateList),
                sTemplateHtml  = '',
                aProject       = _oData.project,
                i              = 0,
                iOpen          = 0;


            for( i = 0 ; i < aProject.length; i++){

                var oItem      = aProject[i];
                var oList       = document.createElement('span');
                oList.innerHTML = oTemplateList.compute( oItem);

                oList.querySelector('.btn-show').addEventListener( 'click', ( function( oObject){

                    return function(){
                        var aCurrent = document.querySelectorAll('.current');

                        if( aCurrent[0]){
                            aCurrent[0].classList.remove('current');
                        }

                        this.parentNode.classList.add('current');
                      _oData.parent.readInfoTache( oObject.serial);
                    };

                })( oItem));

                 oList.querySelector('.btn-sup').addEventListener( 'click', ( function( oObject){

                    return function(){
                       _oData.parent.deleteProject( oObject.serial);
                    };

                })( oItem));


                oWrapperList.appendChild( oList);
            }

            /**
             * FORM
             */
             var oBtn = document.getElementById( this.idDom).querySelector('button');
            oBtn.addEventListener( 'click', _ajouterProjet);

            document.getElementById( this.idDom).style.display = 'table';

        }

        /**
         * [disable description]
         * @return {[type]} [description]
         */
        function disable(){
            parent.disable.apply( oPublic, []);
            document.getElementById( 'project-wrapper').innerHTML = '';
            document.getElementById( 'tache-wrapper').innerHTML = '';
        }

        var oPublic = {
            oData : _oData,
            idDom : _idDom,
            active : active,
            showTache : showTache,
            disable : disable
        };

        return oPublic;

    })();

    APP.Project.parent    = parent;
    //APP.Project.info      = info;
    APP.Project.lire      = lire;

})( window.APP || window);