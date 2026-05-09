/*global QUnit*/
declare const QUnit: any;
import opaTest from "sap/ui/test/opaQunit";

import AppPage from "./pages/AppPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

const onTheAppPage = new AppPage();
const onTheMainPage = new MainPage();
const onTheDetailPage = new DetailPage();

QUnit.module("Detail Page Journey");

opaTest("Should display carrier details after navigating to a carrier", 5, function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyApp();

	// Actions
	onTheMainPage.iShouldSeeCarriersLoaded();
	onTheMainPage.iPressOnTheFirstCarrier();

	// Assertions
	onTheDetailPage.iShouldSeeTheDetailPage();
	onTheDetailPage.iShouldSeeTheCarrierIdField();
	onTheDetailPage.iShouldSeeTheCarrierNameField();
	onTheDetailPage.iShouldSeeTheCurrencyField();

	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});

opaTest("Should show the Carrier Flights button in the Detail page header", 2, function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyApp();

	// Actions
	onTheMainPage.iShouldSeeCarriersLoaded();
	onTheMainPage.iPressOnTheFirstCarrier();

	// Assertions
	onTheDetailPage.iShouldSeeTheCarrierFlightsButton();

	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});
