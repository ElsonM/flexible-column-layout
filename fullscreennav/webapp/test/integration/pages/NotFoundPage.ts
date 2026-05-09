import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";

const sViewName = "at.clouddna.fullscreennav.view.NotFound";

export default class NotFoundPage extends Opa5 {
	// Actions
	iNavigateToNotFound() {
		return this.waitFor({
			success: function () {
				Opa5.getWindow().location.hash = "#/notFound";
			}
		});
	}

	iPressTheTakeMeBackButton() {
		return this.waitFor({
			id: "idButtonNotFound",
			viewName: sViewName,
			actions: new Press(),
			success: function () {
				Opa5.assert.ok(true, "Pressed the 'Take me back to the list' button");
			},
			errorMessage: "Did not find the 'Take me back to the list' button to press"
		});
	}

	// Assertions
	iShouldSeeTheNotFoundPage() {
		return this.waitFor({
			id: "illustratedMessageNotFound",
			viewName: sViewName,
			success: function () {
				Opa5.assert.ok(true, "The Not Found illustrated message is displayed");
			},
			errorMessage: "Did not find the Not Found page"
		});
	}

	iShouldSeeTheTakeMeBackButton() {
		return this.waitFor({
			id: "idButtonNotFound",
			viewName: sViewName,
			matchers: new PropertyStrictEquals({ name: "text", value: "Take me back to the list" }),
			success: function () {
				Opa5.assert.ok(true, "The 'Take me back to the list' button is visible");
			},
			errorMessage: "Did not find the 'Take me back to the list' button"
		});
	}
}
