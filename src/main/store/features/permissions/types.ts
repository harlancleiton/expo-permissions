import { DomainError, Permission } from "../../../../domain";

export type PermissionOperation<T = Permission.JSON | Permission.JSON[]> = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: DomainError | null;
  value: T;
};

export type PermissionState = {
  permissions: Permission.JSON[];
  list: PermissionOperation<Permission.JSON[]>;
};
