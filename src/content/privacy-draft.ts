// Compatibility export for earlier development tooling. No separate draft text.
import { privacyPolicy } from "../config/privacy"
import { privacyPolicySections } from "./privacy-policy"

export const draftPrivacyPolicy = { ...privacyPolicy, sections: privacyPolicySections }
