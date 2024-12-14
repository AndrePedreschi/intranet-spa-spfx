import { createElement } from "react";

import "./styles.css";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  WebPartContext,
} from "@microsoft/sp-webpart-base";
import * as strings from "IntranetSpaSpfxWebPartStrings";
import * as ReactDom from "react-dom";

import { App } from "./routes";

export interface IIntranetSpaSpfxWebPartProps {
  //urlDevAmbient: string;
  //urlHMLAmbient: string;
  //urlProdAmbient: string;
  context: WebPartContext;
}

export default class IntranetSpaSpfxWebPart extends BaseClientSideWebPart<IIntranetSpaSpfxWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IIntranetSpaSpfxWebPartProps> =
      createElement(App, {
        //urlDevAmbient: this.properties.urlDevAmbient,
        //urlHMLAmbient: this.properties.urlHMLAmbient,
        //urlProdAmbient: this.properties.urlProdAmbient,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("urlDevAmbient", {
                  label: strings.UrlDevAmbient,
                }),
                PropertyPaneTextField("urlHMLAmbient", {
                  label: strings.UrlHMLAmbient,
                }),
                PropertyPaneTextField("urlProdAmbient", {
                  label: strings.UrlProdAmbient,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
