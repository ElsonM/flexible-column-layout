import DetailController from "at/clouddna/fullscreennav/controller/Detail.controller";

declare const QUnit: any;
declare const sinon: any;

QUnit.module("controller/Detail", {
	beforeEach: function (this: any) {
		this.oController = new DetailController("Detail");

		this.oAttachPatternMatchedSpy = sinon.spy();
		this.oRouteMock = { attachPatternMatched: this.oAttachPatternMatchedSpy };

		this.oNavToSpy = sinon.spy();
		this.oRouterMock = {
			getRoute: sinon.stub().returns(this.oRouteMock),
			navTo: this.oNavToSpy
		};

		this.oComponentMock = { getRouter: sinon.stub().returns(this.oRouterMock) };

		(this.oController as any).getOwnerComponent = () => this.oComponentMock;
	},
	afterEach: function () {
		sinon.restore();
	}
});

QUnit.test("onInit: should retrieve the Detail route from the router", function (this: any, assert: any) {
	this.oController.onInit();
	assert.ok(this.oRouterMock.getRoute.calledWith("Detail"), "getRoute was called with 'Detail'");
});

QUnit.test("onInit: should attach a patternMatched handler to the Detail route", function (this: any, assert: any) {
	this.oController.onInit();
	assert.ok(this.oAttachPatternMatchedSpy.calledOnce, "attachPatternMatched was called once");
	const [fnHandler, oContext] = this.oAttachPatternMatchedSpy.firstCall.args;
	assert.ok(typeof fnHandler === "function", "handler is a function");
	assert.strictEqual(oContext, this.oController, "handler is bound to the controller instance");
});

QUnit.test("onPatternMatched: should bind the view element to the decoded path", function (this: any, assert: any) {
	const sEncodedPath = encodeURIComponent("/CarrierCollection('LH')");
	const sDecodedPath = "/CarrierCollection('LH')";
	const oBindElementSpy = sinon.spy();

	(this.oController as any).getView = () => ({ bindElement: oBindElementSpy });
	this.oController.onInit();

	const fnHandler = this.oAttachPatternMatchedSpy.firstCall.args[0];
	const oEventMock = {
		getParameters: sinon.stub().returns({ arguments: { path: sEncodedPath } })
	};

	fnHandler.call(this.oController, oEventMock);

	assert.ok(oBindElementSpy.calledOnce, "bindElement was called once");
	assert.strictEqual(
		oBindElementSpy.firstCall.args[0].path,
		sDecodedPath,
		"path is decoded before binding"
	);
});

QUnit.test("onPatternMatched: dataReceived with no data should navigate to NotFound", function (this: any, assert: any) {
	const oBindElementSpy = sinon.spy();
	(this.oController as any).getView = () => ({ bindElement: oBindElementSpy });
	this.oController.onInit();

	const fnHandler = this.oAttachPatternMatchedSpy.firstCall.args[0];
	fnHandler.call(this.oController, {
		getParameters: sinon.stub().returns({ arguments: { path: encodeURIComponent("/CarrierCollection('XX')") } })
	});

	const oDataReceivedCallback = oBindElementSpy.firstCall.args[0].events.dataReceived;
	const oResultMock = {
		getParameters: sinon.stub().returns({ data: null })
	};

	oDataReceivedCallback.call(this.oController, oResultMock);

	assert.ok(this.oNavToSpy.calledOnce, "router.navTo was called once");
	assert.strictEqual(this.oNavToSpy.firstCall.args[0], "NotFound", "navigated to NotFound");
	assert.strictEqual(this.oNavToSpy.firstCall.args[3], true, "navigation replaces history entry");
});

QUnit.test("getCrossApplicationNavigationService: should return a Promise", function (this: any, assert: any) {
	const oOriginalUshell = (sap as any).ushell;
	(sap as any).ushell = {
		Container: { getServiceAsync: sinon.stub().returns(Promise.resolve({})) }
	};

	const oResult = (this.oController as any).getCrossApplicationNavigationService();
	assert.ok(oResult instanceof Promise, "getCrossApplicationNavigationService returns a Promise");

	(sap as any).ushell = oOriginalUshell;
});

QUnit.test("crossAppNavigation: should call toExternal with target and params", function (this: any, assert: any) {
	const done = assert.async();
	const oToExternalSpy = sinon.spy();
	const oServiceMock = { toExternal: oToExternalSpy };

	(this.oController as any).getCrossApplicationNavigationService = () => Promise.resolve(oServiceMock);

	const oTarget = { semanticObject: "CarrierFlights", action: "display" };
	const oParams = { Carrier: "LH" };

	(this.oController as any).crossAppNavigation(oTarget, oParams);

	setTimeout(function () {
		assert.ok(oToExternalSpy.calledOnce, "toExternal was called once");
		assert.deepEqual(oToExternalSpy.firstCall.args[0].target, oTarget, "correct target passed");
		assert.deepEqual(oToExternalSpy.firstCall.args[0].params, oParams, "correct params passed");
		done();
	}, 0);
});
