import crypto from "crypto";

export const accessTokenSecretGenerator = () => {
    const secret = crypto.randomBytes(64).toString('hex');
    return secret;
}

export const refreshTokenSecretGenerator = () => {
    const secret = crypto.randomBytes(64).toString('hex');
    return secret;
}