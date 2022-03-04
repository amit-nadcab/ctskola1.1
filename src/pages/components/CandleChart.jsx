import * as React from 'react';
import { widget } from '../../charting_library';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function widgetOptionsFunc(widgtProp){
	let symbols = widgtProp.symbols; 
	if(widgtProp.pre_symbols && (widgtProp.pre_symbols !== widgtProp.symbols)){
		symbols = widgtProp.symbols;
	}
	const widgetOptions = {
		debug: false,
		symbol: symbols,
		// BEWARE: no trailing slash is expected in feed URL
		datafeed: new window.Datafeeds.UDFCompatibleDatafeed(widgtProp.datafeedUrl),
		// datafeed: ohlc,
		interval: widgtProp.interval,
		container_id: widgtProp.containerId,
		library_path: widgtProp.libraryPath,

		locale: getLanguageFromURL() || 'en',
		disabled_features: ['header_compare','header_saveload','header_settings','header_undo_redo','header_screenshot','header_fullscreen_button','main_series_scale_menu','countdown','go_to_date','timeframes_toolbar'],
		enabled_features: ['hide_resolution_in_legend'],
		charts_storage_url: widgtProp.chartsStorageUrl,
		charts_storage_api_version: widgtProp.chartsStorageApiVersion,
		client_id: widgtProp.clientId,
		user_id: widgtProp.userId,
		fullscreen: widgtProp.fullscreen,
		autosize: widgtProp.autosize,
		studies_overrides: widgtProp.studiesOverrides,
		favorites: {
			intervals: ["1H", "2H", "4H", "6H", "12H", "1D","3D","2D","1W"],
			chartTypes: ["ha"]
		},
		header_compare:false

	};
	return  new widget(widgetOptions);
}
export class TVChartContainer extends React.PureComponent  {
	constructor(props) {
		super(props);
		this.state = {
			symbols: props.symbols,
			pre_symbols: props.pre_symbols
		};
	}
	
	static defaultProps = {
		interval: '1H',
		containerId: 'tv_chart_container',
		// datafeedUrl: 'https://demo_feed.tradingview.com',
		datafeedUrl: 'https://order.ctskola.com/api/chart',//https://bitflash.io/api/chart
		// datafeedUrl: 'http://localhost/api/chart',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		header_widget_buttons_mode: 'fullsize',
		clientId: 'localhost',
		fullscreen: false,		
		autosize: true,
		studiesOverrides: {},
		supportSymbolSearch: false,
		compare_symbols: false,
		disabled_features: ["save_chart_properties_to_local_storage", "volume_force_overlay"],
		enabled_features: ["move_logo_to_main_pane", "study_templates"],
		disableSave: true		
	};

	tvWidget = null;
	// init () {
	// 	if (socket.connected) {
	// 		socket.emit("ping");
	// 		socket.emit("chart_data", {currency_type: 'btc', compare_currency: 'inr'});
	// 	}
	// }
	componentDidMount() {
		// console.log("TVChartContainer coming:");
		// this.init();
		
		// console.log("this2: " ,this.state);
		const tvWidget = widgetOptionsFunc(this.props,this.state.symbols);
		this.tvWidget = tvWidget;
	}
	componentDidUpdate() {
		// console.log("this: " ,this.state);
			const tvWidget = widgetOptionsFunc(this.props,this.state.symbols);
			this.tvWidget = tvWidget;
			// console.log("this:update true" );
	} 
	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
