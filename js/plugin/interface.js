

(function( APP){

    var Interface =  function( oCtrl){

       this._sDefault = 'parent';
       this._oCtrl    = oCtrl;

    };
        /**
         * [_execSingle description]
         * @param  {[type]} sAction  [description]
         * @param  {[type]} sSection [description]
         * @return {[type]}          [description]
         */
        Interface.prototype._exec = function ( sAction, sSection, args){

            var _args = args || [];

            if( typeof this._oCtrl[ sSection ] == 'undefined'){
                sSection = this._sDefault;
            }

            if( typeof this._oCtrl[ sSection ][ sAction ] != 'undefined'){
                this._oCtrl[ sSection ][ sAction ].apply(  this._oCtrl[ sSection ], _args);
            }else{
                this._oCtrl[ this._sDefault ][ sAction ].apply(  this._oCtrl[ sSection ], _args);
            }

        };

         /**
         * [_execSingle description]
         * @param  {[type]} sAction  [description]
         * @param  {[type]} sSection [description]
         * @return {[type]}          [description]
         */
        Interface.prototype._execMulti = function ( sAction, fCallBack){
            var sSection;
            for( sSection in this._oCtrl){
                if( sSection != this._sDefault){

                    this._exec( sAction, sSection);
                }
            }

            if( fCallBack){
                fCallBack.apply(null);
            }
        };



        /**
         * [active description]
         * @return {[type]} [description]
         */
        Interface.prototype.active = function ( sSection){
            var that = this;
            this._execMulti( 'disable', function(){
                that._exec( 'active', sSection);
            });

            return this;

        };

        /**
         * [setDataPage description]
         * @param {[type]} sSection [description]
         * @param {[type]} sPage    [description]
         * @param {[type]} mValue   [description]
         */
        Interface.prototype._setData = function ( sSection, sKey, mValue){

            this._oCtrl[ sSection ].setData.apply(  this._oCtrl[ sSection ], [ sKey, mValue ]);
            return this;
        };

         /**
         * [setDataPage description]
         * @param {[type]} sSection [description]
         * @param {[type]} sPage    [description]
         * @param {[type]} mValue   [description]
         */
        Interface.prototype.setData = function ( sSection, sKey, mValue){

            this._exec( 'setData', sSection, [sKey, mValue]);

            return this;
        };

        /**
         * [setDataPage description]
         * @param {[type]} sSection [description]
         * @param {[type]} sPage    [description]
         * @param {[type]} mValue   [description]
         */
        Interface.prototype.exec = function( sAction, sSection, aArg){

            this._exec( sAction, sSection, aArg);

            return this;
        };



    APP.Interface = Interface;


})( window.APP|| window);
