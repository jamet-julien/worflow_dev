


( function( APP){


  var Storage = (function _construct(){

    var _oData      = {},
        _oStock     = chrome.storage.sync,
        _sNamespace = 'workflow',
        _bLoad      = false;

    /**
     * [_init description]
     * @return {[type]} [description]
     */
    function _load( fCallBack){

      _oStock.get( _sNamespace, function( oResult) {

        if( chrome.runtime.lastError){

          console.log( chrome.runtime.lastError);

        }else{

          _bLoad = true;
          _oData[ _sNamespace ] = oResult[ _sNamespace ] || {};

          if( fCallBack){
            fCallBack.apply( APP, [ _oData[ _sNamespace ]]);
          }
        }

      });
    }

    /**
     * [_save description]
     * @return {[type]} [description]
     */
    function _save(){
      _bLoad = false;
      _oStock.set( _oData, function( ) {

        if (chrome.runtime.lastError) {

          console.log(chrome.runtime.lastError);
        }else {
          _load();
        }

      });
    }

    /**
     * [getData description]
     * @return {[type]} [description]
     */
    function getData(){
        return _oData;
    }

    /**
     * [get description]
     * @param  {[type]} sKey [description]
     * @return {[type]}      [description]
     */
    function get( sKey){
      return ( typeof _oData[_sNamespace][sKey] != 'undefined')? _oData[_sNamespace][sKey] : '';
    }

    /**
     * [unset description]
     * @param  {[type]} sKey [description]
     * @return {[type]}      [description]
     */
    function unset( sKey){
      if( typeof _oData[_sNamespace][sKey] != 'undefined'){
        delete( _oData[_sNamespace][sKey]);
        _save();
      }
    }

    /**
     * [set description]
     * @param {[type]} sKey   [description]
     * @param {[type]} sValue [description]
     */
    function set( sKey, mValue){

      _oData[_sNamespace][sKey] = mValue;
      _save();

      return oPublic;

    }

    /**
     * [start description]
     * @param  {[type]} fCallBack [description]
     * @return {[type]}           [description]
     */
    function ready( fCallBack){
      _load( fCallBack);
    }

    var oPublic = {
      ready : ready,
      get : get,
      set : set,
      unset : unset,
      getData : getData
    };

    return oPublic;

  })();


  APP.Storage = Storage;


})( window.APP || window);
