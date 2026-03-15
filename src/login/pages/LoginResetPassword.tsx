import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginResetPassword(
    props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            classes={classes}
            doUseDefaultCss={false}
            headerNode={msg("emailForgotTitle")}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo
            infoNode={
                <p className="text-sm text-muted-foreground">
                    {realm.duplicateEmailsAllowed
                        ? msg("emailInstructionUsername")
                        : msg("emailInstruction")}
                </p>
            }
        >
            <form
                id="kc-reset-password-form"
                action={url.loginAction}
                method="post"
                className="space-y-5"
            >
                {/* Username or Email */}
                <div className="space-y-2">
                    <Label htmlFor="username">
                        {!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                              ? msg("usernameOrEmail")
                              : msg("email")}
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        autoFocus
                        defaultValue={auth.attemptedUsername ?? ""}
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    {messagesPerField.existsError("username") && (
                        <p className="text-sm text-destructive" aria-live="polite">
                            {messagesPerField.get("username")}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                        {msgStr("doSubmit")}
                    </Button>

                    <a
                        href={url.loginUrl}
                        className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {msg("backToLogin")}
                    </a>
                </div>
            </form>
        </Template>
    );
}
