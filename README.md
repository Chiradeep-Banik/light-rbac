# light-rbac

A simple implementation of Role-Based Access Control (RBAC) method.

## Installation

Install the package using npm:

```sh
npm install light-rbac
```

## Usage

### Setting up roles and policies

First, create a `rolesPolicy` object containing your roles, actions, and policies. Here’s a dummy example:

```javascript
const rolesPolicy = {
  roles: ["Admin", "User", "Guest"],
  actions: {
    resource: ["read", "write", "update", "delete"],
  },
  policy: {
    Admin: ["resource:*"],
    User: ["resource:read", "resource:write"],
    Guest: ["resource:read"],
  },
};
```

### Creating an RBAC instance

Create an instance of the RBAC class by passing the `rolesPolicy` object:

```javascript
const RBAC = require("light-rbac");
const rbac = new RBAC(rolesPolicy);
```

### Checking access

Use the `hasAccess` method to check if a role has the required access:

```javascript
const role = "User";
const action = "resource:write";

if (rbac.hasAccess(role, action)) {
  console.log(`${role} has access to ${action}`);
} else {
  console.log(`${role} does not have access to ${action}`);
}
```

### Role Inheritance

You can define role inheritance in the policy. Use the syntax `"r:role_name"` to inherit all access permissions from another role. For example:

```javascript
const rolesPolicy = {
  roles: ["Admin", "User", "Guest"],
  actions: {
    resource: ["read", "write", "update", "delete"],
  },
  policy: {
    Admin: ["resource:*"],
    User: ["resource:read", "resource:write"],
    Guest: ["resource:read"],
    SuperUser: ["r:Admin", "r:User"],
  },
};
```

In this example, the `SuperUser` role will have all the access permissions of both `Admin` and `User`.

### Wildcard Permissions

You can use the `*` wildcard to grant all actions on a resource. For example, `resource:*` grants `read`, `write`, `update`, and `delete` permissions on the `resource`.

```javascript
const rolesPolicy = {
  roles: ["Admin", "User", "Guest"],
  actions: {
    resource: ["read", "write", "update", "delete"],
  },
  policy: {
    Admin: ["resource:*"],
    User: ["resource:read", "resource:write"],
    Guest: ["resource:read"],
  },
};
```

In this example, the `Admin` role can perform any action on the `resource`.

## Methods

### `hasAccess(role, action)`

- **Parameters**:

  - `role` (string): The name of the user's role.
  - `action` (string): The action that needs to be checked.

- **Returns**: `true` if the role has the specified access, otherwise `false`.

## Example

```javascript
const rolesPolicy = {
  roles: ["Admin", "Editor", "Viewer"],
  actions: {
    document: ["read", "write", "delete"],
    comment: ["read", "write"],
  },
  policy: {
    Admin: ["document:*", "comment:*"],
    Editor: [
      "document:read",
      "document:write",
      "comment:read",
      "comment:write",
    ],
    Viewer: ["document:read", "comment:read"],
  },
};

const rbac = new RBAC(rolesPolicy);

console.log(rbac.hasAccess("Admin", "document:delete")); // true
console.log(rbac.hasAccess("Editor", "document:delete")); // false
console.log(rbac.hasAccess("Viewer", "comment:write")); // false
```

## License

MIT
