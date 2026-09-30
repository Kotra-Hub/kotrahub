import { useUserStore } from '@/modules/user/user.store';

export type IssuerCheck = 'isIssuer' | 'isNotIssuer' | 'any';
export type ActionableItem = { status?: string | null; issuer?: { code?: string } };

export class PermissionChecker {
  // access user store dynamically to ensure it works when called
  private get user() {
    const userStore = useUserStore();
    return userStore.me;
  }

  public hasAnyRole(requiredRoles: string[]): boolean {
    return !!this.user?.roles?.some(r => requiredRoles.includes(r.name));
  }

  public hasDepartment(targetDeptId: string | undefined): boolean {
    if (!targetDeptId) return false;
    return !!this.user?.departments?.some(d => d.id === targetDeptId);
  }

  public canPerformAction(
    item: ActionableItem | undefined | null, 
    allowedStatuses: string[], 
    requiredRoles: string[] | null, 
    issuerCheck: IssuerCheck
  ): boolean {
    if (!item) return false;

    // 1. item status must be in the allowed list
    const hasValidStatus = allowedStatuses.includes(item.status || '');
    if (!hasValidStatus) return false;

    // 2. issuer check
    if (issuerCheck !== 'any') {
      const isIssuer = item.issuer?.code === this.user?.code;
      if (issuerCheck === 'isIssuer' && !isIssuer) return false;
      if (issuerCheck === 'isNotIssuer' && isIssuer) return false;
    }

    // 3. user must have one of the required roles (if any)
    if (requiredRoles && !this.hasAnyRole(requiredRoles)) return false;

    return true;
  }
}

export const permissionChecker = new PermissionChecker();