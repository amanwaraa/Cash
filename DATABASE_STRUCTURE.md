# Database Structure - Oscar POS

companies/{companyKey}
  active: boolean
  subscriptionEnd: string
  storeName: string

companies/{companyKey}/admin/main
  username: "admin"
  passwordHash: string
  passwordSalt: string
  lastLogin: number

companies/{companyKey}/employees/{employeeId}
  id: string
  name: string
  username: string
  passwordHash: string
  passwordSalt: string
  active: boolean
  permissions: map
  createdAt: number
  updatedAt: number
  lastLogin: number|null

companies/{companyKey}/data/products/{id}
companies/{companyKey}/data/customers/{id}
companies/{companyKey}/data/suppliers/{id}
companies/{companyKey}/data/accounts/{id}
companies/{companyKey}/data/invoices/{id}
companies/{companyKey}/data/expenses/{id}
companies/{companyKey}/data/inventory/{id}
companies/{companyKey}/data/settings/main
companies/{companyKey}/data/activity/{id}
companies/{companyKey}/data/notifications/{id}
companies/{companyKey}/data/scannerSessions/{id}
companies/{companyKey}/data/scannerEvents/{id}
