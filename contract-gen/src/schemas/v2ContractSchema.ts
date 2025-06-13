import { z } from "zod";

const stringOrNull = z.string().nullable();
const booleanOrNull = z.boolean().nullable();

const addressSchema = z.object({
  addressLine1: stringOrNull,
  addressLine2: stringOrNull,
  addressLine3: stringOrNull,
  city: stringOrNull,
  state: stringOrNull,
  country: stringOrNull,
  postalCode: stringOrNull,
}).strict();

const customerInfoSchema = z.object({
  address: addressSchema,
  firstName: stringOrNull,
  lastName: stringOrNull,
  phoneNumber: stringOrNull,
  reset: stringOrNull,
  cardType: stringOrNull,
  customerName: stringOrNull,
  customerType: stringOrNull,
  dayPhone: stringOrNull,
  email: stringOrNull,
  loginID: stringOrNull,
  oldEmail: stringOrNull,
  organizationName: stringOrNull,
  passwordUrl: stringOrNull,
  svocIdValue: stringOrNull,
}).strict();

const orderItemPricingSchema = z.object({
  productTotalAmount: stringOrNull,
  unitPrice: stringOrNull,
}).strict();

const orderItemSchema = z.object({
  itemDescription: stringOrNull,
  orderItemPricing: orderItemPricingSchema,
  productCode: stringOrNull,
  productGUID: stringOrNull,
  quantity: stringOrNull,
  sKUCode: stringOrNull,
}).strict();

const orderItemsSchema = z.object({
  orderItem: orderItemSchema,
}).strict();

const customerInfoOrderSchema = z.object({
  emailId: stringOrNull,
  firstName: stringOrNull,
  lastName: stringOrNull,
}).strict();

const emailOrderRequestSchema = z.object({
  order: z.object({
    customerInfo: customerInfoOrderSchema,
    orderDate: stringOrNull,
    orderItems: z.array(orderItemsSchema),
    orderNumber: stringOrNull,
    restructuredBO: z.object({
      bOType: stringOrNull,
      expectedCancelDate: stringOrNull,
    }),
  }),
}).strict();

const updatedReportOptionsSchema = z.object({
  backendName: stringOrNull,
  displayName: stringOrNull,
  isChecked: booleanOrNull,
}).strict();

const documentDetailsSchema = z.object({
  outputFileName: stringOrNull,
  outputFormat: stringOrNull,
  quoteId: stringOrNull,
  reportId: stringOrNull,
  reportUrl: stringOrNull,
  updatedReportOptions: z.array(updatedReportOptionsSchema),
  userName: stringOrNull,
}).strict();

const fromSchema = z.object({
  email: stringOrNull,
  name: stringOrNull,
}).strict();

const metadataSchema = z.object({
  key: stringOrNull,
  value: stringOrNull,
}).strict();

const optInSchema = z.object({
  customerGoldenRecordID: stringOrNull,
  onlineEvoiceOptIn: stringOrNull,
  onlineSmsOptIn: stringOrNull,
  extnCustomerNotificationPreference: stringOrNull,
  extnSVOCPRSNCustID: stringOrNull,
}).strict();

const hdWillCallListSchema = z.object({
  contactName: stringOrNull,
  scheduledPickUpTs: stringOrNull,
  statusCd: stringOrNull,
  statusCdDesc: stringOrNull,
  willCallLineNum: stringOrNull,
}).strict();

const listIdSchema = z.object({
  brandName: stringOrNull,
  modelNumber: stringOrNull,
  productDisplayUrl: stringOrNull,
  productImageUrl: stringOrNull,
  productLabel: stringOrNull,
  rating: stringOrNull,
  reviewCount: stringOrNull,
}).strict();

const paymentCardSchema = z.object({
  cardType: stringOrNull,
  citiAccountLast4Digits: stringOrNull,
  last4Digits: stringOrNull,
  nickName: stringOrNull,
}).strict();

const receiptLineSchema = z.object({
  data: stringOrNull,
  imageLocation: stringOrNull,
  justification: stringOrNull,
  link: stringOrNull,
  type: stringOrNull,
  width: stringOrNull,
}).strict();

const receiptSchema = z.object({
  lines: z.array(receiptLineSchema),
}).strict();

const storeDetailsSchema = z.object({
  address: addressSchema.partial(),
  phoneNumber: stringOrNull,
  storeNumber: stringOrNull,
  storeName: stringOrNull,
  streetAddress: stringOrNull,
  city: stringOrNull,
  state: stringOrNull,
  zip: stringOrNull,
}).strict();

const reservationSchema = z.object({
  cancelResvLink: stringOrNull,
  createResvLink: stringOrNull,
  day: stringOrNull,
  manageResvLink: stringOrNull,
  optOutCode: stringOrNull,
  pickupDate: stringOrNull,
  pickupTime: stringOrNull,
  reservationId: stringOrNull,
  returnDate: stringOrNull,
  returnTime: stringOrNull,
  storeDetails: storeDetailsSchema,
  vehicleRental: stringOrNull,
}).strict();

const toSchema = z.object({
  email: stringOrNull,
  id: stringOrNull,
  firstName: stringOrNull,
  lastName: stringOrNull,
  sms: stringOrNull,
  evoice: stringOrNull,
}).strict();

const customerInfoBillToSchema = z.object({
  firstName: stringOrNull,
  lastName: stringOrNull,
  phoneNumber: stringOrNull,
  email: stringOrNull,
  address: addressSchema.extend({
    dayPhone: stringOrNull,
  }),
}).strict();

const paymentSchema = z.object({
  cardNbr: stringOrNull,
  isHomeDepotCreditCard: stringOrNull,
  paymentType: stringOrNull,
  tenderAmount: stringOrNull,
}).strict();

const totalSchema = z.object({
  additionalShippingCharges: stringOrNull,
  deliveryFee: stringOrNull,
  discount: stringOrNull,
  expressDeliveryCharge: stringOrNull,
  salesTax: stringOrNull,
  shippingFee: stringOrNull,
  subTotal: stringOrNull,
  total: stringOrNull,
  totalRefundAmount: stringOrNull,
}).strict();

const updatedWorkOrderSchema = z.object({
  workOrderNo: stringOrNull,
  reasonCode: stringOrNull,
}).strict();

const lineItemChargeSchema = z.object({
  chargeAmount: stringOrNull,
  chargeCategory: stringOrNull,
  chargePerLine: stringOrNull,
  isBillable: stringOrNull,
  isDiscount: stringOrNull,
  isShippingCharge: stringOrNull,
}).strict();

const lineItemTaxSchema = z.object({
  tax: stringOrNull,
}).strict();

const eligibleProtectionPlanSchema = z.object({
  id: stringOrNull,
  type: stringOrNull,
  description: stringOrNull,
  url: stringOrNull,
  mfgBrandName: stringOrNull,
  unitPrice: stringOrNull,
  duration: stringOrNull,
  planDetailsUrl: stringOrNull,
}).strict();

const partServiceSchema = z.object({
  itemDescription: stringOrNull,
  itemTotal: stringOrNull,
  quantity: stringOrNull,
  unitPrice: stringOrNull,
}).strict();

const personInfoShipToSchema = z.object({
  AddressLine1: stringOrNull,
  City: stringOrNull,
  DayPhone: stringOrNull,
  FirstName: stringOrNull,
  LastName: stringOrNull,
  MobilePhone: stringOrNull,
  State: stringOrNull,
  ZipCode: stringOrNull,
}).strict();

const serviceSchema = z.object({
  serviceType: stringOrNull,
  unitPrice: stringOrNull,
  totalPrice: stringOrNull,
  quantity: stringOrNull,
  agreementURL: stringOrNull,
}).strict();

const serviceLevelDescriptionSchema = z.object({
  description: stringOrNull,
}).strict();

const lineItemSchema = z.object({
  aisle: stringOrNull,
  assembly: stringOrNull,
  bay: stringOrNull,
  cancelQuantity: stringOrNull,
  colorName: stringOrNull,
  creditLineAmount: stringOrNull,
  currentBalance: stringOrNull,
  currentShippedQuantity: stringOrNull,
  damageComment: stringOrNull,
  damagedQuantity: stringOrNull,
  deliveryMethod: stringOrNull,
  discount: stringOrNull,
  dollarOff: stringOrNull,
  eligibleProtectionPlans: z.array(eligibleProtectionPlanSchema),
  modelNumber: stringOrNull,
  expectedDateEnd: stringOrNull,
  expectedDateStart: stringOrNull,
  fourDigitCardNumber: stringOrNull,
  fulfillmentType: stringOrNull,
  imageURL: stringOrNull,
  internetSku: stringOrNull,
  isBackOrdered: stringOrNull,
  isReorderedLine: stringOrNull,
  itemDescription: stringOrNull,
  itemTotal: stringOrNull,
  lineCharges: z.array(lineItemChargeSchema),
  lineItemId: stringOrNull,
  lineItemType: stringOrNull,
  lineTaxes: z.array(lineItemTaxSchema),
  manufacturerName: stringOrNull,
  maxLineStatus: stringOrNull,
  minLineStatus: stringOrNull,
  model: stringOrNull,
  orderedDateExpected: stringOrNull,
  partService: z.array(partServiceSchema),
  personInfoShipTo: personInfoShipToSchema,
  pickType: stringOrNull,
  pickupDate: stringOrNull,
  pickupStatus: stringOrNull,
  previousBalance: stringOrNull,
  productURL: stringOrNull,
  quantity: stringOrNull,
  releaseType: stringOrNull,
  rgb: stringOrNull,
  service: z.array(serviceSchema),
  serviceLevelDescriptions: z.array(serviceLevelDescriptionSchema),
  serviceLevelType: stringOrNull,
  shortItemDescription: stringOrNull,
  shippingDescription: stringOrNull,
  shippingLongDescription: stringOrNull,
  storeNumber: stringOrNull,
  storeSku: stringOrNull,
  unitPrice: stringOrNull,
  willCallLineNum: stringOrNull,
}).strict();

const orderStatusSchema = z.object({
  Status: stringOrNull,
  StatusDescription: stringOrNull,
}).strict();

const customerInfoShipToSchema = z.object({
  address: addressSchema,
  customerType: stringOrNull,
  dayPhone: stringOrNull,
  email: stringOrNull,
  firstName: stringOrNull,
  lastName: stringOrNull,
  phoneNumber: stringOrNull,
}).strict();

const customerInfoMarkForSchema = z.object({
  address: addressSchema,
  customerType: stringOrNull,
  dayPhone: stringOrNull,
  email: stringOrNull,
  firstName: stringOrNull,
  lastName: stringOrNull,
  phoneNumber: stringOrNull,
}).strict();

const deliverySchema = z.object({
  deliveryDate: stringOrNull,
  deliveryDateTimeStart: stringOrNull,
  deliveryDateTimeEnd: stringOrNull,
  deliveryMessage: stringOrNull,
  deliveryMethod: stringOrNull,
  deliveryStatus: stringOrNull,
  deliveryTimeEnd: stringOrNull,
  deliveryTimeRange: stringOrNull,
  deliveryTimeStart: stringOrNull,
  instructionMessage: stringOrNull,
  originalETA: stringOrNull,
  revisedDeliveryDate: stringOrNull,
  revisedTimeEnd: stringOrNull,
  revisedTimeStart: stringOrNull,
  split: stringOrNull,
  trackingNumber: stringOrNull,
  vehicleType: stringOrNull,
  trackingUrl: stringOrNull,
}).strict();

const installationProviderSchema = z.object({
  installDate: stringOrNull,
  installUrl: stringOrNull,
  vendorId: stringOrNull,
  vendorName: stringOrNull,
}).strict();

const workOrderOrItemGroupSchema = z.object({
  cancelCode: stringOrNull,
  cancelDate: stringOrNull,
  customerInfoShipTo: customerInfoShipToSchema,
  customerInfoMarkFor: customerInfoMarkForSchema,
  delivery: deliverySchema,
  expectedDate: stringOrNull,
  fulfillmentType: stringOrNull,
  installationProvider: installationProviderSchema,
  lineItems: z.array(lineItemSchema),
  orderStatus: orderStatusSchema,
  pickUpDate: stringOrNull,
  pickupLocation: stringOrNull,
  specialInstruction: stringOrNull,
  storeNumber: stringOrNull,
  workOrderNumber: stringOrNull,
}).strict();

const orderSchema = z.object({
  carrier: stringOrNull,
  carrierName: stringOrNull,
  customerInfoBillTo: customerInfoBillToSchema,
  curbSidePickupOnlyStoresPresent: booleanOrNull,
  customerServiceAgreementUrl: stringOrNull,
  customerZipCode: stringOrNull,
  extnClientExternalSrcProcess: stringOrNull,
  isPartial: stringOrNull,
  isPolicyChangeVerbiageEnabled: stringOrNull,
  maxOrderStatus: stringOrNull,
  minOrderStatus: stringOrNull,
  multiShipmentOrder: booleanOrNull,
  optionalFields: z.object({
    orderNumber: stringOrNull,
  }),
  orderDate: stringOrNull,
  orderEndDate: stringOrNull,
  orderNumber: stringOrNull,
  orderStartDate: stringOrNull,
  orderType: stringOrNull,
  payment: paymentSchema,
  poJobCode: stringOrNull,
  sourceCd: stringOrNull,
  storeNumbers: z.array(z.any()),
  storeNumber: stringOrNull,
  total: totalSchema,
  totalItemCount: stringOrNull,
  trackingNumber: stringOrNull,
  trackingUrl: stringOrNull,
  validUntilDate: stringOrNull,
  viewCartURL: stringOrNull,
  widgetUrl: stringOrNull,
  updatedWorkOrders: z.array(updatedWorkOrderSchema),
  workOrdersOrItemGroups: z.array(workOrderOrItemGroupSchema),
}).strict();


const baseSchema = z.object({
  appName: stringOrNull,
  attachments: z.array(
    z.object({
      content: stringOrNull,
      contentType: stringOrNull,
      fileName: stringOrNull,
    })
  ),
  attributes: z.object({
    clientId: stringOrNull,
  }),
  contactNumber: stringOrNull,
  deepLink: stringOrNull,
  digest: z.object({
    countryCode: stringOrNull,
    startTime: stringOrNull,
    endTime: stringOrNull,
    storeNumber: stringOrNull,
    zipCode: stringOrNull,
  }),
  documentDetails: documentDetailsSchema,
  from: fromSchema,
  locale: stringOrNull,
  locations: z.array(z.any()),
  major: stringOrNull,
  metadata: z.array(metadataSchema),
  optIn: optInSchema,
  profile: stringOrNull,
  requestMessageId: stringOrNull,
  subject: stringOrNull,
  emailOrderRequest: emailOrderRequestSchema,
  admin: stringOrNull,
  allOrders: stringOrNull,
  allowanceAmount: stringOrNull,
  appointment: z.object({
    appointmentMode: stringOrNull,
    appointmentType: stringOrNull,
    dateEnd: stringOrNull,
    dateStart: stringOrNull,
    dateTime: stringOrNull,
    emailType: stringOrNull,
    projectType: stringOrNull,
    storeNumber: stringOrNull,
    storeType: stringOrNull,
    timeEnd: stringOrNull,
    timeStart: stringOrNull,
    timeZone: stringOrNull,
    webexUrl: stringOrNull,
  }),
  approvedStates: z.array(z.any()),
  associateFirstName: stringOrNull,
  body: stringOrNull,
  businessName: stringOrNull,
  companyName: stringOrNull,
  customerExperience: stringOrNull,
  customerInfo: customerInfoSchema,
  expirationTs: stringOrNull,
  extnHostSrcProcess: stringOrNull,
  faqUrl: stringOrNull,
  flags: z.object({
    registeredType: stringOrNull,
  }),
  flocStore: stringOrNull,
  frequency: stringOrNull,
  giftCardPresent: z.boolean().nullable(),
  hdWillCallList: z.array(hdWillCallListSchema),
  highVolumeVerbiage: stringOrNull,
  invitationUrl: stringOrNull,
  isAdminInvite: z.boolean().nullable(),
  isRunnerInvite: z.boolean().nullable(),
  lastModifiedDt: stringOrNull,
  listId: z.array(listIdSchema),
  listMessage: stringOrNull,
  listName: stringOrNull,
  medalliaSurveyUrl: stringOrNull,
  message: stringOrNull,
  militaryDiscountApplied: stringOrNull,
  myAccountLink: stringOrNull,
  name: stringOrNull,
  optOutAllLink: stringOrNull,
  optOutCode: stringOrNull,
  optOutLink: stringOrNull,
  order: orderSchema,
  paymentCard: paymentCardSchema,
  postMessage: stringOrNull,
  preMessage: stringOrNull,
  proContactNumber: stringOrNull,
  reason: stringOrNull,
  receipt: receiptSchema,
  redemptionCode: stringOrNull,
  redirectUrl: stringOrNull,
  rejectedStates: z.array(z.any()),
  rejectionReasons: z.array(z.any()),
  reservation: reservationSchema,
  runner: stringOrNull,
  security: z.object({
    date: stringOrNull,
    deviceCity: stringOrNull,
    deviceOS: stringOrNull,
    passcode: stringOrNull,
    passwordResetUrl: stringOrNull,
    phone: stringOrNull,
  }),
  selfAssign: stringOrNull,
  shortUrls: stringOrNull,
  signOutTimestamp: stringOrNull,
  sku: stringOrNull,
  sourceCd: stringOrNull,
  status: stringOrNull,
  storeDetails: storeDetailsSchema,
  storeNumber: stringOrNull,
  storePhoneNumber: stringOrNull,
  supportForm: stringOrNull,
  supportPhone: stringOrNull,
  surveyLink: stringOrNull,
  taxExemptId: stringOrNull,
  taxExemptPortalUploadLink: stringOrNull,
  total: z.object({
    discount: stringOrNull,
    salesTax: stringOrNull,
    shippingFee: stringOrNull,
    subTotal: stringOrNull,
    total: stringOrNull,
  }),
  totalCardsRemoved: stringOrNull,
  transactionType: stringOrNull,
  updateUrl: stringOrNull,
  url: stringOrNull,
  userRole: stringOrNull,
  weatherVerbiageEnabled: stringOrNull,
  workShop: z.object({
    date: stringOrNull,
    message: stringOrNull,
    name: stringOrNull,
    time: stringOrNull,
  }),
  workOrdersDeliveryWindows: z.record(z.any()),
  templateVersion: stringOrNull,
  to: z.array(toSchema),
}).strict();

// Make all fields optional, but disallow extra fields
export const v2ContractSchema = baseSchema.deepPartial().strict();