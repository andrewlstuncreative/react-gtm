import Snippets from './Snippets'

const TagManager = 
{
	dataScript: function(dataLayer)
	{
		const script = document.createElement('script')
		script.innerHTML = dataLayer
		return script
	},

	gtm: function(args)
	{
		const snippets = Snippets.tags(args)

		const noScript = function()
		{
			const noscript = document.createElement('noscript')
			noscript.innerHTML = snippets.iframe
			return noscript
		}

		const script = function()
		{
			const script = document.createElement('script')
			script.id = 'gtm-loader'
			script.innerHTML = snippets.script
			return script
		}

		const dataScript = this.dataScript(snippets.dataLayerVar)

		return {
			noScript,
			script,
			dataScript
		}
	},

	initialize: function({ 
		gtmId, 
		events = {}, 
		dataLayer,
		dataLayerName = 'dataLayer',
		auth = '',
		preview = '',
		noAutoRun = false 
	})
	{
		const gtm = this.gtm({
			id: gtmId,
			events: events,
			dataLayer: dataLayer || undefined,
			dataLayerName: dataLayerName,
			auth,
			preview,
			noAutoRun
		})

		if(dataLayer)
			document.head.appendChild(gtm.dataScript)
		
		if(!document.querySelector('head script#gtm-loader'))
			document.head.insertBefore(gtm.script(), document.head.childNodes[0])
		
		// kill this because it would never run...
		//if(!document.querySelector('body iframe[src^="https://www.googletagmanager.com/ns.html"]'))
		//	document.body.insertBefore(gtm.noScript(), document.body.childNodes[0])
	},
	dataLayer: function({
		dataLayer, 
		dataLayerName = 'dataLayer'
	})
	{
		if(window[dataLayerName])
			return window[dataLayerName].push(dataLayer)
		
		const snippets = Snippets.dataLayer(dataLayer, dataLayerName)
		const dataScript = this.dataScript(snippets)
		
		document.head.appendChild(dataScript)
	}
}

module.exports = TagManager
