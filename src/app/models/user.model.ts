export interface Role {
    student?: boolean;
    organizer?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    roles: Role;
}