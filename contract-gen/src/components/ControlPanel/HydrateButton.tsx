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
      v2ContractSchema.parse(parsed);

      const hydrated = {
        ...parsed,
        ...hydratedFields
      };

      const formatted = JSON.stringify(hydrated, null, 2);
      setOutput(formatted);
      setError(null);
      setSuccess(
        "✅ Your Payload has been hydrated!\nAdded Hydrations:\n" +
        "• to[0].firstName\n" +
        "• to[0].lastName\n" +
        "• order.workOrdersOrItemGroups[0].customerInfoShipTo.\n" +
        "   firstName\n" +
        "   lastName\n" +
        "   phoneNumber\n" +
        "• order.orderDateExpanded\n" +
        "• order.workOrdersOrItemGroups[0].delivery.\n" +
        "   deliveryDateExpanded\n" +
        "   deliveryTimeStart\n" +
        "   deliveryTimeEnd\n" +
        "   deliveryTimeRange\n" +
        "Added Enrichment Fields:\n" +
        "• supportPhone\n" +
        "• movableInk\n" +
        "• recommendations\n" +
        "• optOutCode\n" +
        "• shortTrackingUrl\n" 
      );

    } catch (err) {
      setSuccess(null);
      if (err instanceof z.ZodError) {
        const details = err.errors
          .map(e => `• ${e.path.join('.')}: ${e.message}`)
          .join('\n');
        setError(`❌ Schema validation failed:\n${details}`);
      } else if (err instanceof SyntaxError) {
        setError("❌ Invalid JSON: " + err.message);
      } else {
        setError("❌ Unknown error during validation");
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