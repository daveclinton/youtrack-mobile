import type {CacheItemProject, PermissionCacheItem} from 'types/Permission';

class PermissionsStore {
  permissionsMap: Map<string, PermissionCacheItem>;

  constructor(permissions: PermissionCacheItem[]) {
    const permissionsWithProjects = (Array.isArray(permissions)
      ? permissions
      : []
    ).map((permission: PermissionCacheItem) => {
      permission.projectIds = (permission.projects || []).map(
        (project: CacheItemProject) => project.id,
      );
      return permission;
    });
    this.permissionsMap = new Map(
      permissionsWithProjects.map(it => [it.permission.key, it]),
    );
  }

  has = (permissionId: string, projectId?: string): boolean => {
    const permission: PermissionCacheItem | undefined = this.permissionsMap.get(
      permissionId,
    );

    if (!permission) {
      return false;
    }

    if (permission.global) {
      return true;
    }

    if (projectId) {
      return permission.projectIds.includes(projectId);
    }

    return permission.projectIds.length > 0;
  };

  hasEvery = (permissionIds: string[], projectId: string): boolean => (permissionIds || []).every(permissionId =>
    this.has(permissionId, projectId),
  );

  hasSome = (permissionIds: string[], projectId: string): boolean => (permissionIds || []).some(permissionId =>
    this.has(permissionId, projectId),
  );
}

export type {PermissionsStore};

export default PermissionsStore;
