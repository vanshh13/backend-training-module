const TABLE_NAME = "users";

module.exports = function ({ postgresDb }) {
  return Object.freeze({
    createUser,
    getUserByUsername,
    getUserByPhoneNumber,
    updatePassword,
    updateProfile,
    softDeleteUser,
    getUserById,
    hardDeleteSoftDeletedUsers,
  });

  async function getUserByUsername({ username }) {
    const result = await postgresDb.query(
      `SELECT * FROM users WHERE username=$1 AND is_deleted=false`,
      [username]
    );
    return result.rows[0];
  }

  async function getUserById({ id }) {
    const result = await postgresDb.query(
      `SELECT * FROM users WHERE id=$1 AND is_deleted=false`,
      [id]
    );
    return result.rows[0];
  }

  async function getUserByPhoneNumber({ phoneNumber }) {
    const q = `SELECT * FROM ${TABLE_NAME} WHERE phone_number = $1 AND is_deleted = FALSE`;
    const result = await postgresDb.query(q, [phoneNumber]);
    return result.rows[0];
  }

  async function createUser({
    username,
    phoneNumber,
    password,
    address1,
    address2,
    createdBy,
    isActive,
  }) {
    const query = `
      INSERT INTO ${TABLE_NAME} (
        username,
        phone_number,
        password,
        address1,
        address2,
        created_by,
        created_at,
        is_active
      )
      VALUES ($1,$2,$3,$4,$5,$6,NOW(),$7)
      RETURNING *;
    `;

    const values = [
      username,
      phoneNumber || null,
      password,
      address1,
      address2,
      createdBy,
      isActive,
    ];

    const result = await postgresDb.query(query, values);
    return result.rows[0];
  }

  async function updatePassword({ id, password }) {
    const result = await postgresDb.query(
      `UPDATE users SET password=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [password, id]
    );
    return result.rows[0];
  }

  async function updateProfile({ id, address1, address2, phoneNumber }) {
    const result = await postgresDb.query(
      `UPDATE users 
       SET address1=$1, address2=$2, phone_number=$3, updated_at=NOW() 
       WHERE id=$4 RETURNING *`,
      [address1, address2, phoneNumber, id]
    );
    return result.rows[0];
  }

  async function softDeleteUser({ id, deletedBy }) {
    const result = await postgresDb.query(
      `UPDATE users
       SET is_deleted=true, deleted_by=$1, deleted_at=NOW()
       WHERE id=$2 RETURNING *`,
      [deletedBy, id]
    );
    return result.rows[0];
  }
  async function hardDeleteSoftDeletedUsers() {
      const query = `
          DELETE FROM users
          WHERE is_deleted = TRUE
          AND deleted_at < NOW() - INTERVAL '30 days'
          RETURNING *;
      `;

      const result = await postgresDb.query(query);
      return result.rows;
  }


};
