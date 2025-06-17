import { z } from "zod";
import { v1ContractSchema } from "../schemas/v1ContractSchema";
import { v2ContractSchema } from "../schemas/v2ContractSchema";

type V1 = z.infer<typeof v1ContractSchema>;
type V2 = z.infer<typeof v2ContractSchema>;

export function mapV1toV2Contract(v1: V1): Partial<V2> {

    // Helper for getting nested values or null
    const get = <T>(fn: () => T): T | null => {
        try {
            const val = fn();
            return val === undefined ? null : val;
        } catch {
            return null;
        }
    };

    function contractCleanup(obj: any): any {
        if (Array.isArray(obj)) {
            const arr = obj
                .map(contractCleanup)
                .filter((item) => item !== undefined && item !== null && (typeof item !== "object" || Object.keys(item).length > 0));
            return arr.length > 0 ? arr : undefined;
        } else if (obj && typeof obj === "object") {
            const cleaned: any = {};
            for (const [key, value] of Object.entries(obj)) {
                const cleanedValue = contractCleanup(value);
                if (
                    cleanedValue !== undefined &&
                    cleanedValue !== null &&
                    // Don't keep empty objects/arrays
                    (!(typeof cleanedValue === "object") || (Array.isArray(cleanedValue) ? cleanedValue.length > 0 : Object.keys(cleanedValue).length > 0))
                ) {
                    cleaned[key] = cleanedValue;
                }
            }
            return Object.keys(cleaned).length > 0 ? cleaned : undefined;
        }
        return obj === null ? undefined : obj;
    }

    const mappedContract = {
        requestMessageId: v1.requestMessageId ?? null,
        appName: "AppName",
        attributes: { clientId: "ClientID" },
        digest: {
            countryCode: get(() => v1.digest.countryCode),
            startTime: get(() => v1.digest.startTime),
            endTime: get(() => v1.digest.endTime),
            storeNumber: get(() => v1.digest.storeNumber),
            zipCode: get(() => v1.digest.zipCode),
        },
        security: {
            date: get(() => v1.security.date),
            deviceCity: get(() => v1.security.deviceCity),
            deviceOS: get(() => v1.security.deviceOS),
            passcode: get(() => v1.security.passcode),
            passwordResetUrl: get(() => v1.security.passwordResetUrl),
            phone: get(() => v1.security.phone),
        },
        from: {
            email: get(() => v1.from.email),
            name: get(() => v1.from.name),
        },
        to: [
            {
                email: "email@homedepot.com",
                id: "svoc_userId:1234567890U",
                firstName: "Homer",
                lastName: "DPoe",
                sms: "123-456-7890",
            }
        ],
        delay: get(() => v1.delay),
        attachments: null,
        locations: [],
        metadata: Array.isArray(v1.metadata) ? v1.metadata.map((md: any) => ({
            key: get(() => md.key),
            value: get(() => md.value),
        })) : null,
        optIn: {
            customerGoldenRecordID: get(() => v1.optIn.customerGoldenRecordID),
            onlineEvoiceOptIn: get(() => v1.optIn.onlineEvoiceOptIn),
            onlineSmsOptIn: get(() => v1.optIn.onlineSmsOptIn),
            extnCustomerNotificationPreference: get(() => v1.optIn.extnCustomerNotificationPreference),
            extnSVOCPRSNCustID: get(() => v1.optIn.extnSVOCPRSNCustID),
        },
        profile: get(() => v1.profile),
        subject: get(() => v1.subject),
        isAdmin: get(() => v1.templateInfo.isAdmin),
        allowanceAmount: get(() => v1.templateInfo.allowanceAmount),
        appointment: {
            appointmentMode: get(() => v1.templateInfo.appointment.appointmentMode),
            appointmentType: get(() => v1.templateInfo.appointment.appointmentType),
            dateEnd: get(() => v1.templateInfo.appointment.dateEnd),
            dateStart: get(() => v1.templateInfo.appointment.dateStart),
            dateTime: get(() => v1.templateInfo.appointment.dateTime),
            emailType: get(() => v1.templateInfo.appointment.emailType),
            projectType: get(() => v1.templateInfo.appointment.projectType),
            storeNumber: get(() => v1.templateInfo.appointment.storeNumber),
            storeType: get(() => v1.templateInfo.appointment.storeType),
            timeEnd: get(() => v1.templateInfo.appointment.timeEnd),
            timeStart: get(() => v1.templateInfo.appointment.timeStart),
            timeZone: get(() => v1.templateInfo.appointment.timeZone),
            webexUrl: get(() => v1.templateInfo.appointment.webexUrl),
        },
        approvedStates: [],
        associateFirstName: get(() => v1.templateInfo.associateFirstName),
        businessName: get(() => v1.templateInfo.businessName),
        companyName: get(() => v1.templateInfo.companyName),
        customerExperience: get(() => v1.templateInfo.customerExperience),
        customerInfo: null,
        extnHostSrcProcess: get(() => v1.templateInfo.extnHostSrcProcess),
        flocStore: get(() => v1.templateInfo.flocStore),
        frequency: null,
        giftCardPresent: get(() => v1.templateInfo.giftCardPresent),
        highVolumeVerbiage: get(() => v1.templateInfo.highVolumeVerbiage),
        invitationUrl: get(() => v1.templateInfo.invitationUrl),
        isAdminInvite: get(() => v1.templateInfo.isAdminInvite),
        isRunnerInvite: get(() => v1.templateInfo.isRunnerInvite),
        lastModifiedDt: get(() => v1.templateInfo.lastModifiedDt),
        militaryDiscountApplied: get(() => v1.templateInfo.militaryDiscountApplied),
        myAccountLink: get(() => v1.templateInfo.myAccountLink),
        optOutAllLink: get(() => v1.templateInfo.optOutAllLink),
        optOutCode: get(() => v1.templateInfo.optOutCode),
        optOutLink: get(() => v1.templateInfo.optOutLink),
        order: {
            carrier: get(() => v1.templateInfo.order.carrier),
            carrierName: get(() => v1.templateInfo.order.carrierName),
            customerInfoBillTo: {
                address: {
                    addressLine1: get(() => v1.templateInfo.customerInfo.address.addressLine1),
                    addressLine2: get(() => v1.templateInfo.customerInfo.address.addressLine2),
                    addressLine3: get(() => v1.templateInfo.customerInfo.address.addressLine3),
                    city: get(() => v1.templateInfo.customerInfo.address.city),
                    state: get(() => v1.templateInfo.customerInfo.address.state),
                    country: get(() => v1.templateInfo.customerInfo.address.country),
                    postalCode: get(() => v1.templateInfo.customerInfo.address.postalCode),
                },
                firstName: get(() => v1.templateInfo.customerInfo.firstName),
                lastName: get(() => v1.templateInfo.customerInfo.lastName),
                phoneNumber: get(() => v1.templateInfo.customerInfo.phoneNumber),
                dayPhone: get(() => v1.templateInfo.customerInfo.dayPhone),
                email: get(() => v1.templateInfo.customerInfo.email),
            },
            customerServiceAgreementUrl: get(() => v1.templateInfo.order.customerServiceAgreementUrl),
            extnClientExternalSrcProcess: get(() => v1.templateInfo.order.extnClientExternalSrcProcess),
            isPartial: get(() => v1.templateInfo.order.isPartial),
            multiShipmentOrder: get(() => v1.templateInfo.order.multiShipmentOrder),
            orderDate: get(() => v1.templateInfo.order.orderDate),
            orderNumber: get(() => v1.templateInfo.order.orderNumber),
            orderType: get(() => v1.templateInfo.order.orderType),
            payment: {
                cardNbr: get(() => v1.templateInfo.order.payment.cardNbr),
                isHomeDepotCreditCard: get(() => v1.templateInfo.order.payment.isHomeDepotCreditCard),
                paymentType: get(() => v1.templateInfo.order.payment.paymentType),
                tenderAmount: get(() => v1.templateInfo.order.payment.tenderAmount),
            },
            poJobCode: get(() => v1.templateInfo.order.poJobCode),
            sourceCd: get(() => v1.templateInfo.order.sourceCd),
            storeNumber: get(() => v1.templateInfo.order.storeNumber),
            total: {
                deliveryCharge: get(() => v1.templateInfo.order.total.deliveryCharge),
                expressDeliveryCharge: get(() => v1.templateInfo.order.total.expressDeliveryCharge),
                discount: get(() => v1.templateInfo.order.total.discount),
                salesTax: get(() => v1.templateInfo.order.total.salesTax),
                shippingFee: get(() => v1.templateInfo.order.total.shippingFee),
                subTotal: get(() => v1.templateInfo.order.total.subTotal),
                total: get(() => v1.templateInfo.order.total.total),
                totalRefundAmount: get(() => v1.templateInfo.order.total.totalRefundAmount),
            },
            totalItemCount: get(() => v1.templateInfo.order.totalItemCount),
            viewCartURL: get(() => v1.templateInfo.order.viewCartURL),
            updatedWorkOrders: null,
            workOrdersOrItemGroups: Array.isArray(get(() => v1.templateInfo.order.workOrders)) ? v1.templateInfo.order.workOrders.map((wo: any) => ({
                cancelCode: null,
                cancelDate: null,
                customerInfoShipTo: {
                    address: {
                        addressLine1: get(() => wo.customerInfo.address.addressLine1),
                        addressLine2: get(() => wo.customerInfo.address.addressLine2),
                        addressLine3: get(() => wo.customerInfo.address.addressLine3),
                        city: get(() => wo.customerInfo.address.city),
                        state: get(() => wo.customerInfo.address.state),
                        country: get(() => wo.customerInfo.address.country),
                        postalCode: get(() => wo.customerInfo.address.postalCode),
                    },
                    firstName: get(() => wo.customerInfo.firstName),
                    lastName: get(() => wo.customerInfo.lastName),
                    phoneNumber: get(() => wo.customerInfo.phoneNumber),
                    dayPhone: get(() => wo.customerInfo.dayPhone),
                    email: get(() => wo.customerInfo.email),
                },
                //Need to add mapping from personInfoShipTo
                customerInfoMarkFor: null,
                delivery: {
                    deliveryDate: get(() => wo.delivery?.deliveryDate),
                    deliveryDateTimeStart: get(() => wo.delivery?.deliveryDateTimeStart),
                    deliveryDateTimeEnd: get(() => wo.delivery?.deliveryDateTimeEnd),
                    deliveryMessage: get(() => wo.delivery?.deliveryMessage),
                    deliveryMethod: get(() => wo.delivery?.deliveryMethod),
                    deliveryStatus: get(() => wo.delivery?.deliveryStatus),
                    instructionMessage: get(() => wo.delivery?.instructionMessage),
                    originalETA: get(() => wo.delivery?.originalETA),
                    revisedDeliveryDate: get(() => wo.delivery?.revisedDeliveryDate),
                    revisedTimeEnd: get(() => wo.delivery?.revisedTimeEnd),
                    revisedTimeStart: get(() => wo.delivery?.revisedTimeStart),
                    split: get(() => wo.delivery?.split),
                    trackingNumber: get(() => wo.delivery?.trackingNumber),
                    vehicleType: get(() => wo.delivery?.vehicleType),
                    trackingUrl: get(() => wo.delivery?.trackingUrl),
                },
                fulfillmentType: get(() => wo.fulfillmentType),
                installationProvider: null,
                lineItems: Array.isArray(wo.lineItems) ? wo.lineItems.map((li: any) => ({
                    aisle: null,
                    bay: null,
                    cancelQuantity: null,
                    colorName: get(() => li.colorName),
                    deliveryMethod: get(() => li.deliveryMethod),
                    eligibleProtectionPlans: [],
                    modelNumber: get(() => li.modelNumber),
                    fulfillmentType: get(() => li.fulfillmentType),
                    imageURL: get(() => li.imageURL),
                    internetSku: get(() => li.internetSku),
                    itemDescription: get(() => li.itemDescription),
                    itemTotal: get(() => li.itemTotal),
                    manufacturerName: get(() => li.manufacturerName),
                    model: get(() => li.model),
                    partService: [],
                    productURL: get(() => li.productURL),
                    quantity: get(() => li.quantity),
                    rgb: get(() => li.rgb),
                    service: Array.isArray(li.service) ? li.service.map((s: any) => ({
                        description: get(() => s.description),
                        itemId: get(() => s.itemId),
                        itemType: get(() => s.itemType),
                        quantity: get(() => s.quantity),
                        serviceLevelType: get(() => s.serviceLevelType),
                        shortItemDescription: get(() => s.shortItemDescription),
                        storeSku: get(() => s.storeSku),
                        unitPrice: get(() => s.unitPrice),
                    })) : null,
                    serviceLevelType: Array.isArray(li.serviceLevelType) ? li.serviceLevelType.map((slt: any) => ({
                        description: get(() => slt.description),
                        itemId: get(() => slt.itemId),
                        itemType: get(() => slt.itemType),
                        quantity: get(() => slt.quantity),
                        serviceLevelType: get(() => slt.serviceLevelType),
                        shortItemDescription: get(() => slt.shortItemDescription),
                        storeSku: get(() => slt.storeSku),
                        unitPrice: get(() => slt.unitPrice),
                    })) : null,
                    shortItemDescription: get(() => li.shortItemDescription),
                    storeSku: get(() => li.storeSku),
                    unitPrice: get(() => li.unitPrice),
                })) : [],
                specialInstruction: get(() => wo.specialInstruction),
                storeNumber: get(() => wo.storeNumber),
                workOrderNumber: get(() => wo.workOrderNumber),
            })) : [],
        },
        paymentCard: {
            cardType: get(() => v1.templateInfo.paymentCard.cardType),
            last4Digits: get(() => v1.templateInfo.paymentCard.last4Digits),
        },
        redemptionCode: get(() => v1.templateInfo.redemptionCode),
        reservation: {
            cancelResvLink: get(() => v1.templateInfo.reservation.cancelResvLink),
            createResvLink: get(() => v1.templateInfo.reservation.createResvLink),
            day: get(() => v1.templateInfo.reservation.day),
            manageResvLink: get(() => v1.templateInfo.reservation.manageResvLink),
            optOutCode: get(() => v1.templateInfo.reservation.optOutCode),
            pickupDate: get(() => v1.templateInfo.reservation.pickupDate),
            pickupTime: get(() => v1.templateInfo.reservation.pickupTime),
            reservationId: get(() => v1.templateInfo.reservation.reservationId),
            returnDate: get(() => v1.templateInfo.reservation.returnDate),
            returnTime: get(() => v1.templateInfo.reservation.returnTime),
            vehicleRental: get(() => v1.templateInfo.reservation.vehicleRental),
        },
        signOutTimestamp: get(() => v1.templateInfo.signOutTimestamp),
        storeNumber: get(() => v1.templateInfo.order.storeNumber),
        supportPhone: get(() => v1.templateInfo.supportPhone),
        surveyLink: get(() => v1.templateInfo.surveyLink),
        taxExemptId: get(() => v1.templateInfo.taxExemptId),
        taxExemptPortalUploadLink: get(() => v1.templateInfo.taxExemptPortalUploadLink),
        totalCardsRemoved: get(() => v1.templateInfo.totalCardsRemoved),
        transactionType: get(() => v1.templateInfo.transactionType),
        weatherVerbiageEnabled: get(() => v1.templateInfo.weatherVerbiageEnabled),
        workShop: {
            date: get(() => v1.templateInfo.workShop.date),
            message: get(() => v1.templateInfo.workShop.message),
            name: get(() => v1.templateInfo.workShop.name),
            time: get(() => v1.templateInfo.workShop.time),
        }
    };

    return contractCleanup(mappedContract);
}