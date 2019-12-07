'use strict';

var _warn = require('./utils/warn');

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://developers.google.com/tag-manager/quickstart

var Snippets = {
	tags: function tags(_ref) {
		var id = _ref.id,
		    events = _ref.events,
		    dataLayer = _ref.dataLayer,
		    dataLayerName = _ref.dataLayerName,
		    preview = _ref.preview,
		    auth = _ref.auth,
		    noAutoRun = _ref.noAutoRun;

		var gtm_auth = '&gtm_auth=' + auth;
		var gtm_preview = '&gtm_preview=' + preview;

		if (!id) (0, _warn2.default)('GTM Id is required');

		var frameSrc = noAutoRun ? 'src="javascript:;" data-src="https://www.googletagmanager.com/ns.html?id=' + id + gtm_auth + gtm_preview + '&gtm_cookies_win=x"' : 'src="https://www.googletagmanager.com/ns.html?id=' + id + gtm_auth + gtm_preview + '&gtm_cookies_win=x"';

		var iframe = '\n\t\t<iframe ' + frameSrc + '\n\t\t\theight="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>\n\t\t';
		var scriptSrc = noAutoRun ? 'j.src=\'javascript:;\';j.setAttribute(\'data-src\',\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl+\'' + gtm_auth + gtm_preview + '&gtm_cookies_win=x\')' : 'j.src=\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl+\'' + gtm_auth + gtm_preview + '&gtm_cookies_win=x\';';

		var script = '\n\t\t(function(w,d,s,l,i){w[l]=w[l]||[];\n\t\t\tw[l].push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\', ' + JSON.stringify(events).slice(1, -1) + '});\n\t\t\tvar f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';\n\t\t\tj.id=\'gtm\';j.async=true;' + scriptSrc + '\n\n\t\t\tj.addEventListener(\'load\', function(e) {\n\t\t\t\tvar _ge = new CustomEvent(\'gtm_loaded\', { event:e, bubbles: true });\n\t\t\t\td.dispatchEvent(_ge);\n\t\t\t});\n\n\t\t\tj.addEventListener(\'error\', function(e) {\n\t\t\t\tvar _ge = new CustomEvent(\'gtm_error\', { event:e, bubbles: true });\n\t\t\t\td.dispatchEvent(_ge);\n\t\t\t});\n\t\t\t\n\t\t\tf.parentNode.insertBefore(j,f);\n\t\t})(window,document,\'script\',\'' + dataLayerName + '\',\'' + id + '\');\n\t\t';

		var dataLayerVar = this.dataLayer(dataLayer, dataLayerName);

		return {
			iframe: iframe,
			script: script,
			dataLayerVar: dataLayerVar
		};
	},
	dataLayer: function dataLayer(_dataLayer, dataLayerName) {
		return '\n\t\twindow.' + dataLayerName + ' = window.' + dataLayerName + ' || [];\n\t\twindow.' + dataLayerName + '.push(' + JSON.stringify(_dataLayer) + ')';
	}
};

module.exports = Snippets;