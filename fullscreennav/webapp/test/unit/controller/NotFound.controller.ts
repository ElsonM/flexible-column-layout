import NotFoundController from "at/clouddna/fullscreennav/controller/NotFound.controller";

declare const QUnit: any;
declare const sinon: any;

QUnit.module("controller/NotFound", {
	beforeEach: function (this: any) {
		this.oController = new NotFoundController("NotFound");

		this.oNavToSpy = sinon.spy();
		this.oRouterMock = { navTo: this.oNavToSpy };
		this.oComponentMock = { getRouter: sinon.stub().returns(this.oRouterMock) };

		(this.oController as any).getOwnerComponent = () => this.oComponentMock;
	},
	afterEach: function () {
		sinon.restore();
	}
});

QUnit.test("onInit: should exist and complete without error", function (this: any, assert: any) {
	assert.ok(typeof this.oController.onInit === "function", "onInit method exists");
	this.oController.onInit();
	assert.ok(true, "onInit completed without throwing");
});

QUnit.test("onNavToMain: should navigate to the RouteMain route", function (this: any, assert: any) {
	(this.oController as any).onNavToMain();
	assert.ok(this.oNavToSpy.calledOnce, "router.navTo was called once");
	assert.strictEqual(this.oNavToSpy.firstCall.args[0], "RouteMain", "navigated to RouteMain");
});

QUnit.test("onNavToMain: should replace the current history entry", function (this: any, assert: any) {
	(this.oController as any).onNavToMain();
	// navTo signature: navTo(sName, oParameters, oComponentTargetInfo, bReplace)
	assert.strictEqual(
		this.oNavToSpy.firstCall.args[3],
		true,
		"bReplace is true (replaces history entry)"
	);
});
