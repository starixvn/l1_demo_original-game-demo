import { useState, useEffect, useCallback } from "react";
import { IFRAME_MESSAGES, BalanceUpdatePayload, NicknameUpdatePayload } from "../constants/iframe-messages";

interface UseBalanceManagerOptions {
    onBalanceUpdate?: (balance: number, currency: string) => void;
}

export const useBalanceManager = (options: UseBalanceManagerOptions = {}) => {
    const [currentBalance, setCurrentBalance] = useState<number | null>(null);
    const [currentCurrency, setCurrentCurrency] = useState<string>("VND");
    const [currentNickname, setCurrentNickname] = useState<string>("Player");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const handleBalanceUpdate = useCallback((balance: number, currency: string) => {
        setCurrentBalance(balance);
        setCurrentCurrency(currency);
        setIsConnected(true);
        options.onBalanceUpdate?.(balance, currency);
    }, [options]);

    const handleNicknameUpdate = useCallback((nickname: string) => {
        setCurrentNickname(nickname);
        setIsConnected(true);
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            try {
                if (!event.data || typeof event.data !== 'object') return;

                const { action, payload } = event.data;

                if (action === IFRAME_MESSAGES.BALANCE_UPDATE && payload) {
                    const balancePayload = payload as BalanceUpdatePayload;
                    if (typeof balancePayload.balance === 'number' && balancePayload.balance >= 0) {
                        handleBalanceUpdate(balancePayload.balance, balancePayload.currency || 'VND');
                    } else {
                        console.warn('Invalid balance payload received:', balancePayload);
                    }
                }

                if (action === IFRAME_MESSAGES.NICKNAME_UPDATE && payload) {
                    const nicknamePayload = payload as NicknameUpdatePayload;
                    if (nicknamePayload.nickname && typeof nicknamePayload.nickname === 'string') {
                        handleNicknameUpdate(nicknamePayload.nickname);
                    } else {
                        console.warn('Invalid nickname payload received:', nicknamePayload);
                    }
                }
            } catch (error) {
                console.error('Error processing iframe message:', error);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [handleBalanceUpdate, handleNicknameUpdate]);

    const formatBalance = useCallback((balance: number): string => {
        if (balance == null) return "Loading...";
        return new Intl.NumberFormat('en-US').format(balance);
    }, []);

    const getDisplayBalance = useCallback((): string => {
        if (!isConnected) return `${currentCurrency} ${formatBalance(50000)}`;
        if (currentBalance == null) return "Loading...";
        return `${currentCurrency} ${formatBalance(currentBalance)}`;
    }, [currentBalance, currentCurrency, formatBalance, isConnected]);

    const getDisplayName = useCallback((): string => {
        return isConnected ? currentNickname : "Player";
    }, [currentNickname, isConnected]);

    return {
        currentBalance,
        currentCurrency,
        currentNickname,
        isConnected,
        formatBalance,
        getDisplayBalance,
        getDisplayName,
        handleBalanceUpdate,
        handleNicknameUpdate,
    };
};

export default useBalanceManager;
