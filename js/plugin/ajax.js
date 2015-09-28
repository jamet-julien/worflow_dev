
( function( APP){


  var Ajax = ( function _construct(){

    var _oHttp   = null,
        _oData  = {},
        _sToken = null;

    /**
     * [_init description]
     * @return {[type]} [description]
     */
    function _init(){

      if (window.XMLHttpRequest || window.ActiveXObject) {
         if (window.ActiveXObject) {
             try {
                 _oHttp = new ActiveXObject("Msxml2.XMLHTTP");
             } catch(e) {
                 _oHttp = new ActiveXObject("Microsoft.XMLHTTP");
             }
         } else {
              _oHttp = new XMLHttpRequest();
          }
      } else {
          return null;
      }
    }

    /**
     * [_buildFormData description]
     * @param  {[type]} aData [description]
     * @return {[type]}       [description]
     */
    function _buildFormData( aData){
        var oFormData = new FormData(), key;

        for (key in aData) {
            oFormData.append( key, aData[key]);
        }

        return oFormData;
    }

    /**
     * [setToken description]
     * @param {[type]} _sToken [description]
     */
    function setToken( sToken){
      _sToken = sToken;
      return oPublic;
    }

    /**
     * [send description]
     * @param  {[type]} sUrl    [description]
     * @param  {[type]} sData   [description]
     * @param  {[type]} sMethod [description]
     * @return {[type]}         [description]
     */
    function send( oParam, fCallBack){

      _oHttp.onreadystatechange = function() {
        if (_oHttp.readyState == 4 &&
           (_oHttp.status == 200 || _oHttp.status === 0)
        ) {
                _oData = {};
                fCallBack.apply( APP, [JSON.parse( _oHttp.responseText)]);
        }
      };

      var sUrl = ( _sToken === null)? oParam.url : oParam.url+'?token='+_sToken;

      _oHttp.open( oParam.method || "GET", sUrl, true);

      var oFormData = _buildFormData( _oData);
      _oHttp.send( oFormData);
    }

    /**
     * [setData description]
     * @param {[type]} _aData [description]
     */
    function setData( oData){
      _oData = oData;
      return oPublic;
    }


    _init();

    var oPublic = {
      send     : send,
      setToken : setToken,
      setData  : setData
    };

    return oPublic;

  })();

  APP.Ajax = Ajax;



})(window.APP || window);