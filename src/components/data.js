//Dashboard Nasted Sidebar Links
export const dashBoardDSidebarLinks = [
  {
    id: 1,
    name: 'Dashboard',
    sublink: 'dashboard',
    icon: 'fas fa-tachometer-alt',
    active: false,
    nasted: false,
    subCategory: [],
  },
  {
    id: 2,
    name: 'Manage Donors',
    sublink: 'all_donors',
    icon: 'fas fa-dollar-sign',
    active: false,
    nasted: true,
    subCategory: [
      { name: 'All Donors', sublink: 'all_donors' },
      { name: 'Add Donor', sublink: 'add_donor' },
    ],
  },
  {
    id: 3,
    name: 'Manage Charity',
    sublink: 'all_charity',
    icon: 'fas fa-hand-holding-heart',
    active: false,
    nasted: true,
    subCategory: [
      { name: 'All Charity', sublink: 'all_charity' },
      { name: 'Add Charity', sublink: 'add_charity' },
    ],
  },
  {
    id: 4,
    name: 'Manage User',
    sublink: 'all_users',
    icon: 'fas fa-user-tie',
    active: false,
    nasted: true,
    subCategory: [
      { name: 'All Users', sublink: 'all_users' },
      { name: 'Add User', sublink: 'add_user' },
    ],
  },
  {
    id: 6,
    name: 'Logout',
    sublink: 'logout',
    icon: 'fas fa-power-off',
    active: false,
    nasted: false,
    subCategory: [],
  },
]

// Admin Features Summery Json
export const adminSummery = [
  {
    id: 1,
    title: 'Ammount',
    subtitle: '2000',
    icon: 'fas fa-dollar-sign',
  },
  {
    id: 2,
    title: 'Donors',
    subtitle: '50',
    icon: 'fas fa-gift',
  },
  {
    id: 3,
    title: 'Charities',
    subtitle: '500',
    icon: 'fas fa-hand-holding-heart',
  },
  {
    id: 4,
    title: 'Users',
    subtitle: '10',
    icon: 'fas fa-user-tie',
  },
]

// Custom Radio Check Json
export const computerRadioData = [
  {
    id: 1,
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    id: 2,
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    id: 3,
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
]

// Dummy Accordion Data
export const accrodionData = [
  {
    id: 1,
    name: 'What is your Privacy Policy',
    desciption:
      'publishing and graphic design, Lorem ipsum is a placeholder text',
  },
  {
    id: 2,
    name: 'What is your refund policy?',
    desciption:
      'publishing and graphic design, Lorem ipsum is a placeholder text',
  },
  {
    id: 3,
    name: 'What is your service quality?',
    desciption:
      'publishing and graphic design, Lorem ipsum is a placeholder text',
  },
]

// Table Entities Array Data
export const entitiesData = [10, 25, 50, 100]

// Dashbord Profile Dropdown Data
export const userDropDownData = [
  {
    id: 1,
    title: 'Profile',
    sublink: '/',
    icon: 'fas fa-user-secret',
  },
  {
    id: 2,
    title: 'Logout',
    sublink: '/',
    icon: 'fas fa-power-off',
  },
]

// Dashbord Profile Dropdown Data
export const productListDropdown = [
  {
    id: 1,
    title: 'View',
    sublink: '/',
    icon: 'fas fa-eye',
  },
  {
    id: 2,
    title: 'Edit',
    sublink: '/',
    icon: 'fas fa-edit',
  },
  {
    id: 3,
    title: 'Delete',
    sublink: '/',
    icon: 'far fa-trash-alt',
  },
]

// Category JSON Demo
export const categories = [
  {
    id: 1,
    name: 'men',
    thumb: '',
    sub: [
      {
        id: 1,
        name: 'Shirt',
        thumb: '',
        sub: [
          {
            id: 1,
            name: 'Casual Shirt',
            thumb: '',
            sub: [],
          },
          {
            id: 2,
            name: 'Formal Shirt',
            thumb: '',
            sub: [],
          },
          {
            id: 3,
            name: 'Slim Shirt',
            thumb: '',
            sub: [],
          },
        ],
      },
      {
        id: 2,
        name: 'T-Shirt',
        thumb: '',
        sub: [],
      },
      {
        id: 3,
        name: 'Panjabi',
        thumb: '',
        sub: [],
      },
    ],
  },
  {
    id: 2,
    name: 'women',
    thumb: '',
    sub: [
      {
        id: 1,
        name: 'Saree',
        thumb: '',
        sub: [
          {
            id: 1,
            name: 'Jamdani',
            thumb: '',
            sub: [],
          },
          {
            id: 2,
            name: 'Katan',
            thumb: '',
            sub: [],
          },
          {
            id: 3,
            name: 'Silk',
            thumb: '',
            sub: [],
          },
        ],
      },
      {
        id: 2,
        name: 'Jeans',
        thumb: '',
        sub: [],
      },
      {
        id: 3,
        name: 'Kurti',
        thumb: '',
        sub: [],
      },
      {
        id: 4,
        name: 'Top',
        thumb: '',
        sub: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Kids',
    thumb: '',
    sub: [
      {
        id: 1,
        name: 'Baby',
        thumb: '',
        sub: [],
      },
      {
        id: 2,
        name: 'Boys',
        thumb: '',
        sub: [],
      },
      {
        id: 3,
        name: 'Girls',
        thumb: '',
        sub: [],
      },
    ],
  },
  {
    id: 4,
    name: 'Shoes',
    thumb: '',
    sub: [
      {
        id: 1,
        name: 'Mens',
        thumb: '',
        sub: [],
      },
      {
        id: 2,
        name: 'Womens',
        thumb: '',
        sub: [],
      },
    ],
  },
  {
    id: 5,
    name: 'Cosmetics',
    thumb: '',
    sub: [
      {
        id: 1,
        name: 'Mens Care',
        thumb: '',
        sub: [],
      },
      {
        id: 2,
        name: 'Womens Care',
        thumb: '',
        sub: [],
      },
      {
        id: 3,
        name: 'Baby Care',
        thumb: '',
        sub: [],
      },
      {
        id: 4,
        name: 'Oral Care',
        thumb: '',
        sub: [],
      },
    ],
  },
]
