import { z } from "zod";

// Helper types
const stringOrNull = z.string().nullable();
const booleanOrNull = z.boolean().nullable();

// Definitions
const toSchema = z.object({
  email: z.string(),
  id: stringOrNull.optional(),
  firstName: z.string(),
  lastName: stringOrNull.optional(),
  sms: stringOrNull.optional(),
});

const optInSchema = z.object({
  customerGoldenRecordID: stringOrNull.optional(),
  onlineEvoiceOptIn: booleanOrNull.optional(),
  onlineSmsOptIn: booleanOrNull.optional(),
  extnCustomerNotificationPreference: stringOrNull.optional(),
  extnSVOCPRSNCustID: stringOrNull.optional(),
}).optional();

const addressSchema = z.object({
  addressLine1: stringOrNull,
  addressLine2: stringOrNull.optional(),
  addressLine3: stringOrNull.optional(),
  city: stringOrNull,
  state: stringOrNull,
  postalCode: stringOrNull,
  country: stringOrNull,
});

const customerInfoSchema = z.object({
  firstName: stringOrNull,
  lastName: stringOrNull,
  phoneNumber: stringOrNull.optional(),
  address: addressSchema,
});

const deliverySchema = z.object({
  deliveryDateTimeStart: stringOrNull.optional(),
  deliveryDateTimeEnd: stringOrNull.optional(),
  deliveryDateTimeDone: stringOrNull.optional(),
  deliveryMethod: stringOrNull.optional(),
  vehicleType: stringOrNull.optional(),
  instructionMessage: stringOrNull.optional(),
  firstEnrouteFlag: booleanOrNull.optional(),
  trackingUrl: stringOrNull.optional(),
});

const lineItemSchema = z.object({
  shortItemDescription: stringOrNull,
  itemDescription: stringOrNull,
  internetSku: stringOrNull,
  storeSku: stringOrNull,
  quantity: z.union([z.string(), z.number(), z.null()]),
  manufacturerName: stringOrNull.optional(),
});

const workOrderOrItemGroupSchema = z.object({
  workOrderNumber: stringOrNull,
  delivery: deliverySchema,
  flocStore: stringOrNull.optional(),
  customerInfoShipTo: customerInfoSchema,
  lineItems: z.array(lineItemSchema).optional(),
});

const customerInfoBillToSchema = z.object({
  firstName: stringOrNull,
  lastName: stringOrNull,
  address: addressSchema,
});

const orderSchema = z.object({
  extnClientExternalSrcProcess: stringOrNull.optional(),
  orderNumber: stringOrNull,
  orderDate: stringOrNull,
  poJobCode: stringOrNull.optional(),
  storeNumber: stringOrNull,
  multiShipmentOrder: booleanOrNull.optional(),
  customerInfoBillTo: customerInfoBillToSchema,
  workOrdersOrItemGroups: z.array(workOrderOrItemGroupSchema),
});

export const v2NotifierContractSchema = z.object({
  requestMessageId: z.string(),
  appName: z.string(),
  attributes: z.object({
    clientId: z.string(),
  }),
  optIn: optInSchema,
  to: z.array(toSchema),
  customerExperience: z.string(),
  extnHostSrcProcess: z.string(),
  order: orderSchema,
}).strict();