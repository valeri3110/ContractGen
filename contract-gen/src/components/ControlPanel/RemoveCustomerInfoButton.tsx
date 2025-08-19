import React from "react";

const FIELDS_TO_UPDATE = {
  orderNumber: "723456789012",
  orderDate: "2025-01-11",
  deliveryDateTimeStart: "2025-06-20T09:00:00Z",
  deliveryDateTimeEnd: "2025-06-20T09:00:00Z",
  addressLine1: "1234 Example Drive",
  addressLine2: null,
  addressLine3: null,
  city: "Atlanta",
  state: "GA",
  country: "US",
  postalCode: "12345",
  firstName: "Homer",
  lastName: "DPoe",
  phoneNumber: "000-000-0000",
  dayPhone: "000-000-0000",
  email: "email@homedepot.com",
  poJobCode: "1234567890",
};

function updateFieldsRecursively(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(updateFieldsRecursively);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (key in FIELDS_TO_UPDATE) {
          // Only update if the current value is NOT null
          return [key, value === null ? null : FIELDS_TO_UPDATE[key as keyof typeof FIELDS_TO_UPDATE]];
        }
        return [key, updateFieldsRecursively(value)];
      })
    );
  }
  return obj;
}

interface RemoveCustomerInfoButtonProps {
  input: string;
  setOutput: (output: string) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

function RemoveCustomerInfoButton({
  input,
  setOutput,
  setError,
  setSuccess,
}: RemoveCustomerInfoButtonProps) {
  const handleClick = () => {
    try {
const parsed = JSON.parse(input);
const updated = updateFieldsRecursively(parsed);
setOutput(JSON.stringify(updated, null, 2));
setError(null);
setSuccess("✅ Specified fields updated everywhere in the payload!");
    } catch (err) {
      setSuccess(null);
      setError(
        "❌ Could not update fields: " +
          (err instanceof Error ? err.message : String(err))
      );
      setOutput("");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-black text-white uppercase font-semibold text-xs tracking-wide rounded-md hover:bg-[#333] transition"
    >
      Remove Customer Info
    </button>
  );
}

export default RemoveCustomerInfoButton;
