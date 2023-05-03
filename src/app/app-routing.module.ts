import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MainComponent } from './main/main.component';
// import { ManagementComponent } from './management/management.component';
// import { ReportComponent } from './report/report.component';
import { InternalSalesComponent } from './internal-sales/internal-sales.component';
// import { CarrierComponent } from './carrier/carrier.component';
import { InternalLoginComponent } from './internal-login/internal-login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { CreateSalesrepComponent } from './create-salesrep/create-salesrep.component';
// import { BillofladingComponent } from './billoflading/billoflading.component';
// import { BillofladingsummaryComponent } from './billofladingsummary/billofladingsummary.component';
// import { TrackingComponent } from './tracking/tracking.component';
// import { CargoComponent } from './cargo/cargo.component';
// import { MyAccountComponent } from './my-account/my-account.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { RequestQouteComponent } from './request-qoute/request-qoute.component';
// import { OtherQuoteComponent } from './other-quote/other-quote.component';
// import { QuickieQuoteComponent } from './quickie-quote/quickie-quote.component';
// import { FullLtlQuoteComponent } from './full-ltl-quote/full-ltl-quote.component';
// import { ActiveRequestComponent } from './active-request/active-request.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooterComponent } from './footer/footer.component';
// import { QuoteDetailsComponent } from './quote-details/quote-details.component';
// import { MybillofladingComponent } from './mybilloflading/mybilloflading.component';
// import { AddCustomerComponent } from './add-customer/add-customer.component';
// import { CompanySummaryComponent } from './company-summary/company-summary.component';
// import { CompanyComponent } from './company/company.component';
// // import { AnalyticsComponent} from './analytics/analytics.component';
// import { UploadpronumbersComponent } from './uploadpronumbers/uploadpronumbers.component';
// import { CalculatorComponent } from './calculator/calculator.component';
// import { AddShipmentInfoComponent } from './add-shipment-info/add-shipment-info.component';
// import { PackagesComponent } from './packages/packages.component';
// import { ListingPackagesComponent } from './listing-packages/listing-packages.component';
// import { LtlRateComponent } from './ltl-rate/ltl-rate.component';
// import { ShipmentsComponent } from './shipments/shipments.component';
// import { BolComponent } from './bol/bol.component';
// import { InvoiceworkbookComponent } from './invoiceworkbook/invoiceworkbook.component';
// import { WorkbookComponent} from './workbook/workbook.component';
// import { CustomerInfoComponent } from './customer-info/customer-info.component';
// import { TrafficdataUploadComponent } from './trafficdata-upload/trafficdata-upload.component';
// import { CompanyWareHouseComponent } from './company-ware-house/company-ware-house.component';
// import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
// import { IntlEnRouteComponent } from './intl-en-route/intl-en-route.component';
// import { DomesticEnrouteComponent } from './domestic-enroute/domestic-enroute.component';
// import { InventoryComponent } from './inventory/inventory.component';
// import { CustomerInventoryComponent } from './customer-inventory/customer-inventory.component';
// import { CreateInventoryComponent } from './create-inventory/create-inventory.component';
// import { EnrouteInformationComponent } from './enroute-information/enroute-information.component';
// import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
// import { WorkbookCustomerInfoComponent } from './workbook-customer-info/workbook-customer-info.component';
// import { UploadWorksheetComponent } from './upload-worksheet/upload-worksheet.component';
// import { TrafficdatanewComponent } from './trafficdatanew/trafficdatanew.component';
// import { CarrieranalyticsComponent } from './carrieranalytics/carrieranalytics.component';
// import { PromoteRuleWorkbookComponent } from './promote-rule-workbook/promote-rule-workbook.component';
// import { InwardShipmentsComponent } from './inward-shipments/inward-shipments.component';
// import { ShipmentDuplicateComponent } from './shipment-duplicate/shipment-duplicate.component';
// import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';

// const routes:  Routes = [
//   { path: '', pathMatch: 'full', redirectTo: 'login' },
//   { path: 'login' , component: LandingPageComponent },
//   { path: 'home', component: MainComponent },
//   { path: 'management', component: ManagementComponent },
//   { path: 'report', component: ReportComponent },
//   { path: 'internal', component: InternalSalesComponent },
//   { path: 'carrier', component: CarrierComponent },
//   { path: 'internalsalesreplogin', component: InternalLoginComponent },
//   { path: 'error', component: ErrorPageComponent },
//   { path: 'createSalesRep', component: CreateSalesrepComponent },
//   { path: 'bill', component: BolComponent },
//   { path: 'tracking', component: TrackingComponent },
//   { path: 'billOfLadingSummary', component: BillofladingsummaryComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'request_quote', component: RequestQouteComponent },
//   { path: 'other_quote', component: OtherQuoteComponent },
//   { path: 'quickie_Quote', component: QuickieQuoteComponent },
//   { path: 'fullltl_Quote', component: FullLtlQuoteComponent},
//   { path: 'active_request/:type', component: ActiveRequestComponent},
//   { path: 'side_Menu', component: SidemenuComponent},
//   { path: 'my_bill', component: MybillofladingComponent},
//   { path: 'footer', component: FooterComponent},
//   { path: 'cargo', component: CargoComponent },
//   { path: 'myaccount', component: MyAccountComponent },
//   { path: 'templates', component: TemplatesComponent },
//   { path: 'Quote', component: QuoteDetailsComponent },
//   { path: 'addCustomer', component: AddCustomerComponent},
//   { path: 'companySummary', component: CompanySummaryComponent},
//   { path: 'company', component: CompanyComponent},
//   { path: 'upload_Pro', component: UploadpronumbersComponent },
//   { path: 'calculator/:type', component: CalculatorComponent },
//   { path: 'add_shipment', component: AddShipmentInfoComponent },
//   { path: 'package', component: PackagesComponent},
//   { path: 'list_packages', component: ListingPackagesComponent},
//   { path: 'ltlRate', component: LtlRateComponent},
//   { path: 'shipments', component: ShipmentsComponent},  
//   { path: 'BOLNEW', component: BolComponent},
//   // {path: 'Invoice', component: InvoiceworkbookComponent},
//   // { path: 'Workbook', component: WorkbookComponent},
//   // { path: 'Customer_Info', component: CustomerInfoComponent},
//   // {path: 'uploadTrafficFlow', component: TrafficdataUploadComponent},
//   // {path: 'companyWarehouse', component: CompanyWareHouseComponent},
//   // {path: 'warehouse', component: WarehouseDetailsComponent},
//   // {path: 'intlEnRoute', component: IntlEnRouteComponent},
//   // {path: 'domesticEnRoute', component: DomesticEnrouteComponent},
//   // {path: 'inventory', component: InventoryComponent},
//   // {path: 'inventoryStatus', component: CustomerInventoryComponent},
//   // {path: 'createInventory', component: CreateInventoryComponent},
//   // {path: 'enrouteInformation', component:EnrouteInformationComponent},
//   {path: 'shipmentCreation', component: CreateShipmentComponent},
//   {path: 'customerInfoworkbook', component: WorkbookCustomerInfoComponent},
//   {path: 'uploadWorksheet', component: UploadWorksheetComponent},
//   {path: 'trafficdatanew', component: TrafficdatanewComponent},
//   {path: 'carrierAnalytics', component: CarrieranalyticsComponent},
//   {path: 'promoteRule', component: PromoteRuleWorkbookComponent},
//   {path: 'inwardShipments', component: InwardShipmentsComponent},
//   {path: 'shipmentsNew', component: ShipmentDuplicateComponent},
//   // {path: 'uploadInvoice', component: UploadInvoiceComponent}
// ];

@NgModule({
  imports: [],
  exports: []
})
export class AppRoutingModule { }
