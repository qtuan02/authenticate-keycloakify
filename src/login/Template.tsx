import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { ArrowLeft } from "lucide-react";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        children
    } = props;

    const { msgStr } = i18n;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, [documentTitle]);

    useEffect(() => {
        if (bodyClassName) {
            document.body.className = bodyClassName;
        }
        return () => {
            if (bodyClassName) {
                document.body.className = "";
            }
        };
    }, [bodyClassName]);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
            {/* Clean background */}
            <div className="pointer-events-none fixed inset-0 -z-10 bg-muted/30" />

            <div className="w-full max-w-md space-y-6">


                {/* Logo / Header area */}
                <div className="text-center">
                    {kcContext.realm.displayNameHtml ? (
                        <div
                            className="mb-2 text-3xl font-bold text-foreground uppercase"
                            dangerouslySetInnerHTML={{
                                __html: kcContext.realm.displayNameHtml
                            }}
                        />
                    ) : (
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
                            {kcContext.realm.displayName}
                        </h1>
                    )}
                </div>

                {/* Main content */}
                <div className="rounded-xl border bg-card p-8 shadow-sm">
                    {headerNode && (
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-semibold text-foreground/90">
                                {headerNode}
                            </h2>
                        </div>
                    )}

                    {/* Global messages */}
                    {displayMessage &&
                        kcContext.message !== undefined &&
                        (kcContext.message.type !== "warning" || !kcContext.isAppInitiatedAction) && (
                            <div
                                className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                                    kcContext.message.type === "error"
                                        ? "border-red-500/30 bg-red-500/10 text-red-300"
                                        : kcContext.message.type === "warning"
                                          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                                          : kcContext.message.type === "success"
                                            ? "border-green-500/30 bg-green-500/10 text-green-300"
                                            : "border-blue-500/30 bg-blue-500/10 text-blue-300"
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcContext.message.summary
                                    }}
                                />
                            </div>
                        )}

                    {children}

                    {socialProvidersNode}
                </div>

                {/* Info section */}
                {displayInfo && infoNode && (
                    <div className="rounded-lg border bg-muted/50 p-4 text-center text-sm text-muted-foreground">
                        {infoNode}
                    </div>
                )}

                {/* Back button */}
                <div className="text-center mt-8">
                    <button
                        type="button"
                        onClick={() => {
                            if (window.history.length > 1) {
                                window.history.back();
                            } else {
                                window.location.href = "http://localhost:4200";
                            }
                        }}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Application
                    </button>
                </div>
            </div>
        </div>
    );
}
