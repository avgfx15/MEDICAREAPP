/// Sign Up Moel
export class UserModel {
  name: string = '';
  email: string = '';
  mobile: number = 0;
  password: string = '';
  role: number = 0;
  _id: string = '';
}

/// Sign In model
export class SignIn {
  email: string = '';
  password: string = '';
}

export class UserDetailsModel {
  name?: string = '';
  email?: string = '';
  mobile?: number = 0;
  password?: string = '';
  role?: string = '';
  _id?: string = '';
  street?: string = '';
  area?: string = '';
  location?: string = '';
  city?: string = '';
  country?: string = '';
  zipcode?: string = '';
}
