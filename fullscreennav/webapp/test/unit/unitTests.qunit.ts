/* global QUnit */
declare const QUnit: any;
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

// import all your QUnit tests here
void Promise.all([
	import("unit/model/models"),
	import("unit/controller/MainPage.controller"),
	import("unit/controller/Detail.controller"),
	import("unit/controller/NotFound.controller")
]).then(() => {
	QUnit.start();
});
