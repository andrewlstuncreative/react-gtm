import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart

const Snippets = 
{
	tags: function({ 
		id,
		events,
		dataLayer,
		dataLayerName,
		preview,
		auth,
		noAutoRun 
	}) {
		const gtm_auth = `&gtm_auth=${auth}`
		const gtm_preview = `&gtm_preview=${preview}`

		if(!id)
			warn('GTM Id is required')
		
		let frameSrc = noAutoRun ?
			`src="javascript:;" data-src="https://www.googletagmanager.com/ns.html?id=${id}${gtm_auth}${gtm_preview}&gtm_cookies_win=x"` :
			`src="https://www.googletagmanager.com/ns.html?id=${id}${gtm_auth}${gtm_preview}&gtm_cookies_win=x"`
		
		const iframe = `
		<iframe ${frameSrc}
			height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>
		`
		let scriptSrc = noAutoRun ?
			`j.src='javascript:;';j.setAttribute('data-src','https://www.googletagmanager.com/gtm.js?id='+i+dl+'${gtm_auth}${gtm_preview}&gtm_cookies_win=x')` : 
			`j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+'${gtm_auth}${gtm_preview}&gtm_cookies_win=x';` 
		
		const script = `
		(function(w,d,s,l,i){w[l]=w[l]||[];
			w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(events).slice(1, -1)}});
			var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
			j.id='gtm';j.async=true;${scriptSrc}

			j.addEventListener('load', function(e) {
				var _ge = new CustomEvent('gtm_loaded', { event:e, bubbles: true });
				d.dispatchEvent(_ge);
			});

			j.addEventListener('error', function(e) {
				var _ge = new CustomEvent('gtm_error', { event:e, bubbles: true });
				d.dispatchEvent(_ge);
			});
			
			f.parentNode.insertBefore(j,f);
		})(window,document,'script','${dataLayerName}','${id}');
		`
	
		const dataLayerVar = this.dataLayer(dataLayer, dataLayerName)
	
		return {
			iframe,
			script,
			dataLayerVar
		}
	},
	dataLayer: function(dataLayer, dataLayerName) {
		return `
		window.${dataLayerName} = window.${dataLayerName} || [];
		window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`
	}
}  

module.exports = Snippets
