'use strict';var _exports;function init(){const a=require('../../../lib/react.js');require('../../../lib/react-dom.js');const b=require('../../../stores/webviewStores.js'),c=require('../../../weapp/utils/tools'),d=a.createClass({displayName:'Toast',getInitialState:function(){return{title:'',icon:'success',hidden:!0,lazyLoaded:!1}},componentDidMount:function(){b.on('SEND_AS_SDK',this._handleAssdkCommand)},componentWillUnmount:function(){b.removeListener('SEND_AS_SDK',this._handleAssdkCommand)},componentWillReceiveProps:function(e){e.webviewID!=this.__showOnWebviewID&&this.setState({hidden:!0})},_handleAssdkCommand:function(e,f,g){let{args:h}=f;'showToast'===e?(this.__showOnWebviewID=this.props.webviewID,this.setState({title:h.title||'',image:h.image||'',icon:h.icon||'success',hideMask:!h.mask,hidden:!1,lazyLoaded:!0}),this.hiddenTimeId=setTimeout(this.hide,h.duration||1500),g({errMsg:'showToast:ok'})):'hideToast'==e&&(clearTimeout(this.hiddenTimeId),this.hide(),g({errMsg:'hideToast:ok'}))},getIconClass:function(){return this.state.image?'wx-toast-image-icon':`wx-toast-icon wx-icon-${this.state.icon}`},hide:function(){this.setState({hidden:!0})},render:function(){if(!this.state.lazyLoaded)return null;let e={fontSize:'55px',color:'#ffffff',display:'block'};return this.state.image&&(e.backgroundImage=`url(${c.getUrlFromFilePath(this.props.project,this.state.image)})`),a.createElement('div',{style:{display:this.state.hidden?'none':'block'}},a.createElement('div',{className:'wx-toast-mask',style:{display:this.state.hideMask?'none':'block'}}),a.createElement('div',{className:'wx-toast'},a.createElement('i',{className:this.getIconClass(),style:e}),a.createElement('p',{className:'wx-toast-content'},this.state.title)))}});_exports=d}init(),module.exports=_exports;