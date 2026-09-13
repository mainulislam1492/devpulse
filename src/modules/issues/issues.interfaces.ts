export interface ICreateIssue {
    title: string;
    description: string;
    type: "bug" | "feature_request";
}

export interface IUpdateIssue {
    title?: string;
    description?: string;
    type?: "bug" | "feature_request";
}

export interface IUpdateIssueStatus {
    status: "open" | "in_progress" | "resolved";
}

export interface IGetAllIssuesQuery {
    sort?: "newest" | "oldest";
    type?: "bug" | "feature_request";
    status?: "open" | "in_progress" | "resolved";
}

export type UserRole = "contributor" | "maintainer";