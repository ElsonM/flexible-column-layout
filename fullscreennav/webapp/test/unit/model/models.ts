import { createDeviceModel } from "at/clouddna/fullscreennav/model/models";
import JSONModel from "sap/ui/model/json/JSONModel";

declare const QUnit: any;

QUnit.module("model/models - createDeviceModel", {
	afterEach: function (this: any) {
		if (this.oModel) {
			this.oModel.destroy();
		}
	}
});

QUnit.test("should return a JSONModel instance", function (this: any, assert: any) {
	this.oModel = createDeviceModel();
	assert.ok(this.oModel instanceof JSONModel, "Model is an instance of JSONModel");
});

QUnit.test("should set OneWay as the default binding mode", function (this: any, assert: any) {
	this.oModel = createDeviceModel();
	assert.strictEqual(
		this.oModel.getDefaultBindingMode(),
		"OneWay",
		"Default binding mode is OneWay"
	);
});

QUnit.test("should contain device information in its data", function (this: any, assert: any) {
	this.oModel = createDeviceModel();
	const oData = this.oModel.getData();
	assert.ok(oData !== null && oData !== undefined, "Model data is not null or undefined");
});
