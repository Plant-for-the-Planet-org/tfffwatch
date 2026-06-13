export const en = {
  consentModal: {
    label: "Cookie Consent",
    title: "Hello there, it's cookie time!",
    description:
      "We use cookies on our website. With your consent we also use analytics cookies. You can manage your consent any time.",
    acceptAllBtn: "Accept all",
    closeIconLabel: "Reject all and close",
    acceptNecessaryBtn: "Reject optional",
    showPreferencesBtn: "Manage preferences",
    footer:
      '<a href="https://www.plant-for-the-planet.org/imprint">Imprint</a><a href="https://www.plant-for-the-planet.org/privacy/terms">Privacy Policy</a><a href="https://www.plant-for-the-planet.org/terms-and-conditions">Terms and conditions</a>',
  },
  preferencesModal: {
    title: "Consent preferences center",
    acceptAllBtn: "Accept all",
    acceptNecessaryBtn: "Reject optional",
    savePreferencesBtn: "Save preferences",
    closeIconLabel: "Close modal",
    serviceCounterLabel: "Service|Services",
    sections: [
      {
        title: "Somebody said ... cookies?",
        description:
          "Our website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.",
      },
      {
        title:
          'Strictly necessary cookies <span class="pm__badge">Always enabled</span>',
        description: "Essential cookies required for the website to function.",
        linkedCategory: "necessary",
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
      {
        title: "Functional cookies",
        description:
          "These cookies enable newsletter subscription and content personalization features.",
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
                "Controls newsletter subscription features and content variations",
              service: "Newsletter (Substack)",
            },
            {
              name: "ab_testing_id",
              domain: ".substack.com",
              description: "Manages newsletter subscription preferences",
              service: "Newsletter (Substack)",
            },
          ],
        },
      },
      {
        title: "More information",
        description:
          "For any queries about our cookie policy and your choices, please contact us.",
      },
    ],
  },
};
