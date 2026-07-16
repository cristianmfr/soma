import { ac } from "./access-control";

export const member = ac.newRole({
  customers: ["create", "update", "enable", "disable"],
  documents: ["create"],
});

export const admin = ac.newRole({
  companies: ["create", "update", "disable", "enable", "delete"],
});

export const owner = ac.newRole({
  companies: ["create", "update", "disable", "enable", "delete"],
  customers: ["create", "update", "delete", "enable", "disable"],
  documents: ["create", "update", "delete"],
});
