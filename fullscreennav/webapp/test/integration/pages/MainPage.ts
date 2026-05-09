import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";

const sViewName = "at.clouddna.fullscreennav.view.Main";

export default class MainPage extends Opa5 {
	// Actions
	iPressOnTheFirstCarrier() {
		return this.waitFor({
			id: "carrierList",
			viewName: sViewName,
			matchers: new AggregationLengthEquals({ name: "items", length: 3 } as any),
			actions: function (oList: any) {
				new Press().executeOn(oList.getItems()[0]);
			},
			errorMessage: "Carrier list is empty or not ready — could not press the first item"
		});
	}

	// Assertions
	iShouldSeeTheMainPage() {
		return this.waitFor({
			id: "pageMain",
			viewName: sViewName,
			success: function () {
				Opa5.assert.ok(true, "The Main page is displayed");
			},
			errorMessage: "Did not find the Main page"
		});
	}

	iShouldSeeTheCarrierList() {
		return this.waitFor({
			id: "carrierList",
			viewName: sViewName,
			success: function () {
				Opa5.assert.ok(true, "The carrier list control is visible");
			},
			errorMessage: "Did not find the carrier list"
		});
	}

	iShouldSeeCarriersLoaded() {
		return this.waitFor({
			id: "carrierList",
			viewName: sViewName,
			matchers: new AggregationLengthEquals({ name: "items", length: 3 } as any),
			success: function () {
				Opa5.assert.ok(true, "The carrier list contains 3 items from the mock service");
			},
			errorMessage: "Carrier list did not load 3 items"
		});
	}

	// Keep for backwards compatibility with the original NavigationJourney
	iShouldSeeThePageView() {
		return this.iShouldSeeTheMainPage();
	}
}
