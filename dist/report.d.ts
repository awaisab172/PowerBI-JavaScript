/*! powerbi-client v2.0.0-beta.9 | (c) 2016 Microsoft Corporation MIT */
import * as service from './service';
import * as embed from './embed';
import * as models from 'powerbi-models';
import { IFilterable } from './ifilterable';
import { Page } from './page';
export interface IReportNode {
    iframe: HTMLIFrameElement;
    service: service.IService;
    config: embed.IInternalEmbedConfiguration;
}
export declare class Report extends embed.Embed implements IReportNode, IFilterable {
    static allowedEvents: string[];
    static reportIdAttribute: string;
    static filterPaneEnabledAttribute: string;
    static navContentPaneEnabledAttribute: string;
    static typeAttribute: string;
    static type: string;
    constructor(service: service.Service, element: HTMLElement, config: embed.IEmbedConfiguration);
    /**
     * This adds backwards compatibility for older config which used the reportId query param to specify report id.
     * E.g. http://embedded.powerbi.com/appTokenReportEmbed?reportId=854846ed-2106-4dc2-bc58-eb77533bf2f1
     *
     * By extracting the id we can ensure id is always explicitly provided as part of the load configuration.
     */
    static findIdFromEmbedUrl(url: string): string;
    /**
     * Get filters that are applied at the report level
     *
     * ```javascript
     * // Get filters applied at report level
     * report.getFilters()
     *   .then(filters => {
     *     ...
     *   });
     * ```
     */
    getFilters(): Promise<models.IFilter[]>;
    /**
     * Get report id from first available location: options, attribute, embed url.
     */
    getId(): string;
    /**
     * Get the list of pages within the report
     *
     * ```javascript
     * report.getPages()
     *  .then(pages => {
     *      ...
     *  });
     * ```
     */
    getPages(): Promise<Page[]>;
    /**
     * Create new Page instance.
     *
     * Normally you would get Page objects by calling `report.getPages()` but in the case
     * that the page name is known and you want to perform an action on a page without having to retrieve it
     * you can create it directly.
     *
     * Note: Since you are creating the page manually there is no guarantee that the page actually exists in the report and the subsequence requests could fail.
     *
     * ```javascript
     * const page = report.page('ReportSection1');
     * page.setActive();
     * ```
     */
    page(name: string, displayName?: string): Page;
    /**
     * Remove all filters at report level
     *
     * ```javascript
     * report.removeFilters();
     * ```
     */
    removeFilters(): Promise<void>;
    /**
     * Set the active page
     *
     * ```javascript
     * report.setPage("page2")
     *  .catch(error => { ... });
     * ```
     */
    setPage(pageName: string): Promise<void>;
    /**
     * Sets filters
     *
     * ```javascript
     * const filters: [
     *    ...
     * ];
     *
     * report.setFilters(filters)
     *  .catch(errors => {
     *    ...
     *  });
     * ```
     */
    setFilters(filters: (models.IBasicFilter | models.IAdvancedFilter)[]): Promise<void>;
    /**
     * Update settings of report (filter pane visibility, page navigation visibility)
     *
     * ```javascript
     * const newSettings = {
     *   navContentPaneEnabled: true,
     *   filterPaneEnabled: false
     * };
     *
     * report.updateSettings(newSettings)
     *   .catch(error => { ... });
     * ```
     */
    updateSettings(settings: models.ISettings): Promise<void>;
}