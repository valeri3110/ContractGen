import { z } from "zod";

// Helper types
const stringOrNull = z.string().nullable();
const booleanOrNull = z.boolean().nullable();
const numberOrNull = z.number().nullable();

// Definitions
const toSchema = z
  .object({
    email: stringOrNull,
    id: stringOrNull,
    firstName: stringOrNull,
    lastName: stringOrNull,
    sms: stringOrNull,
    evoice: stringOrNull,
  })
  .passthrough();

const fromSchema = z
  .object({
    email: stringOrNull,
    name: stringOrNull,
  })
  .passthrough();

const optInSchema = z
  .object({
    customerGoldenRecordID: stringOrNull,
    onlineEvoiceOptIn: booleanOrNull,
    onlineSmsOptIn: booleanOrNull,
    extnCustomerNotificationPreference: stringOrNull,
    extnSVOCPRSNCustID: stringOrNull,
  })
  .passthrough();

const digestSchema = z
  .object({
    countryCode: stringOrNull,
    startTime: stringOrNull,
    endTime: stringOrNull,
    storeNumber: stringOrNull,
    zipCode: stringOrNull,
  })
  .passthrough();

const securitySchema = z
  .object({
    date: stringOrNull,
    deviceCity: stringOrNull,
    deviceOS: stringOrNull,
    passcode: stringOrNull,
    passwordResetUrl: stringOrNull,
    phone: stringOrNull,
  })
  .passthrough();

const metadataSchema = z
  .object({
    key: stringOrNull,
    value: stringOrNull,
  })
  .passthrough();

const addressSchema = z
  .object({
    addressLine1: stringOrNull,
    addressLine2: stringOrNull,
    addressLine3: stringOrNull,
    city: stringOrNull,
    state: stringOrNull,
    country: stringOrNull,
    postalCode: stringOrNull,
  })
  .passthrough();

const customerInfoSchema = z
  .object({
    address: addressSchema,
    firstName: stringOrNull,
    lastName: stringOrNull,
    phoneNumber: stringOrNull,
    dayPhone: stringOrNull,
    email: stringOrNull,
  })
  .passthrough();

const deliverySchema = z
  .object({
    deliveryDate: stringOrNull,
    deliveryDateTimeStart: stringOrNull,
    deliveryDateTimeEnd: stringOrNull,
    deliveryMessage: stringOrNull,
    deliveryMethod: stringOrNull,
    deliveryStatus: stringOrNull,
    instructionMessage: stringOrNull,
    originalETA: stringOrNull,
    revisedDeliveryDate: stringOrNull,
    revisedTimeEnd: stringOrNull,
    revisedTimeStart: stringOrNull,
    split: booleanOrNull,
    trackingNumber: stringOrNull,
    vehicleType: stringOrNull,
    trackingUrl: stringOrNull,
  })
  .passthrough();

const paymentSchema = z
  .object({
    cardNbr: stringOrNull,
    isHomeDepotCreditCard: booleanOrNull,
    paymentType: stringOrNull,
    tenderAmount: stringOrNull,
  })
  .passthrough();

const totalSchema = z
  .object({
    deliveryCharge: stringOrNull,
    expressDeliveryCharge: stringOrNull, 
    discount: stringOrNull,
    salesTax: stringOrNull,
    shippingFee: stringOrNull,
    subTotal: stringOrNull,
    total: stringOrNull,
    totalRefundAmount: stringOrNull,
  })
  .passthrough();

const eligibleProtectionPlanSchema = z
  .object({
    id: stringOrNull,
    type: stringOrNull,
    description: stringOrNull,
    url: stringOrNull,
    mfgBrandName: stringOrNull,
    unitPrice: stringOrNull,
    duration: stringOrNull,
    planDetailsUrl: stringOrNull,
  })
  .passthrough();

const partServiceSchema = z
  .object({
    itemDescription: stringOrNull,
    shortItemDescription: stringOrNull,
    lineItemType: stringOrNull,
    storeSku: stringOrNull,
    itemTotal: stringOrNull,
    quantity:  z.union([z.string(), z.number(), z.null()]),
    unitPrice: stringOrNull,
  })
  .passthrough();

const serviceSchema = z
  .object({
    serviceType: stringOrNull,
    unitPrice: stringOrNull,
    totalPrice: stringOrNull,
    quantity: z.union([z.string(), z.number(), z.null()]),
    agreementURL: stringOrNull,
  })
  .passthrough();

const installationProviderSchema = z
  .object({
    installDate: stringOrNull,
    installUrl: stringOrNull,
    vendorId: stringOrNull,
    vendorName: stringOrNull,
  })
  .passthrough();

const lineItemSchema = z
  .object({
    aisle: stringOrNull,
    bay: stringOrNull,
    cancelQuantity: stringOrNull,
    colorName: stringOrNull,
    deliveryMethod: stringOrNull,
    eligibleProtectionPlans: z.array(eligibleProtectionPlanSchema).nullable(),
    modelNumber: stringOrNull,
    fulfillmentType: stringOrNull,
    imageURL: stringOrNull,
    internetSku: stringOrNull,
    itemDescription: stringOrNull,
    itemTotal: stringOrNull,
    manufacturerName: stringOrNull,
    model: stringOrNull,
    partService: z.array(partServiceSchema).nullable(),
    productURL: stringOrNull,
    quantity: z.union([z.string(), z.number(), z.null()]),
    rgb: stringOrNull,
    service: z.array(serviceSchema).nullable(),
    serviceLevelType: stringOrNull,
    shortItemDescription: stringOrNull,
    storeNumber: stringOrNull,
    storeSku: stringOrNull,
    unitPrice: stringOrNull,
  })
  .passthrough();

const workOrderOrItemGroupSchema = z
  .object({
    cancelCode: stringOrNull,
    cancelDate: stringOrNull,
    customerInfoShipTo: customerInfoSchema,
    customerInfoMarkFor: customerInfoSchema,
    delivery: deliverySchema,
    fulfillmentType: stringOrNull,
    installationProvider: installationProviderSchema,
    lineItems: z.array(lineItemSchema),
    pickUpDate: stringOrNull,
    pickupLocation: stringOrNull,
    specialInstruction: stringOrNull,
    storeNumber: stringOrNull,
    workOrderNumber: stringOrNull,
  })
  .passthrough();

const updatedWorkOrderSchema = z
  .object({
    workOrderNo: stringOrNull,
    reasonCode: stringOrNull,
  })
  .passthrough();

const orderSchema = z
  .object({
    carrier: stringOrNull,
    carrierName: stringOrNull,
    customerInfoBillTo: customerInfoSchema,
    customerServiceAgreementUrl: stringOrNull,
    extnClientExternalSrcProcess: stringOrNull,
    isPartial: stringOrNull,
    multiShipmentOrder: booleanOrNull,
    orderDate: stringOrNull,
    orderNumber: stringOrNull,
    orderType: stringOrNull,
    payment: paymentSchema,
    poJobCode: stringOrNull,
    sourceCd: stringOrNull,
    storeNumber: stringOrNull,
    total: totalSchema,
    totalItemCount: stringOrNull,
    viewCartURL: stringOrNull,
    updatedWorkOrders: z.array(updatedWorkOrderSchema).nullable(),
    workOrdersOrItemGroups: z.array(workOrderOrItemGroupSchema),
  })
  .passthrough();

// Domain/Journey Specific Fields
const reservationSchema = z
  .object({
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
    vehicleRental: stringOrNull,
  })
  .passthrough();

const appointmentSchema = z
  .object({
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
  })
  .passthrough();

const workShopSchema = z
  .object({
    date: stringOrNull,
    message: stringOrNull,
    name: stringOrNull,
    time: stringOrNull,
  })
  .passthrough();

// Base Schema for V2 Contract
const baseSchema = z
  .object({
    appName: stringOrNull,
    attributes: z.object({
      clientId: stringOrNull,
    }).passthrough(),
    digest: digestSchema,
    security: securitySchema,
    from: fromSchema,
    locale: stringOrNull,
    locations: z.array(z.any()),
    metadata: z.array(metadataSchema).nullable(),
    optIn: optInSchema,
    profile: stringOrNull,
    requestMessageId: stringOrNull,
    subject: stringOrNull,
    isAdmin: booleanOrNull,
    allowanceAmount: stringOrNull,
    appointment: appointmentSchema,
    approvedStates: z.array(z.any()),
    associateFirstName: stringOrNull,
    businessName: stringOrNull,
    companyName: stringOrNull,
    customerExperience: stringOrNull,
    customerInfo: customerInfoSchema,
    extnHostSrcProcess: stringOrNull,
    flocStore: stringOrNull,
    frequency: stringOrNull,
    giftCardPresent: booleanOrNull,
    highVolumeVerbiage: stringOrNull,
    invitationUrl: stringOrNull,
    isAdminInvite: booleanOrNull,
    isRunnerInvite: booleanOrNull,
    lastModifiedDt: stringOrNull,
    militaryDiscountApplied: booleanOrNull,
    myAccountLink: stringOrNull,
    optOutAllLink: stringOrNull,
    optOutCode: stringOrNull,
    optOutLink: stringOrNull,
    order: orderSchema,
    paymentCard: z.object({
      cardType: stringOrNull,
      last4Digits: stringOrNull,
    }).passthrough().nullable(),
    redemptionCode: stringOrNull,
    reservation: reservationSchema,
    signOutTimestamp: stringOrNull,
    storeNumber: stringOrNull,
    supportPhone: stringOrNull,
    surveyLink: stringOrNull,
    taxExemptId: stringOrNull,
    taxExemptPortalUploadLink: stringOrNull,
    totalCardsRemoved: stringOrNull,
    transactionType: stringOrNull,
    weatherVerbiageEnabled: booleanOrNull,
    workShop: workShopSchema,
    to: z.array(toSchema),
  })
  .passthrough();

// Makes all fields optional, but allow extra fields
export const v2ContractPassthroughSchema = baseSchema.deepPartial().passthrough();
