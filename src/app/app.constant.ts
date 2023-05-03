/**
 * Created by Admin on 11/13/2017.
 */
// export const increasePercentForAR = 1.06;
// export const increasePercentForAR = 1.12307;
// export const increasePercentForAR = 1.1781;
// export const increasePercentForAR = 1.248786;
export const increasePercentForAR = 1.248786;

export const assessorialValuesForYRC = [
    {'id': 1, 'itemName': 'Liftgate Service', 'Yrccost': '8.80', 'YrcMax': 419, 'YrcMin': 167},
    {'id': 2, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'YrcMax': 593, 'YrcMin': 134},
    {'id': 3, 'itemName': 'Limited Access Delivery', 'Yrccost': '0', 'YrcMax': 134.25},
    {'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'YrcMax': 1265, 'YrcMin': 119},
    {'id': 5, 'itemName': 'Notify', 'Yrccost': '0', 'YrcMax': 40},
    {'id': 6, 'itemName': 'Others'}
];

export const assessorialValuesForFedexAp = [
    {'id': 1, 'itemName': 'Liftgate Service', 'Fedexcost': '72.06'},
    {'id': 2, 'itemName': 'Residential Delivery', 'Fedexcost': '76'},
    {'id': 3, 'itemName': 'Limited Access Delivery', 'Fedexcost': '76'},
    {'id': 4, 'itemName': 'Inside Delivery', 'Fedexcost': '6.98', 'FedexcostAR': '11.40'},
    {'id': 5, 'itemName': 'Notify', 'Fedexcost': '0'},
    {'id': 6, 'itemName': 'Others'}
];

export const assessorialValuesForFedexAr = [
    {'id': 1, 'itemName': 'Liftgate Service', 'Fedexcost': '72.06'},
    {'id': 2, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'Fedexcost': '76'},
    {'id': 3, 'itemName': 'Limited Access Delivery', 'Yrccost': '0', 'Fedexcost': '76'},
    {'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40'},
    {'id': 5, 'itemName': 'Notify', 'Yrccost': '0', 'Fedexcost': '0'},
    {'id': 6, 'itemName': 'Others'}
];

export const classArray = [50, 55, 60, 65, 70, 77, 77.5, 85, 92, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
export const classArrayForBillOfLading = [50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];


export const info = {};
export const error = {};
export const warning = {};
export const debug = {};
export const remoteMethodApiUrl = {
  accessTimeUrl: '/AccessTime/tokenValidation',
  loginAdminUserUrl: '/AdminUser/adminUserLoginNew',
  loginValidationOnCustomerUrl: '/CustomersDetail/loginValidation',
  getLoginCustomerDetails: '/externalCustomersDetail',
  getLoginAdminDetails: '/AdminUser',
  getAdminUserUrl: '/AdminUser?filter[where][status]=active',
  createAdminUserUrl: '/AdminUser/createAdminUser?access_token=',
  accessTokenValidationUrl: '/AccessTime/tokenValidation',
  logoutAdminUserUrl: '/AdminUser/logout?access_token=',
  billOfLadingUrl: '/billOfLading/searchBillOfLading',
  classificationFactorUrl: '/ClassificationFactor/generateBill',
  classificationFactorArUrl: '/ClassificationFactorAr/generateBill',
  fedexClsFacUrl: '/FedexClsFac/generateBill',
  fedexClsFacArUrl: '/FedexClsFacAr/generateARBill',
  reddawayUrl: '/Rates/generateBill',
  reddawayMailUrl: '/Rates/reddawayMail',
  reddawayArUrl: '/RatesAr/generateBill',
  createCustomersRateQuoteUrl: '/customersRateQuote/createNewRateQuote',
  getCustomersRateQuoteUrl: '/customersRateQuote',
  filterCustomersRateQuoteByCustomerIdUrl: '/customersRateQuote?filter[where][customerId]=',
  getCustomersRateQuoteByIdUrl: '/customersRateQuote?filter[where][id]=',
  mailCustomersRateQuoteUrl: '/customersRateQuote/mailRateQuote',
  searchCustomersRateQuoteUrl: '/customersRateQuote/searchRateQuote',
  itemTemplateUrl: '/itemTemplates',
  addressTemplateUrl: '/addressTemplates',
  searchItemTemplateUrl: '/itemTemplates/searchItemTemplate',
  searchAddressTemplateUrl: '/addressTemplates/searchAddressTemplate',
  packageUrl: '/package',
  packageLabelUrl:'/package/getLabel',
  packagePickupUrl: '/package/pickup',
  fedexWebsiteRateUrl: '/FedexRate/getRateAndDate',
  routineShipmentUrl: '/FedexMatrixAdj/routineShipment',
  activeRequestQuoteUrl: '/customersRateQuote/createNewRateQuote',
  activeRequestQuoteViewedUrl: '/customersRateQuote/quoteViewedUpdateNew',
  activeRequestQuoteSearchUrl: '/customersRateQuote/searchRateQuote',
  activeRequestQuoteStatusUpdateUrl: '/customersRateQuote/updateStatus',
  activeRequestUpdateTrackLinkUrl: '/customersRateQuote/updateTrackLink',
  activeRequestMailOnTrackLinkUrl: '/customersRateQuote/trackLinkMail',
  getActiveRequestByIdUrl: '/customersRateQuote?filter[where][id]=',
  activeRequestMailQuoteUrl: '/customersRateQuote/mailRateQuote',
  activeRequestChatUrl: '/rateQuoteChat',
  activeRequestUpdateMsgOnChat: '/rateQuoteChat/updateMessage',
  activeRequestUpdateAmtUrl: '/customersRateQuote/updateAmount',
  activeRequestQuoteLinkUrl: '/customersRateQuote/quoteLink',
  getActiveRequestByQuoteRefIdUrl: '/customersRateQuote?filter[where][quoteReferenceNumber]=',
  getAllChatsUrl: '/quoteNotes?filter[order]=createdOn DESC&filter[limit]=5&[include]=customersRateQuote',
  getAllExternalCustomers: '/externalCustomersDetail?access_token=',
  updatePickupInfoOnCustomerUrl: '/externalCustomersDetail/addPickupInfo?access_token=',
  getQuoteDetailsByQuoteIdUrl: '/QuoteDetailsNew?filter[where][quoteId]=',
  getQuoteDetailsByQuoteReferenceIdUrl: '/QuoteDetailsNew?filter[where][quoteReferenceId]=',
  // getQuoteDetailsByQuoteIdUrl: '/QuoteDetailsNew?filter[where][quoteReferenceId]=',
  getQuoteDetailsByIdUrl: '/QuoteDetailsNew?filter[where][id]=',
  quoteDetailsReportMailUrl: '/QuoteDetailsNew/reportMail',
  quoteDetailsSearchUrl: '/QuoteDetailsNew/searchReport?access_token=',
  searchQuoteDetailsUrl: '/MatrixAr/searchReport',
  quoteDetailsMailingUrl: '/QuoteDetailsNew/mailMe',
  loggerUrl: '/Matrix/logger',
  uploadReddawayProNumbersUrl: '/reddawayProNumbers/uploadProNumbers',
  bolPdfMailUrl: '/billOfLading/pdfMail',
  bolFedexMatrixUrl: '/FedexMatrixAdj/billOfLading1',
  createBolPickupUrl: '/FedexMatrixAdj/createPickupNew',
  createBolPickupForFedexUrl: '/FedexMatrixAdj/createPickup',
  getAllbillOfLadingUrl: '/billOfLading?filter[order]=createdOn DESC'+'&filter[where][status][neq]=inactive',
  getBolTrackingUrl: '/FedexMatrixAdj/tracking',
  
getAllbillOfLadingUrlNew: '/billOfLading?filter={"order": "createdOn DESC" , "include": [{"relation": "externalCustomersDetail","scope":{"fields": ["customerName"]}},{"relation": "AdminUser","scope":{"fields": ["salesRepName"]}}]}',
  searchBolUrl: '/billOfLading/searchBillOfLadingNew',
  deleteBolAddShipmentUrl: '/billOfLading/deleteShipment?access_token=',
  searchBolTrackUrl: '/billOfLading/searchTrackingNew',
  searchLtlTrackUrl: '/billOfLading/searchLtlTracking',
  createCustomerUrl: '/externalCustomersDetail/createExternalCustomer?access_token=',
  createCompanyUrl: '/companyDetails/addCompany?access_token=',
  deleteCompanyUrl: '/companyDetails/deleteCompany?access_token=',
  updateCompanyDetailUrl: '/companyDetails?access_token=', 
  updateCustomerUrl: '/externalCustomersDetail/updateExternalCustomer?access_token=',
  updateCustomerPasswordUrl: '/externalCustomersDetail/changePassword?access_token=',
  updateCustomerDataUrl: '/CustomersDetail/updateCustomer?access_token=',
  getCustomerUsingCustomerNameUrl: '/externalCustomersDetail?filter[where][customerName]=',
  deleteCustomerUrl: '/externalCustomersDetail/deleteCustomer?access_token=',
  createCustomerDataUrl: '/externalCustomersDetail',
  createBusinessRulesUrl: '/externalCustomersDetail/createBusinessRules?access_token=', 
  updateBusinessRulesUrl: '/companyDetails/updateBusinessRules?access_token=',
  getFedexAdditionalRateUrl: '/FedexAdditionalRate/additionalRate?access_token=',
  updateBolTrackNumberUrl: '/billOfLading/updateTrackAndProNumber',
  getTransitTimeUrl: '/BusinessRulesNew/transitTime',
  getSingleShipmentUrl: '/BusinessRulesNew/singleShipmentCheck',
  setMasterDataUrl: '/RecentRate?access_token=',
  getARSetMasterDataUrl: '/RecentRate?filter[where][type]=AP',
  getZipcodeStateCityUrl: '/ZipCodeState?filter[where][zipCode]=',
  createQuoteNumberUrl: '/QuoteDetailsNew/createQuoteAndRateDetails',
  getRulesUrl: '/BusinessRulesNew/ruleCheck',
  specialInstructionTemplateUrl: '/specialInstructionTemplate'
}



export const classFactorValue = [400, 300, 250, 175, 125, 100, 92.5, 85, 70, 65, 60]


var data = { "ProcessShipmentRequest": {
  "WebAuthenticationDetail": {
    "UserCredential": {
      "Key": "xqvfXggi886NlSyk",
        "Password": "SUDFEQ6ZrdyBkg28Q2bXhBMz6"
    }
  },
  "ClientDetail": {
    "AccountNumber": "510087380",
      "MeterNumber": "118858493"
  },
  "TransactionDetail": {
    "CustomerTransactionId": "Freight Bill-To Shipment Example"
  },
  "Version": {
    "ServiceId": "ship",
      "Major": "21",
      "Intermediate": "0",
      "Minor": "0"
  },
  "RequestedShipment": {
    "ShipTimestamp": "2018-04-24T12:00:00-05:00",
      "DropoffType": "REGULAR_PICKUP",
      "ServiceType": "FEDEX_FREIGHT_ECONOMY",
      "PackagingType": "YOUR_PACKAGING",
      "Shipper": {
      "Contact": {
        "CompanyName": "Forte Logistics",
          "PhoneNumber": "4255918506"
      },
      "Address": {
        "StreetLines": [
          "1202 Chalet Ln",
          "Do Not Delete - Test Account"
        ],
          "City": "Issaquah",
          "StateOrProvinceCode": "WA",
          "PostalCode": "72601",
          "CountryCode": "USA"
      }
    },
    "Recipient": {
      "Contact": {
        "CompanyName": "ABC Widget Co",
          "PhoneNumber": "4255918506"
      },
      "Address": {
        "StreetLines": [
          "1234 Main St",
          "Suite 200"
        ],
          "City": "Akron",
          "StateOrProvinceCode": "OH",
          "PostalCode": "44333",
          "CountryCode": "US",
          "Residential": "false"
      }
    },
    "ShippingChargesPayment": {
      "PaymentType": "SENDER",
        "Payor": {
        "ResponsibleParty": {
          "AccountNumber": "510051408",
            "Contact": null
        }
      }
    },
    "SpecialServicesRequested": {
      "SpecialServiceTypes": "EVENT_NOTIFICATION",
        "EventNotificationDetail": {
        "AggregationType": "PER_SHIPMENT",
          "EventNotifications": {
          "Role": "SHIPPER",
            "Events": [
            "ON_TENDER",
            "ON_EXCEPTION",
            "ON_DELIVERY"
          ],
            "NotificationDetail": {
            "NotificationType": "EMAIL",
              "EmailDetail": {
              "EmailAddress": "aedward.lux@innovativesolutionsdelivered.com"
            },
            "Localization": {
              "LanguageCode": "EN"
            }
          },
          "FormatSpecification": {
            "Type": "HTML"
          }
        }
      }
    },
    "FreightShipmentDetail": {
      "AlternateBilling": {
        "AccountNumber": "510051408",
          "Contact": {
          "CompanyName": "Third-Party Company",
            "PhoneNumber": "8705551234"
        },
        "Address": {
          "StreetLines": [
            "2000 Freight LTL Testing",
            "Do Not Delete - Test Account"
          ],
            "City": "Harrison",
            "StateOrProvinceCode": "AR",
            "PostalCode": "72601",
            "CountryCode": "US"
        }
      },
      "PrintedReferences": [
        {
          "Type": "SHIPPER_ID_NUMBER",
          "Value": "ref1234"
        },
        {
          "Type": "CONSIGNEE_ID_NUMBER",
          "Value": "ref5678"
        }
      ],
        "Role": "SHIPPER",
        "TotalHandlingUnits": "1",
        "Comment": "Freight Shipment Comment Here",
        "LineItems": {
        "FreightClass": "CLASS_050",
          "HandlingUnits": "1",
          "Packaging": "PALLET",
          "Pieces": "1",
          "PurchaseOrderNumber": "PO1234",
          "Description": "School Text Books",
          "Weight": {
          "Units": "LB",
            "Value": "200.00"
        },
        "Dimensions": {
          "Length": "150",
            "Width": "90",
            "Height": "100",
            "Units": "IN"
        }
      }
    },
    "DeliveryInstructions": "Special Delivery Instructions Here",
      "LabelSpecification": {
      "LabelFormatType": "FEDEX_FREIGHT_STRAIGHT_BILL_OF_LADING",
        "ImageType": "PDF",
        "LabelStockType": "PAPER_LETTER"
    },
    "ShippingDocumentSpecification": {
      "ShippingDocumentTypes": "FREIGHT_ADDRESS_LABEL",
        "FreightAddressLabelDetail": {
        "Format": {
          "ImageType": "PDF",
            "StockType": "PAPER_4X6"
        }
      }
    },
    "PackageCount": "1"
  }
}
}
