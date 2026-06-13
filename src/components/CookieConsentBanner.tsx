"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { en } from "@/config/cookieconsent-languages";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    _ccRun?: boolean;
    umami?: {
      track: (event: string) => void;
    };
  }
}

const getDomain = () => {
  const hostname = window.location.hostname;
  if (hostname === "localhost") return "";
  if (hostname === "tfff-watch.vercel.app") return "vercel.app";
  return hostname.includes("tfffwatch.org") ? ".tfffwatch.org" : hostname;
};

export default function CookieConsentBanner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window._ccRun) return;

    CookieConsent.run({
      revision: 0.2,
      autoShow: true,
      hideFromBots: true,
      cookie: {
        name: "cookie-consent",
        domain: getDomain(),
        path: "/",
        sameSite: "Lax",
        secure: true,
        expiresAfterDays: 365,
      },
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "bottom left",
          equalWeightButtons: false,
          flipButtons: true,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: false,
          flipButtons: true,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: true,
          readOnly: true,
        },
        functionality: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              { name: "ab_experiment_sampled" },
              { name: "ab_testing_id" },
            ],
          },
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: en.consentModal,
            preferencesModal: {
              ...en.preferencesModal,
              sections: [
                // First section - intro
                en.preferencesModal.sections[0],

                // Second section - necessary cookies
                {
                  ...en.preferencesModal.sections[1],
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      description: "Description",
                      service: "Service",
                    },
                    body: [
                      {
                        name: "cookie-consent",
                        domain: ".tfffwatch.org",
                        description: "Stores your cookie consent preferences",
                        service: "TFFF Watch",
                      },
                    ],
                  },
                },

                // Functionality section with Substack cookies
                {
                  title: "Functionality Cookies",
                  description:
                    "Enable enhanced functionality like newsletter subscriptions.",
                  linkedCategory: "functionality",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      description: "Description",
                      service: "Service",
                    },
                    body: [
                      {
                        name: "ab_experiment_sampled",
                        domain: ".substack.com",
                        description:
                          "Controls newsletter subscription features",
                        service: "Newsletter (Substack)",
                      },
                      {
                        name: "ab_testing_id",
                        domain: ".substack.com",
                        description:
                          "Manages newsletter subscription preferences",
                        service: "Newsletter (Substack)",
                      },
                    ],
                  },
                },

                // Last section - more information
                en.preferencesModal.sections[
                  en.preferencesModal.sections.length - 1
                ],
              ],
            },
          },
        },
      },
      onFirstConsent: ({}) => {
        localStorage.setItem("ccConsentGiven", "true");
      },
      onConsent: ({}) => {
        document.dispatchEvent(new Event("cookieConsentUpdate"));

        // Ensure Umami script is always enabled
        const script = document.querySelector("script[data-website-id]");
        if (script) {
          script.removeAttribute("type");
        }
      },
    });
  }, []);

  return null;
}

export const updateCookieConsent = () => CookieConsent.showPreferences();
export const resetCookieConsent = () => CookieConsent.reset(true);
