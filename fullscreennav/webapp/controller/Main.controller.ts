import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace at.clouddna.fullscreennav.controller
 */
export default class Main extends Controller {

    public onInit(): void {
        const oViewModel = this.getView().getModel();
        const oComponentModel = this.getOwnerComponent().getModel();

        if (!oViewModel) {
            console.warn("Main controller: no default model found on view.");
        }

        if (!oComponentModel) {
            console.error("Main controller: no default model found on component.");
            return;
        }

        const oModel = oComponentModel as ODataModel;

        oModel.attachRequestCompleted(() => {
            console.info("OData request completed on model", oModel);
        });

        oModel.attachRequestFailed((oEvent: any) => {
            console.error("OData request failed:", oEvent.getParameter("response"));
        });

        oModel.read("/CarrierCollection", {
            success: (oData: any) => {
                console.info("CarrierCollection loaded successfully", oData);
            },
            error: (oError: any) => {
                console.error("CarrierCollection read failed", oError);
            }
        });
    }

    private onNavToDetail(oEvent: Event) :  void {
      let oRouter = (this.getOwnerComponent() as UIComponent).getRouter(),
          oBindingContext = (oEvent as any).getSource().getBindingContext(),
          sPath = oBindingContext?.getPath();
      oRouter.navTo("Detail", { path: encodeURIComponent(sPath) });
    }      
      
}