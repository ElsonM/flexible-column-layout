/*global QUnit*/
declare const QUnit: any;
import opaTest from "sap/ui/test/opaQunit";

import AppPage from "./pages/AppPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";

const onTheAppPage = new AppPage();
const onTheMainPage = new MainPage();
const onTheNotFoundPage = new NotFoundPage();

QUnit.module("Not Found Page Journey");

opaTest("Should display the Not Found page when navigating to an invalid route", 2, function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyApp();

	// Actions
	onTheNotFoundPage.iNavigateToNotFound();

	// Assertions
	onTheNotFoundPage.iShouldSeeTheNotFoundPage();
	onTheNotFoundPage.iShouldSeeTheTakeMeBackButton();

	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});

opaTest("Should navigate back to the Main page when pressing 'Take me back to the list'", 3, function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyApp();

	// Actions
	onTheNotFoundPage.iNavigateToNotFound();
	onTheNotFoundPage.iShouldSeeTheNotFoundPage();
	onTheNotFoundPage.iPressTheTakeMeBackButton();

	// Assertions
	onTheMainPage.iShouldSeeTheMainPage();

	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});
