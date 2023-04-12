import { RolesBuilder } from "nest-access-control/roles-builder.class";

export enum AppRoles {
    USER = 'user',
    BUSINESS_OWNER = 'business-owner',
    BUSINESS_STAFF = 'business-staff',//not to be used, just to be a base class for inheritance
    BUSINESS_STAFF_ADMIN = 'business-staff-admin',
    BUSINESS_STAFF_TECH = 'business-staff-tech',
    BUSINESS_STAFF_GYM_INSTRUCTOR = 'business-staff-gym-instructor'
  
}

  export const roles: RolesBuilder = new RolesBuilder();

  roles
  .grant(AppRoles.USER) // define new or modify existing role. also takes an array.
   .createOwn('user')
   .readOwn('user')
   
  .grant(AppRoles.BUSINESS_OWNER)
   .readAny('business-info')
   .readAny('business-owner-info')
   
  .grant(AppRoles.BUSINESS_STAFF)
  .readAny('business')
  .readOwn('business-staff')
  
  .grant(AppRoles.BUSINESS_STAFF_GYM_INSTRUCTOR)
  .extend(AppRoles.BUSINESS_STAFF)
  .readOwn('business-gym')
  .createOwn('business-gym')
  .deleteOwn('business-gym')

  .grant(AppRoles.BUSINESS_STAFF_TECH)
  .extend(AppRoles.BUSINESS_STAFF_GYM_INSTRUCTOR)
  .readAny('business-gym')
  .createAny('business-gym')
  .deleteAny('business-gym')

  .grant(AppRoles.BUSINESS_STAFF_ADMIN) // switch to another role without breaking the chain
    .extend(AppRoles.BUSINESS_STAFF_TECH)
    .createAny('business-staff')
    .updateAny('business-staff')
    .deleteAny('business-staff')
