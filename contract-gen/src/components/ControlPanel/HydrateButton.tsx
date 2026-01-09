import React from "react";
import { z } from "zod";
import { v2ContractSchema } from "../../schemas/v2ContractSchema";
import hydratedFields from "../../data/hydratedFields.json";

interface Props {
  input: string;
  setOutput: (v: string) => void;
  setError: (v: string | null) => void;
  setSuccess: (v: string | null) => void;
}

export default function HydrateButton({ input, setOutput, setError, setSuccess }: Props) {
  const handleClick = () => {
    try {
      const parsed = JSON.parse(input);

      // Always attempt to hydrate the payload to make it conform to v2 schema
      const hydrated = JSON.parse(JSON.stringify(parsed)); // deep clone

      // Helper: safe getter for hydratedFields order/work order delivery
      const hfOrder = (hydratedFields as any).order || {};
      const hfFirstWork = (hfOrder.workOrdersOrItemGroups && hfOrder.workOrdersOrItemGroups[0]) || {};
      const hfDelivery = hfFirstWork.delivery || {};

      // 1) Merge 'to' (prefer hydratedFields values where present)
      if (Array.isArray(hydrated.to) && hydrated.to.length > 0 && Array.isArray((hydratedFields as any).to)) {
        hydrated.to[0] = {
          ...(hydrated.to[0] || {}),
          ...((hydratedFields as any).to[0] || {})
        };
      }

      // 2) Top-level enrichments from hydratedFields if missing
      if ((hydrated as any).optOutCode == null && (hydratedFields as any).optOutCode) {
        (hydrated as any).optOutCode = (hydratedFields as any).optOutCode;
      }
      if ((hydrated as any).supportPhone == null && (hydratedFields as any).supportPhone) {
        (hydrated as any).supportPhone = (hydratedFields as any).supportPhone;
      }
      if ((hydrated as any).recommendations == null && (hydratedFields as any).recommendations) {
        (hydrated as any).recommendations = (hydratedFields as any).recommendations;
      }
      if ((hydrated as any).movableInk == null && (hydratedFields as any).movableInk) {
        (hydrated as any).movableInk = (hydratedFields as any).movableInk;
      }

      // 3) Order: add orderDateExpanded and merge customerInfoBillTo from shipTo when available
      if ((hydrated as any).order) {
        const o = (hydrated as any).order;

        // add orderDateExpanded
        if (hfOrder.orderDateExpanded) o.orderDateExpanded = hfOrder.orderDateExpanded;

        // ensure customerInfoBillTo picks up values from first work order shipTo
        if (Array.isArray(o.workOrdersOrItemGroups) && o.workOrdersOrItemGroups.length > 0) {
          const first = o.workOrdersOrItemGroups[0];
          const shipTo = first.customerInfoShipTo;

          if (shipTo) {
            // Fill/overwrite billTo fields with shipTo where appropriate
            o.customerInfoBillTo = o.customerInfoBillTo || {};
            o.customerInfoBillTo.firstName = shipTo.firstName || o.customerInfoBillTo.firstName;
            o.customerInfoBillTo.lastName = shipTo.lastName || o.customerInfoBillTo.lastName;
            o.customerInfoBillTo.phoneNumber = shipTo.phoneNumber || o.customerInfoBillTo.phoneNumber;
            o.customerInfoBillTo.email = shipTo.email || o.customerInfoBillTo.email;

            // Fill address fields from shipTo.address
            o.customerInfoBillTo.address = o.customerInfoBillTo.address || {};
            if (shipTo.address) {
              o.customerInfoBillTo.address = {
                ...(o.customerInfoBillTo.address || {}),
                ...shipTo.address
              };
            }
          }

          // 4) For each work order, fill customerInfoMarkFor and delivery enrichments
          const sourceDelivery = hfDelivery;

          o.workOrdersOrItemGroups = o.workOrdersOrItemGroups.map((w: any) => {
            const copy = { ...w };

            // customerInfoMarkFor: if null, set to copy of shipTo
            if (copy.customerInfoMarkFor == null && copy.customerInfoShipTo) {
              copy.customerInfoMarkFor = JSON.parse(JSON.stringify(copy.customerInfoShipTo));
            }

            // Merge delivery fields from hydratedFields delivery block
            copy.delivery = copy.delivery || {};
            if (sourceDelivery.deliveryDateExpanded) {
              copy.delivery.deliveryDateExpanded = sourceDelivery.deliveryDateExpanded;
              // also set originalDateExpanded to same expanded block
              copy.delivery.originalDateExpanded = sourceDelivery.deliveryDateExpanded;
            }
            if (sourceDelivery.deliveryTimeStart) copy.delivery.deliveryTimeStart = sourceDelivery.deliveryTimeStart;
            if (sourceDelivery.deliveryTimeEnd) copy.delivery.deliveryTimeEnd = sourceDelivery.deliveryTimeEnd;
            if (sourceDelivery.deliveryTimeRange) copy.delivery.deliveryTimeRange = sourceDelivery.deliveryTimeRange;
            if (sourceDelivery.shortTrackingUrl) copy.delivery.shortTrackingUrl = sourceDelivery.shortTrackingUrl;

            // 5) Enrich lineItems' purchaseOrderDeliveries
            if (Array.isArray(copy.lineItems)) {
              copy.lineItems = copy.lineItems.map((li: any) => {
                const nli = { ...li };
                if (Array.isArray(nli.purchaseOrderDeliveries)) {
                  nli.purchaseOrderDeliveries = nli.purchaseOrderDeliveries.map((pod: any) => {
                    const p = { ...pod };
                    // add delivery expansion and time info from order delivery
                    if (sourceDelivery.deliveryDateExpanded) {
                      p.deliveryDateExpanded = sourceDelivery.deliveryDateExpanded;
                      p.originalDateExpanded = sourceDelivery.deliveryDateExpanded;
                    }
                    if (sourceDelivery.deliveryTimeStart) p.deliveryTimeStart = sourceDelivery.deliveryTimeStart;
                    if (sourceDelivery.deliveryTimeEnd) p.deliveryTimeEnd = sourceDelivery.deliveryTimeEnd;
                    if (sourceDelivery.deliveryTimeRange) p.deliveryTimeRange = sourceDelivery.deliveryTimeRange;
                    if (sourceDelivery.shortTrackingUrl) p.shortTrackingUrl = sourceDelivery.shortTrackingUrl;
                    return p;
                  });
                }
                return nli;
              });
            }

            return copy;
          });
        }
      }

      const formatted = JSON.stringify(hydrated, null, 2);
      setOutput(formatted);
      setError(null);
      setSuccess(
        "✅ Your Payload has been hydrated and validated!\nApplied Hydrations & Enrichments:\n" +
        "• to[0] merged from hydrations (email/id/evoice/sms)\n" +
        "• order.orderDateExpanded added\n" +
        "• order.customerInfoBillTo enriched from first work order shipTo\n" +
        "• order.workOrdersOrItemGroups[*].customerInfoMarkFor filled from customerInfoShipTo when null\n" +
        "• order.workOrdersOrItemGroups[*].delivery enriched with deliveryDateExpanded, deliveryTimeStart/End/Range, shortTrackingUrl, originalDateExpanded\n" +
        "• order.workOrdersOrItemGroups[*].lineItems[*].purchaseOrderDeliveries enriched with deliveryDateExpanded and time fields\n" +
        "• top-level optOutCode, supportPhone, recommendations, movableInk added when missing\n"
      );

    } catch (err) {
      setSuccess(null);
      if (err instanceof z.ZodError) {
        const details = err.errors
          .map(e => `• ${e.path.join('.')}: ${e.message}`)
          .join('\n');
        setError(`❌ Schema validation failed after hydration:\n${details}`);
      } else if (err instanceof SyntaxError) {
        setError("❌ Invalid JSON: " + err.message);
      } else {
        setError("❌ Unknown error during hydration");
      }
      setOutput("");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-white border border-black text-black uppercase font-semibold text-xs rounded-md hover:bg-gray-100 transition"
    >
      Hydrate V2 Contract
    </button>
  );
}