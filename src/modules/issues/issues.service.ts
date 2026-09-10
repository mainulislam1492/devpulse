import { Pool } from "pg";
import { pool } from "../../db";

const createIssuesIntoDB = async(payload: any, reporterId : any) => {
    const {title, description, type} = payload;
  
      
    const reporter = await pool.query(`
        SELECT * FROM users WHERE id = $1
     `,
     [reporterId],
    );

    if(reporter.rows.length === 0) {
        throw new Error("User not found");
    }

    const result = await pool.query(`
        INSERT INTO issues(title, description, type, reporter_id) VALUES($1,$2,$3,$4) RETURNING *
    `,
     [title, description, type, reporterId],
    );
       return result;
      
};

const updateIssueIntoDB = async (
    issueId: number,
    payload: any,
    userId: number,
    userRole: string
) => {
    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [issueId]
    );

    if (issueResult.rows.length === 0) {
        throw new Error("Issue not found");
    }

    const issue = issueResult.rows[0];

    if (userRole !== "maintainer") {
        if (issue.reporter_id !== userId) {
            throw new Error("You can only update your own issue");
        }

        if (issue.status !== "open") {
            throw new Error(
                "You can update an issue only when status is open"
            );
        }
    }

    const { title, description, type } = payload;

    const result = await pool.query(
        `
        UPDATE issues
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            updated_at = NOW()
        WHERE id = $4
        RETURNING *
        `,
        [title, description, type, issueId]
    );

    return result.rows[0];
};

const deleteIssuesFromDB = async(issueId : number, userId: number, userRole: string) => {
    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [issueId]
    );

    if (issueResult.rows.length === 0) {
        throw new Error("Issue not found");
    }

    if(userRole !== 'maintainer') {
        throw new Error('Only Maintainer can delete the issues!');
    }

    const result = await pool.query(`
          DELETE FROM issues WHERE id=$1  
          RETURNING *
            `,
        [issueId],
    );
    return result;

};

const updateIssueStatusFromDB = async (
    issueId: number,
    status: string,
    userRole: string
) => {
    if (userRole !== "maintainer") {
        throw new Error("Only Maintainer can change issue status!");
    }
    const allowedStatus = ["open", "in_progress", "resolved"];

    if (!allowedStatus.includes(status)) {
        throw new Error("Invalid issue status");
    }

    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [issueId]
    );

    if (issueResult.rows.length === 0) {
        throw new Error("Issue not found");
    }

    const result = await pool.query(
        `UPDATE issues
         SET status = $1,
             updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [status, issueId]
    );

    return result;
};

export const issuesService = {
    createIssuesIntoDB,
    updateIssueIntoDB,
    deleteIssuesFromDB,
    updateIssueStatusFromDB,
}