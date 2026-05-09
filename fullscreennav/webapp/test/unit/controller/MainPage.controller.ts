import MainController from "at/clouddna/fullscreennav/controller/Main.controller";

declare const QUnit: any;
declare const sinon: any;

QUnit.module("controller/Main", {
	beforeEach: function (this: any) {
		this.oController = new MainController("Main");

		this.oReadSpy = sinon.spy();
		this.oAttachRequestCompletedSpy = sinon.spy();
		this.oAttachRequestFailedSpy = sinon.spy();

		this.oModelMock = {
			attachRequestCompleted: this.oAttachRequestCompletedSpy,
			attachRequestFailed: this.oAttachRequestFailedSpy,
			read: this.oReadSpy
		};

		this.oNavToSpy = sinon.spy();
		this.oRouterMock = { navTo: this.oNavToSpy };

		this.oComponentMock = {
			getModel: sinon.stub().returns(this.oModelMock),
			getRouter: sinon.stub().returns(this.oRouterMock)
		};

		this.oViewMock = { getModel: sinon.stub().returns(null) };

		(this.oController as any).getView = () => this.oViewMock;
		(this.oController as any).getOwnerComponent = () => this.oComponentMock;
	},
	afterEach: function () {
		sinon.restore();
	}
});

QUnit.test("onInit: should attach a requestCompleted handler to the OData model", function (this: any, assert: any) {
	this.oController.onInit();
	assert.ok(this.oAttachRequestCompletedSpy.calledOnce, "attachRequestCompleted was called once");
});

QUnit.test("onInit: should attach a requestFailed handler to the OData model", function (this: any, assert: any) {
	this.oController.onInit();
	assert.ok(this.oAttachRequestFailedSpy.calledOnce, "attachRequestFailed was called once");
});

QUnit.test("onInit: should call model.read with /CarrierCollection", function (this: any, assert: any) {
	this.oController.onInit();
	assert.ok(this.oReadSpy.calledOnce, "model.read was called once");
	assert.strictEqual(
		this.oReadSpy.firstCall.args[0],
		"/CarrierCollection",
		"read was called with /CarrierCollection"
	);
});

QUnit.test("onInit: read call should include success and error callbacks", function (this: any, assert: any) {
	this.oController.onInit();
	const oReadOptions = this.oReadSpy.firstCall.args[1];
	assert.ok(typeof oReadOptions.success === "function", "success callback is provided");
	assert.ok(typeof oReadOptions.error === "function", "error callback is provided");
});

QUnit.test("onInit: should return early when the component has no model", function (this: any, assert: any) {
	this.oComponentMock.getModel = sinon.stub().returns(null);
	this.oController.onInit();
	assert.ok(!this.oReadSpy.called, "model.read was not called");
	assert.ok(!this.oAttachRequestCompletedSpy.called, "attachRequestCompleted was not called");
	assert.ok(!this.oAttachRequestFailedSpy.called, "attachRequestFailed was not called");
});

QUnit.test("onNavToDetail: should navigate to the Detail route with an encoded path", function (this: any, assert: any) {
	const sPath = "/CarrierCollection('LH')";
	const oEventMock = {
		getSource: sinon.stub().returns({
			getBindingContext: sinon.stub().returns({
				getPath: sinon.stub().returns(sPath)
			})
		})
	};

	(this.oController as any).onNavToDetail(oEventMock);

	assert.ok(this.oNavToSpy.calledOnce, "router.navTo was called once");
	assert.strictEqual(this.oNavToSpy.firstCall.args[0], "Detail", "navigated to the Detail route");
	assert.strictEqual(
		this.oNavToSpy.firstCall.args[1].path,
		encodeURIComponent(sPath),
		"path parameter is URI-encoded"
	);
});
