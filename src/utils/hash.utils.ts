import * as argon2 from "argon2";

export const Hash = async (prop: string): Promise<string> => {
    return await argon2.hash(prop);
}

export const CompareHash = async (hash: string, prop: string): Promise<boolean> => {
    return await argon2.verify(hash, prop);
}