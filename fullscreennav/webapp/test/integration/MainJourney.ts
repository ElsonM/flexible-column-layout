/*global QUnit*/
declare const QUnit: any;
import opaTest from "sap/ui/test/opaQunit";

import AppPage from "./pages/AppPage";
import MainPage from "./pages/MainPage";

const onTheAppPage = new AppPage();
const onTheMainPage = new MainPage();

QUnit.module("Main Page Journey");

opaTest("Should display the carrier list on the Main page", 2, function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyApp();

	// Assertions
	onTheMainPage.iShouldSeeTheMainPage();
	onTheMainPage.iShouldSeeTheCarrierList();

	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});

opaTest("Should load 3 carriers from the mock service into the list", 1, function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyApp();

	// Assertions
	onTheMainPage.iShouldSeeCarriersLoaded();

	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});
