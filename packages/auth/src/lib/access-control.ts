import { createAccessControl } from "better-auth/plugins";
import { statement } from "./permissions";

export const ac = createAccessControl(statement);
