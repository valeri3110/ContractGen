import { z } from "zod";

// Helper types
const stringOrNull = z.string().nullable().optional();
const booleanOrNull = z.boolean().nullable().optional();
const numberOrNull = z.number().nullable().optional();

// Definitions
const toSchema = z
  .object({
    email: z.string(),
    id: stringOrNull,
    firstName: z.string(),
    lastName: stringOrNull,
    sms: stringOrNull,
    evoice: stringOrNull,
  })
  .strict();

const fromSchema = z
  .object({
    email: stringOrNull,
    name: stringOrNull,
  })
  .strict().optional();

const optInSchema = z
  .object({
    customerGoldenRecordID: stringOrNull,
    onlineEvoiceOptIn: booleanOrNull,
    onlineSmsOptIn: booleanOrNull,
    extnCustomerNotificationPreference: stringOrNull,
    extnSVOCPRSNCustID: stringOrNull,
  })
  .strict().optional();

const digestSchema = z
  .object({
    countryCode: stringOrNull,
    startTime: stringOrNull,
    endTime: stringOrNull,
    storeNumber: stringOrNull,
    zipCode: stringOrNull,
  })
  .strict().optional();

const securitySchema = z
  .object({
    date: stringOrNull,
    deviceCity: stringOrNull,
    deviceOS: stringOrNull,
    passcode: stringOrNull,
    passwordResetUrl: stringOrNull,
    phone: stringOrNull,
  })
  .strict().optional();

const metadataSchema = z
  .object({
    key: stringOrNull,
    value: stringOrNull,
  })
  .strict().optional();

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
  .strict().optional();

const customerInfoSchema = z
  .object({
    address: addressSchema,
    firstName: stringOrNull,
    lastName: stringOrNull,
    phoneNumber: stringOrNull,
    email: stringOrNull,
  })
  .strict().optional();

const deliverySchema = z
  .object({
    firstEnrouteFlag: booleanOrNull,
    deliveryDateTimeDone: stringOrNull,
    deliveryDateTimeStart: stringOrNull,
    deliveryDateTimeEnd: stringOrNull,
    deliveryMessage: stringOrNull,
    deliveryMethod: stringOrNull,
    deliveryStatus: stringOrNull,
    instructionMessage: stringOrNull,
    originalETA: stringOrNull,
    revisedDeliveryDate: stringOrNull,
    split: booleanOrNull,
    trackingNumber: stringOrNull,
    vehicleType: stringOrNull,
    trackingUrl: stringOrNull,
  })
  .strict().optional();

const paymentSchema = z
  .object({
    cardNbr: stringOrNull,
    isHomeDepotCreditCard: booleanOrNull,
    paymentType: stringOrNull,
    tenderAmount: stringOrNull,
  })
  .strict().optional();

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
  .strict().optional();

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
  .strict().optional();

const partServiceSchema = z
  .object({
    itemDescription: stringOrNull,
    shortItemDescription: stringOrNull,
    lineItemType: stringOrNull,
    storeSku: stringOrNull,
    itemTotal: stringOrNull,
    quantity: z.union([z.string(), z.number(), z.null()]),
    unitPrice: stringOrNull,
  })
  .strict().optional();

const serviceSchema = z
  .object({
    serviceType: stringOrNull,
    unitPrice: stringOrNull,
    totalPrice: stringOrNull,
    quantity: z.union([z.string(), z.number(), z.null()]),
    agreementURL: stringOrNull,
  })
  .strict().optional();

const installationProviderSchema = z
  .object({
    installDate: stringOrNull,
    installUrl: stringOrNull,
    vendorId: stringOrNull,
    vendorName: stringOrNull,
  })
  .strict().optional();

const lineItemSchema = z
  .object({
    aisle: stringOrNull,
    bay: stringOrNull,
    cancelQuantity: stringOrNull,
    colorName: stringOrNull,
    deliveryMethod: stringOrNull,
    eligibleProtectionPlans: z.array(eligibleProtectionPlanSchema).nullable().optional(),
    modelNumber: stringOrNull,
    fulfillmentType: stringOrNull,
    imageURL: stringOrNull,
    internetSku: stringOrNull,
    itemDescription: stringOrNull,
    itemTotal: stringOrNull,
    manufacturerName: stringOrNull,
    model: stringOrNull,
    partService: z.array(partServiceSchema).nullable().optional(),
    productURL: stringOrNull,
    quantity: z.union([z.string(), z.number(), z.null()]),
    rgb: stringOrNull,
    service: z.array(serviceSchema).nullable().optional(),
    serviceLevelType: stringOrNull,
    shortItemDescription: stringOrNull,
    storeNumber: stringOrNull,
    storeSku: stringOrNull,
    unitPrice: stringOrNull,
  })
  .strict();

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
    flocStore: stringOrNull,
    workOrderNumber: stringOrNull,
  })
  .strict();

const updatedWorkOrderSchema = z
  .object({
    workOrderNo: stringOrNull,
    reasonCode: stringOrNull,
  })
  .strict().optional();

const orderSchema = z
  .object({
    carrier: stringOrNull,
    carrierName: stringOrNull,
    customerInfoBillTo: z.object({
      address: addressSchema,
      firstName: stringOrNull,
      lastName: stringOrNull,
    }).strict().optional(),
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
    stopNumber: stringOrNull,
    viewCartURL: stringOrNull,
    updatedWorkOrders: z.array(updatedWorkOrderSchema).nullable().optional(),
    workOrdersOrItemGroups: z.array(workOrderOrItemGroupSchema),
  })
  .strict();

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
  .strict().optional();

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
  .strict().optional();

const workShopSchema = z
  .object({
    date: stringOrNull,
    message: stringOrNull,
    name: stringOrNull,
    time: stringOrNull,
  })
  .strict().optional();

// Base Schema for V2 Contract
const baseSchema = z
  .object({
    appName: stringOrNull,
    attributes: z.object({
      clientId: stringOrNull,
    }),
    digest: digestSchema,
    security: securitySchema,
    from: fromSchema,
    locale: stringOrNull,
    locations: z.array(z.any()).optional(),
    metadata: z.array(metadataSchema).nullable().optional(),
    optIn: optInSchema,
    profile: stringOrNull,
    requestMessageId: stringOrNull,
    subject: stringOrNull,
    isAdmin: booleanOrNull,
    allowanceAmount: stringOrNull,
    signatureRequired: booleanOrNull,
    appointment: appointmentSchema,
    approvedStates: z.array(z.any()).optional(),
    associateFirstName: stringOrNull,
    businessName: stringOrNull,
    companyName: stringOrNull,
    customerExperience: stringOrNull,
    customerInfo: customerInfoSchema,
    extnHostSrcProcess: stringOrNull,
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
    }).nullable().optional(),
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
  .strict();

// Makes all fields optional, but disallow extra fields
export const v2ContractSchema = baseSchema.strict();
