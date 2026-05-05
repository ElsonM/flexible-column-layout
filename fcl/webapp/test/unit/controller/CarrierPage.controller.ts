import Controller from "at/clouddna/fcl/controller/Carrier.controller";

declare const QUnit: any;

QUnit.module("Carrier Controller");

interface IAppController {
	onInit(): void;
}

interface IQUnitAssert {
	ok(value: unknown, message?: string): void;
}

QUnit.test("I should test the Carrier controller", function (assert: IQUnitAssert) {
	const oAppController: IAppController = new Controller("Carrier");
	oAppController.onInit();
	assert.ok(oAppController);
});