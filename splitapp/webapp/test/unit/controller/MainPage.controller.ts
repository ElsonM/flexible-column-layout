/*global QUnit*/
import Controller from "at/clouddna/splitapp/controller/Main.controller";

declare const QUnit: any;

QUnit.module("Main Controller");

interface IAppController {
	onInit(): void;
}

interface IQUnitAssert {
	ok(value: unknown, message?: string): void;
}

QUnit.test("I should test the Main controller", function (assert: IQUnitAssert) {
	const oAppController: IAppController = new Controller("Main");
	oAppController.onInit();
	assert.ok(oAppController);
});