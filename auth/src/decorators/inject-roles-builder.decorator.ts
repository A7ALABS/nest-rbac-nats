import { Inject } from '@nestjs/common';
import { ROLES_BUILDER_TOKEN } from 'nest-access-control/constants';

/**
 *  Get access to the underlying `RolesBuilder` Object
 */
export const InjectRolesBuilder = () => Inject(ROLES_BUILDER_TOKEN);