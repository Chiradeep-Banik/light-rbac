class RBAC {
  /**
   * @param {Object} rolesPolicy A object containing roles, actions and policy
   *
   */
  constructor(rolesPolicy) {
    this.rolesPolicy = rolesPolicy;
  }
  /**
   * @param {string} value The value that needs to be filled.
   * @returns {Array} filled_array with the values.
   */
  #fill_star(value) {
    let filled = [];
    let required_acces = value.split(":");
    let role_per = this.rolesPolicy.actions[required_acces[0]];
    for (let i = 0; i < role_per.length; i++) {
      let n_req = required_acces[0] + ":" + role_per[i];
      filled.push(n_req);
    }
    return filled;
  }
  /**
   * @param {string} role The name of the user's role.
   * @param {string} access The name of the access type that the role is trying to access.
   * @returns {Boolean} Returns true or false based on if the user has access or not.
   */
  hasAccess(role, action) {
    try {
      if (!this.rolesPolicy.roles.includes(role)) {
        return false;
      }
      let access_list = this.rolesPolicy.policy[role];

      let found = false;
      for (let i = 0; i < access_list.length; i++) {
        let perm = access_list[i].split(":");
        if (perm.length == 2) {
          if (perm[1] == "*") {
            let has_arr = this.#fill_star(perm[0]);

            if (has_arr.includes(action)) {
              found = true;
              break;
            }
          } else if (perm[0] == "r") {
            found = this.hasAccess(perm[1], action);
            if (found) break;
          } else {
            if (action == access_list[i]) {
              found = true;
              break;
            }
          }
        } else {
          return false;
        }
      }
      return found;
    } catch (e) {
      return false;
    }
  }
}

class BuildPolicy {
  constructor(policy) {
    this.policy = policy;
  }
  getPolicy() {
    return this.policy;
  }
}

module.exports = RBAC;
