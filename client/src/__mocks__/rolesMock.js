export const ROLES = {
  page: 1,
  limit: 7,
  pages: 4,
  results: 25,
  output: [
    {
      public: false,
      editable: false,
      _id: '5c8f96bbcece9911f01dd0ab',
      name: 'Administrator',
      code: 'ADMIN',
      description: 'Main System Administrator with full access',
      active: true,
    },
    {
      public: false,
      editable: false,
      _id: '5c8f96bbcece9911f01dd0ac',
      name: 'Branch Administrator',
      code: 'BRANCH_ADMIN',
      description: 'Administrator with full access to their own branch',
      active: true,
    },
    {
      public:false,
      editable:false,
      _id:"5c8f96bbcece2211f01dd0ab",
      name:"User",
      code:"USER",
      description:"Default user",
      active:true
    }
  ]
};