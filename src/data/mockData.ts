export const mockOrganizations = [
  {
    id: 1,
    name: "Jim's Business",
    employees: 3,
    status: "active",
    country: "USA",
    isCashOnly: false,
    ein: "12-3456789"
  },
  {
    id: 2,
    name: "My Weekend Business",
    employees: 1,
    status: "active",
    country: "Australia",
    isCashOnly: true
  },
];

export const countryFields = {
  USA: [
    { name: "ein", label: "EIN Number", required: true }
  ],
  Australia: [
    { name: "abn", label: "ABN Number", required: true }
  ],
  India: [
    { name: "gstin", label: "GSTIN Number", required: true }
  ],
  EU: [
    { name: "vatNumber", label: "VAT Number", required: true }
  ]
};