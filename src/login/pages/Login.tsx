import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login(
    props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            classes={classes}
            doUseDefaultCss={false}
            headerNode={msg("loginAccountTitle")}
            displayMessage={!messagesPerField.existsError("username", "password")}
            socialProvidersNode={
                social?.displayInfo && social.providers && social.providers.length > 0 ? (
                    <div className="mt-6">
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    {msg("identity-provider-login-label")}
                                </span>
                            </div>
                        </div>

                        <div className={`grid gap-2 ${social.providers.length <= 2 ? "grid-cols-1" : "grid-cols-2"}`}>
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    href={p.loginUrl}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    {p.iconClasses && (
                                        <i className={`${p.iconClasses} text-base`} aria-hidden="true" />
                                    )}
                                    <span>{p.displayName}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ) : null
            }
        >
            {realm.password && (
                <form
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                    className="space-y-5"
                >
                    {/* Username / Email */}
                    {!usernameHidden && (
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
                                defaultValue={login.username ?? ""}
                                type="text"
                                autoFocus
                                autoComplete="username"
                                aria-invalid={messagesPerField.existsError("username", "password")}
                            />
                            {messagesPerField.existsError("username", "password") && (
                                <p className="text-sm text-red-400" aria-live="polite">
                                    {messagesPerField.get("username")}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">{msg("password")}</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={messagesPerField.existsError("username", "password")}
                        />
                        {usernameHidden &&
                            messagesPerField.existsError("username", "password") && (
                                <p className="text-sm text-red-400" aria-live="polite">
                                    {messagesPerField.get("username")}
                                </p>
                            )}
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between">
                        {realm.rememberMe && !usernameHidden && (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="rememberMe"
                                    name="rememberMe"
                                    defaultChecked={!!login.rememberMe}
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="text-sm text-muted-foreground cursor-pointer select-none"
                                >
                                    {msg("rememberMe")}
                                </label>
                            </div>
                        )}

                        {realm.resetPasswordAllowed && (
                            <a
                                href={url.loginResetCredentialsUrl}
                                className="text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                                {msg("doForgotPassword")}
                            </a>
                        )}
                    </div>

                    {/* Login CTA */}
                    <div className="pt-1">
                        <input type="hidden" name="credentialId" value={kcContext.auth.selectedCredential} />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoginButtonDisabled}
                        >
                            {msgStr("doLogIn")}
                        </Button>
                    </div>
                </form>
            )}

            {/* Registration link removed */}
        </Template>
    );
}
