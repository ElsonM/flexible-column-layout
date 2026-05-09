import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";

const sViewName = "at.clouddna.fullscreennav.view.Detail";

export default class DetailPage extends Opa5 {
	// Actions
	iPressTheCarrierFlightsButton() {
		return this.waitFor({
			id: "idButtonDetail",
			viewName: sViewName,
			actions: new Press(),
			errorMessage: "Did not find the Carrier Flights button to press"
		});
	}

	// Assertions
	iShouldSeeTheDetailPage() {
		return this.waitFor({
			id: "pageDetail",
			viewName: sViewName,
			matchers: new PropertyStrictEquals({ name: "title", value: "Details" }),
			success: function () {
				Opa5.assert.ok(true, "The Detail page with title 'Details' is displayed");
			},
			errorMessage: "Did not find the Detail page"
		});
	}

	iShouldSeeTheCarrierIdField() {
		return this.waitFor({
			id: "textCarrid",
			viewName: sViewName,
			matchers: function (oText: any) {
				return oText.getText().length > 0;
			},
			success: function (oText: any) {
				Opa5.assert.ok(oText.getText().length > 0, "Carrier ID field is populated with: " + oText.getText());
			},
			errorMessage: "Did not find a populated Carrier ID field"
		});
	}

	iShouldSeeTheCarrierNameField() {
		return this.waitFor({
			id: "textCarrname",
			viewName: sViewName,
			matchers: function (oText: any) {
				return oText.getText().length > 0;
			},
			success: function (oText: any) {
				Opa5.assert.ok(oText.getText().length > 0, "Carrier Name field is populated with: " + oText.getText());
			},
			errorMessage: "Did not find a populated Carrier Name field"
		});
	}

	iShouldSeeTheCurrencyField() {
		return this.waitFor({
			id: "textCurr",
			viewName: sViewName,
			matchers: function (oText: any) {
				return oText.getText().length > 0;
			},
			success: function (oText: any) {
				Opa5.assert.ok(oText.getText().length > 0, "Currency field is populated with: " + oText.getText());
			},
			errorMessage: "Did not find a populated Currency field"
		});
	}

	iShouldSeeTheCarrierFlightsButton() {
		return this.waitFor({
			id: "idButtonDetail",
			viewName: sViewName,
			matchers: new PropertyStrictEquals({ name: "text", value: "Carrier Flights" }),
			success: function () {
				Opa5.assert.ok(true, "The 'Carrier Flights' button is visible in the header");
			},
			errorMessage: "Did not find the 'Carrier Flights' button"
		});
	}
}
