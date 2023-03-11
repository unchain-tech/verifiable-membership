import keyto from '@trust/keyto'

/**
 * 
 */
export function ethereum_pk_to_jwk(privateKey: string): string { 
    return keyto.from(privateKey, 'blk').toJwk('public') 
}
