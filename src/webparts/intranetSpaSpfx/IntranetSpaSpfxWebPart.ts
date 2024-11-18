import { createElement } from "react";

import "./styles.css";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as ReactDom from "react-dom";

import { faviconUrl } from "./assets/assets";
import { App } from "./routes";
/* import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane'; 
 
import * as strings from 'IntranetSpaSpfxWebPartStrings';
*/

export interface IIntranetSpaSpfxWebPartProps {
  description: string;
}

export default class IntranetSpaSpfxWebPart extends BaseClientSideWebPart<IIntranetSpaSpfxWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IIntranetSpaSpfxWebPartProps> =
      createElement(App, {
        description: this.properties.description,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const oldFavicon = document.getElementById("favicon");
    if (oldFavicon) {
      oldFavicon.style.display = "none";
      oldFavicon.remove();
    }

    const newFavicon = document.createElement("link");
    newFavicon.type = "image/x-icon";
    newFavicon.rel = "shortcut icon";
    newFavicon.href = faviconUrl;
    document.head.appendChild(newFavicon);
    await super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  /* protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  } */
}
