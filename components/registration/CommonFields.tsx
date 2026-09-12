import { useFormContext } from "react-hook-form";
import {
  ACTIVITY_OPTIONS,
  DISCOVERY_SOURCE_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from "@/lib/constants/registration";
import type { ConferenceRegistrationInput } from "@/types/registration";
import {
  RegistrationField,
  registrationControlClass,
  registrationDescribedBy,
  registrationErrorId,
  registrationFieldId,
} from "@/components/registration/RegistrationField";

interface CommonFieldsProps {
  maritalStatus?: ConferenceRegistrationInput["maritalStatus"];
  discoverySource?: ConferenceRegistrationInput["discoverySource"];
}

export function CommonFields({
  maritalStatus,
  discoverySource,
}: CommonFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ConferenceRegistrationInput>();

  return (
    <>
      <section aria-labelledby="personal-information-heading" className="space-y-5">
        <div>
          <h2
            id="personal-information-heading"
            className="text-lg font-bold text-[#0F1990]"
          >
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Fields marked with an asterisk (*) are required.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <RegistrationField
            name="firstName"
            label="First Name"
            required
            error={errors.firstName?.message}
          >
            <input
              {...register("firstName")}
              id={registrationFieldId("firstName")}
              type="text"
              autoComplete="given-name"
              maxLength={80}
              required
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={registrationDescribedBy({
                name: "firstName",
                error: errors.firstName?.message,
              })}
              className={registrationControlClass(Boolean(errors.firstName))}
            />
          </RegistrationField>

          <RegistrationField
            name="lastName"
            label="Last Name"
            required
            error={errors.lastName?.message}
          >
            <input
              {...register("lastName")}
              id={registrationFieldId("lastName")}
              type="text"
              autoComplete="family-name"
              maxLength={80}
              required
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={registrationDescribedBy({
                name: "lastName",
                error: errors.lastName?.message,
              })}
              className={registrationControlClass(Boolean(errors.lastName))}
            />
          </RegistrationField>

          <RegistrationField
            name="email"
            label="Email Address"
            required
            hint="Use the address associated with your sponsored or discounted ticket."
            error={errors.email?.message}
          >
            <input
              {...register("email")}
              id={registrationFieldId("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={registrationDescribedBy({
                name: "email",
                error: errors.email?.message,
                hint: "present",
              })}
              className={registrationControlClass(Boolean(errors.email))}
            />
          </RegistrationField>

          <RegistrationField
            name="confirmEmail"
            label="Confirm Email"
            required
            error={errors.confirmEmail?.message}
          >
            <input
              {...register("confirmEmail")}
              id={registrationFieldId("confirmEmail")}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={Boolean(errors.confirmEmail)}
              aria-describedby={registrationDescribedBy({
                name: "confirmEmail",
                error: errors.confirmEmail?.message,
              })}
              className={registrationControlClass(Boolean(errors.confirmEmail))}
            />
          </RegistrationField>

          <RegistrationField
            name="phoneNumber"
            label="Phone Number"
            required
            hint="Include your country code, for example +2348012345678."
            error={errors.phoneNumber?.message}
          >
            <input
              {...register("phoneNumber")}
              id={registrationFieldId("phoneNumber")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={Boolean(errors.phoneNumber)}
              aria-describedby={registrationDescribedBy({
                name: "phoneNumber",
                error: errors.phoneNumber?.message,
                hint: "present",
              })}
              className={registrationControlClass(Boolean(errors.phoneNumber))}
            />
          </RegistrationField>

          <RegistrationField
            name="gender"
            label="Gender"
            required
            error={errors.gender?.message}
          >
            <select
              {...register("gender")}
              id={registrationFieldId("gender")}
              defaultValue=""
              required
              aria-invalid={Boolean(errors.gender)}
              aria-describedby={registrationDescribedBy({
                name: "gender",
                error: errors.gender?.message,
              })}
              className={registrationControlClass(Boolean(errors.gender))}
            >
              <option value="" disabled>
                Select gender
              </option>
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </RegistrationField>

          <RegistrationField
            name="maritalStatus"
            label="Marital Status"
            required
            hint="This information is collected for attendee planning and is accessible only to authorized conference staff."
            error={errors.maritalStatus?.message}
          >
            <select
              {...register("maritalStatus")}
              id={registrationFieldId("maritalStatus")}
              defaultValue=""
              required
              aria-invalid={Boolean(errors.maritalStatus)}
              aria-describedby={registrationDescribedBy({
                name: "maritalStatus",
                error: errors.maritalStatus?.message,
                hint: "present",
              })}
              className={registrationControlClass(Boolean(errors.maritalStatus))}
            >
              <option value="" disabled>
                Select marital status
              </option>
              {MARITAL_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </RegistrationField>

          {maritalStatus === "other" ? (
            <RegistrationField
              name="maritalStatusOther"
              label="Other Marital Status"
              required
              error={errors.maritalStatusOther?.message}
            >
              <input
                {...register("maritalStatusOther")}
                id={registrationFieldId("maritalStatusOther")}
                type="text"
                maxLength={60}
                required
                aria-invalid={Boolean(errors.maritalStatusOther)}
                aria-describedby={registrationDescribedBy({
                  name: "maritalStatusOther",
                  error: errors.maritalStatusOther?.message,
                })}
                className={registrationControlClass(
                  Boolean(errors.maritalStatusOther),
                )}
              />
            </RegistrationField>
          ) : null}
        </div>

        <RegistrationField
          name="residentialAddress"
          label="Residential Address"
          required
          error={errors.residentialAddress?.message}
        >
          <textarea
            {...register("residentialAddress")}
            id={registrationFieldId("residentialAddress")}
            autoComplete="street-address"
            rows={4}
            maxLength={300}
            required
            aria-invalid={Boolean(errors.residentialAddress)}
            aria-describedby={registrationDescribedBy({
              name: "residentialAddress",
              error: errors.residentialAddress?.message,
            })}
            className={`${registrationControlClass(Boolean(errors.residentialAddress))} resize-y`}
          />
        </RegistrationField>
      </section>

      <section aria-labelledby="interests-heading" className="space-y-5">
        <div>
          <h2 id="interests-heading" className="text-lg font-bold text-[#0F1990]">
            Interests
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Help us understand what you are looking forward to at the conference.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <RegistrationField
            name="activityOfInterest"
            label="Which activity interests you most?"
            required
            error={errors.activityOfInterest?.message}
          >
            <select
              {...register("activityOfInterest")}
              id={registrationFieldId("activityOfInterest")}
              defaultValue=""
              required
              aria-invalid={Boolean(errors.activityOfInterest)}
              aria-describedby={registrationDescribedBy({
                name: "activityOfInterest",
                error: errors.activityOfInterest?.message,
              })}
              className={registrationControlClass(
                Boolean(errors.activityOfInterest),
              )}
            >
              <option value="" disabled>
                Select one activity
              </option>
              {ACTIVITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </RegistrationField>

          <RegistrationField
            name="discoverySource"
            label="How did you hear about NGM Conference?"
            required
            error={errors.discoverySource?.message}
          >
            <select
              {...register("discoverySource")}
              id={registrationFieldId("discoverySource")}
              defaultValue=""
              required
              aria-invalid={Boolean(errors.discoverySource)}
              aria-describedby={registrationDescribedBy({
                name: "discoverySource",
                error: errors.discoverySource?.message,
              })}
              className={registrationControlClass(Boolean(errors.discoverySource))}
            >
              <option value="" disabled>
                Select a source
              </option>
              {DISCOVERY_SOURCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </RegistrationField>

          {discoverySource === "other" ? (
            <RegistrationField
              name="discoverySourceOther"
              label="Other Discovery Source"
              required
              error={errors.discoverySourceOther?.message}
            >
              <input
                {...register("discoverySourceOther")}
                id={registrationFieldId("discoverySourceOther")}
                type="text"
                maxLength={100}
                required
                aria-invalid={Boolean(errors.discoverySourceOther)}
                aria-describedby={registrationDescribedBy({
                  name: "discoverySourceOther",
                  error: errors.discoverySourceOther?.message,
                })}
                className={registrationControlClass(
                  Boolean(errors.discoverySourceOther),
                )}
              />
            </RegistrationField>
          ) : null}

          <RegistrationField
            name="referral"
            label="Referral Code/Name"
            hint="Optional. Enter the referral code or the name of the person who referred you."
            error={errors.referral?.message}
          >
            <input
              {...register("referral")}
              id={registrationFieldId("referral")}
              type="text"
              maxLength={100}
              aria-invalid={Boolean(errors.referral)}
              aria-describedby={registrationDescribedBy({
                name: "referral",
                error: errors.referral?.message,
                hint: "present",
              })}
              className={registrationControlClass(Boolean(errors.referral))}
            />
          </RegistrationField>
        </div>
      </section>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <label
          htmlFor={registrationFieldId("privacyConsent")}
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            {...register("privacyConsent")}
            id={registrationFieldId("privacyConsent")}
            type="checkbox"
            required
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent
                ? registrationErrorId("privacyConsent")
                : undefined
            }
            className="mt-1 size-4 shrink-0 rounded accent-[#0F1990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
          />
          <span className="text-sm leading-6 text-gray-800">
            I consent to NGM collecting and using my information to administer
            my conference registration. I have read the{" "}
            <a
              href="#registration-privacy-notice"
              className="font-semibold text-[#0F1990] underline underline-offset-2"
            >
              privacy notice
            </a>{" "}
            and{" "}
            <a
              href="#registration-terms"
              className="font-semibold text-[#0F1990] underline underline-offset-2"
            >
              registration terms
            </a>
            .
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.privacyConsent?.message ? (
          <p
            id={registrationErrorId("privacyConsent")}
            className="mt-2 text-sm font-medium text-red-700"
          >
            {errors.privacyConsent.message}
          </p>
        ) : null}
      </div>
    </>
  );
}
