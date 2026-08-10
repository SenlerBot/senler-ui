export interface FrontendUpdatePromptLabels {
    title: string;
    description: string;
    currentVersion: string;
    latestVersion: string;
    remindLater: string;
    refresh: string;
}
interface FrontendUpdatePromptProps {
    open: boolean;
    currentVersion: string;
    latestVersion: string | null;
    labels: FrontendUpdatePromptLabels;
    onRemindLater: () => void;
    onRefresh: () => void;
}
export declare function FrontendUpdatePrompt({ open, currentVersion, latestVersion, labels, onRemindLater, onRefresh, }: FrontendUpdatePromptProps): import("react").JSX.Element;
export {};
