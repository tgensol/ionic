import { Injectable, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { DeepLinkConfig, DeepLinkMetadata } from '../navigation/nav-util';

const SEPERATOR = '#';

@Injectable()
export class ModuleLoader {
  constructor(private _deepLinkConfig: DeepLinkConfig, private _ngModuleFactoryLoader: NgModuleFactoryLoader) {
  }

  loadModule(viewName: string): Promise<NgModuleFactory<any>>{
    const deepLinkMetadata = this.getModulePath(viewName);
    if (!deepLinkMetadata) {
      throw new Error(`There is not an entry with a key of "${viewName}"  in the app's deeplink config`)
    }
    const moduleImportString = deepLinkMetadata.path + SEPERATOR + deepLinkMetadata.namedExport;
    return this._ngModuleFactoryLoader.load(moduleImportString);
  }

  getModulePath(viewName: string): DeepLinkMetadata{
    if (this._deepLinkConfig && this._deepLinkConfig.links) {
      for (const deepLink of this._deepLinkConfig.links) {
        if (deepLink.name === viewName) {
          return deepLink;
        }
      }
    }
    return null;
  }
}