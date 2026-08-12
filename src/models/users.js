import db from "./db.js";
import bcrypt from 'bcrypt';

const createUser = async(name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
        RETURNING user_id;
    `;
    const queryParams = [name, email, passwordHash, default_role];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const getAllusers = async () => {
    const query = `
    SELECT u.name, u.email, r.role_name
    FROM users u
    JOIN roles r ON u.role_id = r.role_id;
    `;
    const results = await db.query(query);
    return results.rows;
}

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1;
    `;
    const queryParams = [email];
    const result = await db.query(query, queryParams);
    if (result.rows.length === 0) {
        return null; // User not found
    }
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
        return null;
    }
    // Converts password back to password hash
    const { password_hash, ...safeUser } = user;
    return safeUser;
};

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2);
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows[0];
}

const removeVolunteer = async (projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE project_id = $1;
    `;
    await db.query(query, [projectId]);
}

const getProjectByUserId = async (userId) => {
    const query = `
        SELECT p.project_id, p.title
        FROM projects p
        JOIN volunteer v ON p.project_id = v.project_id
        WHERE v.user_id = $1;
    `;
    const queryParams = [userId];
    const results = await db.query(query, queryParams);
    return results.rows;
};

const checkVolunteer = async (userId, ProjectId) => {
    const query = `
        SELECT * FROM volunteer 
        WHERE user_id = $1 AND project_id =$2;
    `;
    const queryParams = [userId, ProjectId];
    const result = await db.query(query, queryParams);
    return result.rows[0];
};

export { createUser, authenticateUser, getAllusers, addVolunteer, removeVolunteer, getProjectByUserId, checkVolunteer }
