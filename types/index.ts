export type TaddrTypeTranslation = {
    addrtypeTitle: string;
    legacyTitle: string;
    legacyText: string;
    nestedSegwitTitle: string;
    nestedSegwitText: string;
    nativeSegwitTitle: string;
    nativeSegwitText: string;
}

export type TprefixTranslation = {
    prefixTitle: string;
    prefixSubTitle: string;
    prefixCasesensitive: string;
    disallowedPrefix: string;
    disallowedfirstchar: string;
    invalidPrefix: string;
}

export type TpubkeyTranslation = {
    pubkeyTitle: string;
}

export type TFormData = {
    addrtype?: string;
    prefix?: {
        caseSensitive?: boolean;
        prefixStr?: string;
    };
    pubkey?: string;
    mailaddress?: string;
}