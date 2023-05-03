import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import {HttpClient} from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ErrorMessageComponent } from './common/error-message.component';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import { TooltipModule } from '../../node_modules/ngx-bootstrap/tooltip';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogComponent } from './dialog/dialog.component';
import { ValidationService } from './services/validation.service';
import { PricingInfoService } from './services/pricing-info.service';
import { QuoteReportService } from './services/quote-report.service';
import { CustomerService } from './services/customer.service';
import { InternalScreeningService } from './services/internal-screening.service';
import { BillofladingService } from './services/billoflading.service';
import { LoggerService } from './services/logger.service';
import { ExternalService } from './services/external.service';
import { ExcelService } from './services/excel.service';
import { InternalSalesComponent } from './internal-sales/internal-sales.component';
// import { NguiDatetimePickerModule } from '@ngui/datetime-picker'; // not using
import { NgxPaginationModule } from 'ngx-pagination';
import { InternalLoginComponent } from './internal-login/internal-login.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './services/interceptor.class';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
// import { BillofladingComponent } from './billoflading/billoflading.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooterComponent } from './footer/footer.component';
import { HotkeyModule } from 'angular2-hotkeys';
import {  IConfig } from 'ngx-mask';
import { TemplatesComponent } from './templates/templates.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { WebserviceService } from './services/webservice.service';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { InvoiceService } from './services/invoice.service';
// import {IConfig} from ''
import { routing } from './app.routing';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { TextMaskModule } from 'angular2-text-mask';
import { ChatService } from './services/chat.service';
import { WebSocketService } from './services/web-socket.service';
import { IntlenrouteService } from './services/intlenroute.service';
import { DomesticenrouteService } from './services/domesticenroute.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ManagementComponent } from './management/management.component';
import { MainComponent } from './main/main.component';
import { LtlRateComponent } from './ltl-rate/ltl-rate.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MybillofladingComponent } from './mybilloflading/mybilloflading.component';
import { ActiveRequestComponent } from './active-request/active-request.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddShipmentInfoComponent } from './add-shipment-info/add-shipment-info.component';
import { BillofladingsummaryComponent } from './billofladingsummary/billofladingsummary.component';
import { CargoComponent } from './cargo/cargo.component';
import { CarrierComponent } from './carrier/carrier.component';
import { CompanyComponent } from './company/company.component';
import { CompanySummaryComponent } from './company-summary/company-summary.component';
import { CreateSalesrepComponent } from './create-salesrep/create-salesrep.component';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { OtherQuoteComponent } from './other-quote/other-quote.component';
import { PackagesComponent } from './packages/packages.component';
import { QuickieQuoteComponent } from './quickie-quote/quickie-quote.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { ReportComponent } from './report/report.component';
import { RequestQouteComponent } from './request-qoute/request-qoute.component';
import { ShipmentDuplicateComponent } from './shipment-duplicate/shipment-duplicate.component';
import { TrackingComponent } from './tracking/tracking.component';
import { UploadpronumbersComponent } from './uploadpronumbers/uploadpronumbers.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { CompanyWareHouseComponent } from './company-ware-house/company-ware-house.component';
import { FullLtlQuoteComponent } from './full-ltl-quote/full-ltl-quote.component';
import { InwardShipmentsComponent } from './inward-shipments/inward-shipments.component';
import { PromoteRuleWorkbookComponent } from './promote-rule-workbook/promote-rule-workbook.component';
import { WorkbookCustomerInfoComponent } from './workbook-customer-info/workbook-customer-info.component';
import { UploadWorksheetComponent } from './upload-worksheet/upload-worksheet.component';
import { TrafficdatanewComponent } from './trafficdatanew/trafficdatanew.component';
import { CarrieranalyticsComponent } from './carrieranalytics/carrieranalytics.component';
import { BolComponent } from './bol/bol.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { InternalviewnewComponent } from './internalviewnew/internalviewnew.component';

// import { NgMaterialModule } from './ng-material/ng-material.module';

// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    InternalLoginComponent,
    InternalSalesComponent,
    CalculatorComponent,
    CustomerInfoComponent,
    HeaderComponent,
    SidemenuComponent,
    TemplatesComponent,
    LandingPageComponent,
    FooterComponent,
    DashboardComponent,
    DialogComponent,
    ManagementComponent,
    MainComponent,
    LtlRateComponent,
    MyAccountComponent,
    MybillofladingComponent,
    ActiveRequestComponent,
    AddCustomerComponent,
    AddShipmentInfoComponent,
    BillofladingsummaryComponent,
    BolComponent,
    ErrorPageComponent,
    ErrorMessageComponent,
    CargoComponent,
    CarrierComponent,
    CompanyComponent,
    CompanySummaryComponent,
    CreateSalesrepComponent,
    CreateShipmentComponent,
    CustomerInfoComponent,
    OtherQuoteComponent,
    PackagesComponent,
    QuickieQuoteComponent,
    QuoteDetailsComponent,
    ReportComponent,
    RequestQouteComponent,
    ShipmentDuplicateComponent,
    TrackingComponent,
    UploadpronumbersComponent,
    WarehouseDetailsComponent,
    CompanyWareHouseComponent,
    FullLtlQuoteComponent,
    InwardShipmentsComponent,
    PromoteRuleWorkbookComponent,
    WorkbookCustomerInfoComponent,
    UploadWorksheetComponent,
    TrafficdatanewComponent,
    CarrieranalyticsComponent,
    InternalviewnewComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    CommonModule,
    routing,
    ReactiveFormsModule,
    NgSelectModule,
    // AngularMultiSelectModule,
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    HotkeyModule.forRoot(),
    // SocketIoModule.forRoot(config),
    // NguiDatetimePickerModule,
    NgxPaginationModule,
    // NgxMaskModule.forRoot(maskConfig),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      fullScreenBackdrop: true,
      backdropBackgroundColour: 'rgba(51, 51, 51, 0.8)',
      backdropBorderRadius: '0',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    AlertModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    // Ng4GeoautocompleteModule.forRoot(),
    BrowserAnimationsModule,
    // NgxBarcodeModule,
    TextMaskModule,
    NgMultiSelectDropDownModule.forRoot()
    // NguiAutoCompleteModule,
    
  ],

  providers: [
    CustomerService,
    ValidationService,
    PricingInfoService,
    QuoteReportService,
    InternalScreeningService,
    BillofladingService,
    ExcelService,
    LoggerService,
    ExternalService,
    WebserviceService,
    InvoiceService,
    ChatService,
    WebSocketService,
    IntlenrouteService,
    DomesticenrouteService,
    NgxSpinnerService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
// "ng4-geoautocomplete": "^0.1.0",
// 
// "ng4-geoautocomplete": {
//   "version": "0.1.0",
//   "resolved": "https://registry.npmjs.org/ng4-geoautocomplete/-/ng4-geoautocomplete-0.1.0.tgz",
//   "integrity": "sha1-9g5Oj/T/elBOVQv8vViXho+QxIY="
// },