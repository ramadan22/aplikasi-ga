export const DummyEmail = [
  {
    label: 'User GA 1',
    value: 'user_ga1@gmail.com',
  },
  {
    label: 'User GA 2',
    value: 'user_ga2@gmail.com',
  },
];

export const DummyApprovals = [
  {
    submissionType: 'PROCURMENT',
    status: 'on progress',
    note: 'Tolong diproses secepat mungkin!',
    approved_by: [
      {
        email: 'user_ga1@gmail.com',
        name: 'User GA 1',
        image: '',
        position: {
          x: '',
          y: '',
        },
      },
      {
        email: 'user_ga2@gmail.com',
        name: 'User GA 2',
        image: '',
        position: {
          x: '',
          y: '',
        },
      },
    ],
    asset_request: [
      {
        SN: 'SN-12345',
        name: 'HP Deskjet 1140',
        category_id: {
          id: 'f85ab016-92f6-4730-bb37-095b013b6cca',
          name: 'Printer',
          prefix: 'OLS-01-062025-001',
          createdAt: '2025-08-22T14:10:47.851Z',
        },
      },
    ],
  },
];

export const SubmissionTypes = [
  {
    label: 'Procurment',
    value: 'PROCURMENT',
  },
  {
    label: 'Assigment',
    value: 'ASSIGMENT',
  },
];
